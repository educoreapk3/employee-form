import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PageWrapper from "../components/layout/PageWrapper";
import Card from "../components/layout/Card";
import Divider from "../components/form/Divider";
import StepSidebar from "../components/sidebar/StepSidebar";
import PersonalInformation from "../components/sections/PersonalInformation";
import NationalityDetails from "../components/sections/NationalityDetails";
import AdditionalIDInformation from "../components/sections/AdditionalIDInformation";
import ContactInformation from "../components/sections/ContactInformation";
import ProfessionalExperience from "../components/sections/ProfessionalExperience";
import ProfessionalCredentials from "../components/sections/ProfessionalCredentials";
import { formSchema } from "../utils/validationSchema";
import { getCountries, getLanguages } from "../api/masterData";
import { toast } from 'react-toastify';
import api from "../api/client";

const EmployeeApplicationForm = () => {
  const hasRun = useRef(false);

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = form;

  // !! Just to check form data. Remove later!
  const watchedValues = watch();
  useEffect(() => {
    console.log("Form data when loading:", watchedValues);
  }, [JSON.stringify(watchedValues)]);

  const onSubmit = async (data) => {
    console.log("Form data when submitting:", data);
    try {
      const formData = new FormData();
      const formatDate = (date) => {
        return date ? new Date(date).toISOString().split("T")[0] : null;
      };
      const cleanPhone1 = data.hrapp_phone1?.replace(/\D/g, "");
      const cleanPhone2 = data.hrapp_phone2?.replace(/\D/g, "");
      const applicantPayload = {
        hrapp_name: data.firstName + " " + data.lastName,
        capabilities: data.capabilities || "",
        hrapp_gender: data.hrapp_gender || "",
        hrapp_marital_status: data.hrapp_marital_status || "",
        hrapp_kids_num: data.hrapp_kids_num || "",
        hrapp_phone1: cleanPhone1 || "",
        hrapp_phone2: cleanPhone2 || "",
        hrapp_passport_number: data.hrapp_passport_number || "",
        hrapp_passport_expiry: formatDate(data.hrapp_passport_expiry) || "",
        hrapp_id_number: data.hrapp_id_number,
        additionalIdType: data.additionalIdType,
        hrapp_email1: data.hrapp_email1,
        hrapp_email2: data.hrapp_email2,
        country_id: data.country_id,
        hrapp_country_note: data.hrapp_country_note,
        hrapp_address: data.address,
        hrapp_joining_date: formatDate(data.joining_date),
        hrapp_local_experience: data.hrapp_local_experience,
        hrapp_broad_experience: data.hrapp_broad_experience,
        hrapp_statute_teaching: data.hrapp_statute_teaching_1 ?? 0,
        hrapp_statute_work_country: data.hrapp_statute_work_country_1 ?? 0,
        hrapp_statute_supervised_under_eighteen:
          data.hrapp_statute_supervised_under_eighteen_1 ?? 0,
      };


      formData.append("HrApplicants", JSON.stringify(applicantPayload));
      // Object.entries(applicantPayload).forEach(([key, value]) => {
      //   formData.append(key, value ?? "");
      // });
      formData.append("hrapp_id", data.hrapp_id || 0);

      // center id
      formData.append("center_id", import.meta.env.VITE_CENTER_ID);

      // FILES
      formData.append("hrapp_picture", data.hrapp_picture);

      formData.append("hrapp_passport_attachment", data.hrapp_passport_attachment);

      formData.append("hrapp_id_attachment", data.hrapp_id_attachment);

      const educationPayload = data.degrees?.map((item) => {
        const uniqueId = crypto.randomUUID();

        // file attach
        if (item.file) {
          formData.append(`hrapp_ed_attachment[${uniqueId}]`, item.file);
        }

        return {
          uniqueId,
          hrapp_ed_id: item.hrapp_ed_id,
          hrapp_ed_degree: item.type,
          hrapp_ed_date: item.date,
          center_id: import.meta.env.VITE_CENTER_ID,
        };
      });
      formData.append("HrApplicantEducation", JSON.stringify(educationPayload));

      // DBS
      const dbsPayload = data.dbs?.map((item) => {
        const uniqueId = crypto.randomUUID();

        if (item.file) {
          formData.append(`hrapp_dbs_attachment[${uniqueId}]`, item.file);
        }

        return {
          uniqueId,
          hrapp_dbs_id: item.hrapp_dbs_id,
          hrapp_dbs_country: item.country,
          center_id: import.meta.env.VITE_CENTER_ID,
        };
      });

      formData.append("HrApplicantDbs", JSON.stringify(dbsPayload));

      const res = await api.post('save', formData);

      if (res.data.type) {
        console.log("SUCCESS:", res);
        const uuid = res.data.hr_applicants?.hrapp_uuid;
        if (uuid) {
          const url = new URL(window.location.href);
          url.searchParams.set("s", uuid);
          window.history.replaceState(null, "", url.toString());
        }
        toast.success("Saved Successfully!");
      } else {
        toast.error(res.data.message);
      }


    } catch (err) {
      console.log("ERROR:", err);
      toast.error("Something went wrong!");
    }
  };

  const onError = (errors) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the form errors.");
    }
  }

  const getHrApplicant = async (hrapp_uuid) => {
    const res = await api.get('get', {
      params: {
        center_id: import.meta.env.VITE_CENTER_ID,
        hrapp_uuid,
      }
    });

    if (res.data.type) {
      const applicant = res.data.hr_applicants;
      const applicant_dbs = res.data.hr_applicant_dbs;
      const applicant_education = res.data.hr_applicant_education;
      const [firstName, ...rest] = (applicant.hrapp_name).split(' ');
      setValue('hrapp_id', applicant.hrapp_id);
      setValue('firstName', firstName);
      setValue('lastName', rest.join(' '));
      setValue('capabilities', applicant.capabilities);
      setValue('hrapp_gender', applicant.hrapp_gender);
      setValue('hrapp_marital_status', String(applicant.hrapp_marital_status));
      setValue('hrapp_kids_num', applicant.hrapp_kids_num);
      setValue('country_id', String(applicant.country_id));
      setValue('hrapp_country_note', String(applicant.hrapp_country_note));
      setValue('hrapp_passport_number', applicant.hrapp_passport_number);
      setValue('hrapp_passport_expiry', applicant.hrapp_passport_expiry);
      setValue('hrapp_id_number', applicant.hrapp_id_number);
      setValue('hrapp_phone1', applicant.hrapp_phone1);
      setValue('hrapp_phone2', applicant.hrapp_phone2);
      setValue('hrapp_email1', applicant.hrapp_email1);
      setValue('hrapp_email2', applicant.hrapp_email2);
      setValue('joining_date', applicant.hrapp_joining_date);
      setValue('hrapp_local_experience', applicant.hrapp_local_experience);
      setValue('hrapp_broad_experience', applicant.hrapp_broad_experience);
      setValue('hrapp_statute_teaching_1', String(applicant.hrapp_statute_teaching));
      setValue('hrapp_statute_work_country_1', String(applicant.hrapp_statute_work_country));
      setValue('hrapp_statute_supervised_under_eighteen_1', String(applicant.hrapp_statute_supervised_under_eighteen));

      if (applicant.hrapp_picture) {
        setValue("hrapp_picture", import.meta.env.VITE_BUCKET_URL + import.meta.env.VITE_CENTER_UUID + '/hr_applicants/' + applicant.hrapp_picture);
      }

      if (applicant.hrapp_passport_attachment) {
        setValue("hrapp_passport_attachment", import.meta.env.VITE_BUCKET_URL + import.meta.env.VITE_CENTER_UUID + '/hr_applicants/' + applicant.hrapp_passport_attachment);
      }

      if (applicant.hrapp_id_attachment) {
        setValue("hrapp_id_attachment", import.meta.env.VITE_BUCKET_URL + import.meta.env.VITE_CENTER_UUID + '/hr_applicants/' + applicant.hrapp_id_attachment);
      }

      setValue('dbs', applicant_dbs.map(item => {
        return {
          country: item.hrapp_dbs_country,
          hrapp_dbs_id: item.hrapp_dbs_id,
          attachment: import.meta.env.VITE_BUCKET_URL + import.meta.env.VITE_CENTER_UUID + '/hr_applicant_dbs/' + item.hrapp_dbs_attachment
        }
      }));
      setValue('degrees', applicant_education.map(item => {
        return {
          date: item.hrapp_ed_date,
          type: item.hrapp_ed_degree,
          hrapp_ed_id: item.hrapp_ed_id,
          attachment: import.meta.env.VITE_BUCKET_URL + import.meta.env.VITE_CENTER_UUID + '/hr_applicant_education/' + item.hrapp_ed_attachment
        }
      }));
    } else {
      toast.error(res.data.message);
    }
  }

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const init = async () => {
      try {
        setLoading(true);
        const res = await getCountries();

        const formatted = res.map((c) => ({
          label: c.name_en,
          value: c.country_id,
        }));

        setCountries(formatted);
      } catch (err) {
        console.error("Countries fetch error", err);
      } finally {
        setLoading(false);
      }

      const params = new URLSearchParams(window.location.search);
      const s = params.get("s");
      if (s) {
        getHrApplicant(s);
      }
    };

    init();
  }, []);

  return (
    <PageWrapper>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <StepSidebar formData={watch()} errors={errors} touchedFields={touchedFields} />

        <div className="flex-1 flex flex-col h-[calc(100vh-140px)]">
          {loading && (
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col flex-1 h-100"
          >
            <Card>
              <div className="space-y-6">
                <PersonalInformation form={form} errors={errors} countries={countries} />
                <Divider />
                <NationalityDetails form={form} errors={errors} countries={countries} />
                <Divider />
                <AdditionalIDInformation form={form} errors={errors} />
                <Divider />
                <ContactInformation form={form} errors={errors} countries={countries} />
                <Divider />
                <ProfessionalExperience form={form} errors={errors} />
                <Divider />
                <ProfessionalCredentials form={form} errors={errors} countries={countries} />
              </div>
            </Card>
            <div className="bg-white rounded-br-2xl rounded-bl-2xl drop-shadow-lg flex p-4 justify-end gap-3">
              {/* <button
                type="button"
                onClick={handleSubmit(saveDraft)}
                className="px-4 py-2 border rounded"
              >
                Save
              </button> */}

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save & Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EmployeeApplicationForm;
