import Input from "../form/Input";
import Textarea from "../form/Textarea";

const ContactInformation = ({ form, errors }) => {
  const { register } = form;

  return (
    <div className="space-y-10">
      {/* ================= CONTACT ================= */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-normal text-[#0B121F]">
          Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="tel"
            label="Phone Number"
            name="hrapp_phone1"
            register={register}
            error={errors.hrapp_phone1}
          />

          <Input
            type="tel"
            label="Mobile Number"
            name="hrapp_phone2"
            register={register}
            error={errors.hrapp_phone2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            label="Email Address"
            name="hrapp_email1"
            register={register}
            error={errors.hrapp_email1}
          />

          <Input
            type="email"
            label="Alternate Email Address"
            name="hrapp_email2"
            register={register}
            error={errors.hrapp_email2}
          />
        </div>
      </div>

      {/* ================= ADDRESS ================= */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-normal text-[#0B121F]">
          Current Residential Address
        </h2>

        <Textarea
          label="Current Residential Address"
          name="hrapp_address"
          register={register}
          error={errors.hrapp_address}
        />

        <Textarea
          label="Additional Address Information (Apartment, Building etc.)"
          name="addressAdditional"
          register={register}
          error={errors.addressAdditional}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City / Town"
            name="city"
            register={register}
            error={errors.city}
          />

          <Input
            label="State / Province"
            name="state"
            register={register}
            error={errors.state}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Postal Code / ZIP"
            name="postalCode"
            register={register}
            error={errors.postalCode}
          />

          <Input
            label="Country"
            name="country"
            register={register}
            error={errors.country}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
