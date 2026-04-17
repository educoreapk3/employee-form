import Input from "../form/Input";
import Select from "../form/Select";
import FileUpload from "../form/FileUpload";

const AdditionalIdType = [{
  label: "CNIC",
  value: "cnic"
}, {
  label: "Driving License",
  value: "driving_license"
}, {
  label: "Other",
  value: "other"
}]

const AdditionalIDInformation = ({ form, errors }) => {
  const { register, watch } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-normal text-[#0B121F]">
        Additional ID Information
      </h2>

      {/* 🔁 Form + Upload */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">

        {/* Left Fields */}
        <div className="flex-1 flex flex-col gap-4">
          {/* <Select
            label="Type of Additional ID"
            name="additionalIdType"
            register={register}
            error={errors.additionalIdType}
            options={AdditionalIdType}
          /> */}

          <Input
            label="ID Number"
            name="hrapp_id_number"
            register={register}
            error={errors.hrapp_id_number}
          />
        </div>

        {/* Right Upload */}
        <div className="w-full lg:w-80">
          <FileUpload
            label="Upload a scanned copy of your ID"
            name="hrapp_id_attachment"
            setValue={form.setValue}
            error={errors.hrapp_id_attachment}
            watch={watch}
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalIDInformation;

