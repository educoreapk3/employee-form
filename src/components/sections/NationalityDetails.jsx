
import Input from "../form/Input";
import Select from "../form/Select";
import FileUpload from "../form/FileUpload";

const NationalityDetails = ({ form, errors, countries }) => {
  const { register, setValue, watch } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-normal text-[#0B121F]">
        Nationality Details
      </h2>

      {/* 🔁 Form + Upload */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">

        {/* Left Form */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Nationality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Nationality"
              name="country_id"
              register={register}
              error={errors.country_id}
              options={countries}
            />

            <Select
              label="Secondary Nationality"
              name="hrapp_country_note"
              register={register}
              error={errors.hrapp_country_note}
              options={countries}
            />
          </div>

          {/* Passport Number + Expiry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Passport Number"
              name="hrapp_passport_number"
              register={register}
              error={errors.hrapp_passport_number}
            />

            <Input
              type="date"
              label="Passport Expiry Date"
              name="hrapp_passport_expiry"
              register={register}
              error={errors.hrapp_passport_expiry}
            />
          </div>

          {/* Issue Date + Place */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Passport Issuance Date"
              name="passportIssueDate"
              register={register}
              error={errors.passportIssueDate}
            />

            <Input
              label="Place of Issue"
              name="passportPlaceOfIssue"
              register={register}
              error={errors.passportPlaceOfIssue}
            />
          </div> */}
        </div>

        {/* Right Upload */}
        <div className="w-full lg:w-80">
          <FileUpload
            label="Upload a scanned copy of your passport"
            name="hrapp_passport_attachment"
            setValue={setValue}
            error={errors.hrapp_passport_attachment}
            accept="image/*,.pdf"
            watch={watch}
          />
        </div>
      </div>
    </div>
  );
};

export default NationalityDetails;

