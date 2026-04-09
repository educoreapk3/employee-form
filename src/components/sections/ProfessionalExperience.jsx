import Input from "../form/Input";
import RadioGroup from "../form/RadioGroup";

const RadioBoxOptions=[
  {label: "Yes", value: "1"},
  {label: "No", value: "0"}
]

const ProfessionalExperience = ({ form, errors }) => {
  const { register } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-normal text-[#0B121F]">
        Professional Experience
      </h2>

      {/* Joining Date */}
      <Input
        type="date"
        label="Expected Joining Date"
        name="joining_date"
        register={register}
        error={errors.joining_date}
      />

      {/* Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Total Years of Teaching Experience"
          name="hrapp_local_experience"
          register={register}
          error={errors.hrapp_local_experience}
        />

        <Input
          label="Years of Experience in UAE"
          name="hrapp_broad_experience"
          register={register}
          error={errors.hrapp_broad_experience}
        />
      </div>

      {/* Yes / No Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RadioGroup
          label="Are you prohibited from teaching in UAE?"
          name="hrapp_statute_teaching_1"
          register={register}
          error={errors.hrapp_statute_teaching_1}
          options={RadioBoxOptions}
        />

        <RadioGroup
          label="Any issues related to work in UAE?"
          name="hrapp_statute_work_country_1"
          register={register}
          error={errors.hrapp_statute_work_country_1}
          options={RadioBoxOptions}
        />

        <RadioGroup
          label="Do you work with children under 18?"
          name="hrapp_statute_supervised_under_eighteen_1"
          register={register}
          error={errors.hrapp_statute_supervised_under_eighteen_1}
          options={RadioBoxOptions}
        />
      </div>
    </div>
  );
};

export default ProfessionalExperience;
