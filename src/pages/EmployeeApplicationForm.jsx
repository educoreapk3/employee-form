import { useEffect, useState } from "react";
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
import {
  formSchema
} from "../utils/validationSchema";
import { postRequest } from "../api/apiService";
import { getCountries, getLanguages } from "../api/masterData";

const EmployeeApplicationForm = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = form;


  const onSubmit = async (data) => {
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
        // hrapp_language: data.language,
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
      formData.append("hrapp_id", 0);

      // center id
      formData.append("center_id", import.meta.env.VITE_CENTER_ID);

      // FILES
      if (data.hrapp_picture) {
        formData.append("hrapp_picture", data.hrapp_picture);
      }

      if (data.hrapp_passport_attachment) {
        formData.append("hrapp_passport_attachment", data.hrapp_passport_attachment);
      }

      if (data.hrapp_id_attachment) {
        formData.append("hrapp_id_attachment", data.hrapp_id_attachment);
      }

      if (data.hrapp_cv) {
        formData.append("hrapp_cv", data.hrapp_cv);
      }

      const educationPayload = data.degrees?.map((item) => {
        const uniqueId = crypto.randomUUID();

        // file attach
        if (item.file) {
          formData.append(`hrapp_ed_attachment[${uniqueId}]`, item.file);
        }

        return {
          uniqueId,
          hrapp_ed_id: null,
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
          hrapp_dbs_id: null,
          hrapp_dbs_country: item.country,
          center_id: import.meta.env.VITE_CENTER_ID,
        };
      });

      formData.append("HrApplicantDbs", JSON.stringify(dbsPayload));

      const res = await postRequest("save-hr-applicant", formData);

      console.log("SUCCESS:", res);
      alert("Submitted Successfully ✅");

    } catch (err) {
      console.log("ERROR:", err);
      alert("Something went wrong ❌");
    }
  };

  const saveDraft = (data) => {
    localStorage.setItem("employeeFormDraft", JSON.stringify(data));
    alert("Draft Saved ✅");
  };

  useEffect(() => {
    const draft = localStorage.getItem("employeeFormDraft");
    if (draft) {
      form.reset(JSON.parse(draft));
    }
  }, []);



  useEffect(() => {
    const fetchCountries = async () => {
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
    };

    fetchCountries();
  }, []);

  console.log(errors)

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
            onSubmit={handleSubmit(onSubmit)}
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
              <button
                type="button"
                onClick={handleSubmit(saveDraft)}
                className="px-4 py-2 border rounded"
              >
                Save
              </button>

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
