import Input from "../form/Input";
import RadioGroup from "../form/RadioGroup";
import Textarea from "../form/Textarea";

const RadioBoxOptions = [
  { label: "Yes", value: "1" },
  { label: "No", value: "0" }
]

const ProfessionalExperience = ({ form, errors }) => {
  const { register } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-normal text-[#0B121F]">
        Professional Experience
      </h2>



      {/* Experience */}
      <div>

        {/* Joining Date */}
        <Input
          type="date"
          label="Expected Joining Date"
          name="joining_date"
          register={register}
          error={errors.joining_date}
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
          showIndicator
        />

        <RadioGroup
          label="Are you allowed to work in UAE?"
          name="allowedToWorkUae"
          register={register}
          error={errors.allowedToWorkUae}
          options={RadioBoxOptions}
          showIndicator
        />

        <RadioGroup
          label="Do you work with children under 18?"
          name="hrapp_statute_supervised_under_eighteen_1"
          register={register}
          error={errors.hrapp_statute_supervised_under_eighteen_1}
          options={RadioBoxOptions}
          showIndicator
        />
      </div>
      <Input
        label="Preferred Role"
        name="preferredRole"
        placeholder="Enter the details of the preferred role"
        register={register}
        error={errors.preferredRole}
      />
      <Textarea
        label="Role description"
        name="roleDescription"
        placeholder="Why do you prefer this role? and how does it relate to your experience?"
        register={register}
        error={errors.roleDescription}
      />
    </div>
  );
};

export default ProfessionalExperience;
