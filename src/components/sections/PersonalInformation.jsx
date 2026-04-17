import Input from "../form/Input";
import Textarea from "../form/Textarea";
import RadioGroup from "../form/RadioGroup";
import FileUpload from "../form/FileUpload";
import Select from "../form/Select";

const MartialStatusOptions = [
  { label: "Single", value: "0" },
  { label: "Married", value: "1" },
  { label: "Divorced", value: "2" },
  { label: "Widowed", value: "3" },
];

const GenderOption = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" }
]


const PersonalInformation = ({ form, errors }) => {
  const { register, setValue, watch } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-normal text-[#0B121F]">
        Personal Information
      </h2>

      {/* 🔁 Form + Image */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">

        {/* Left Form */}
        <div className="flex-1 space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              placeholder="enter the applicants name"
              register={register}
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="enter the applicants name"
              register={register}
              error={errors.lastName}
            />
          </div>

          <Textarea
            label="Please describe yourself in brief"
            name="capabilities"
            placeholder="enter a brief intro"
            register={register}
            error={errors.capabilities}
          />
        </div>

        {/* Right Image Upload */}
        <div className="w-full lg:w-80">
          <FileUpload
            label="Passport size photo"
            name="hrapp_picture"
            setValue={setValue}
            watch={watch}
            error={errors.hrapp_picture}
          />
        </div>
      </div>

      {/* DOB + Gender */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* <Input
          type="date"
          label="Date of Birth"
          name="dob"
          register={register}
          error={errors.dob}
        /> */}

        <RadioGroup
          label="Select your Gender"
          name="hrapp_gender"
          register={register}
          error={errors.hrapp_gender}
          options={GenderOption}
        />

        <Select
          label="Marital status"
          name="hrapp_marital_status"
          register={register}
          error={errors.hrapp_marital_status}
          options={MartialStatusOptions}
        />

        <Input
          label="Number of dependants"
          type="number"
          name="hrapp_kids_num"
          register={register}
          error={errors.hrapp_kids_num}
          placeholder="0"
        />
      </div>

    </div>
  );
};


export default PersonalInformation;
