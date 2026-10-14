import Input from "../form/Input";

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
            placeholder="Enter Phone number"
            register={register}
            error={errors.hrapp_phone1}
          />

          <Input
            type="tel"
            label="Mobile Number"
            name="hrapp_phone2"
            placeholder="Enter Mobile number"
            register={register}
            error={errors.hrapp_phone2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            label="Email Address"
            name="hrapp_email1"
            placeholder="Enter email address"
            register={register}
            error={errors.hrapp_email1}
          />

          <Input
            type="email"
            label="Alternative Email Address"
            name="hrapp_email2"
            placeholder="Enter alternative email address"
            register={register}
            error={errors.hrapp_email2}
          />
        </div>
      </div>

        <div className="space-y-6">
          <h3 className="text-xl font-normal text-[#0B121F]">
            Current Residential Address
          </h3>

          <Input
            label="Current Residential Address"
            name="hrapp_address"
            placeholder="Enter address line 1"
            register={register}
            error={errors.hrapp_address}
          />

          <Input
            label="Additional Address Information (Apartment, Building, etc.)"
            name="addressAdditional"
            placeholder="Enter address line 2"
            register={register}
            error={errors.addressAdditional}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City / Town"
              name="city"
              placeholder="Enter city / town"
              register={register}
              error={errors.city}
            />

            <Input
              label="State / Province / Emirate"
              name="state"
              placeholder="Enter state / province / emirate"
              register={register}
              error={errors.state}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Postal Code / ZIP"
              name="postalCode"
              placeholder="Enter postal code / ZIP"
              register={register}
              error={errors.postalCode}
            />

            <Input
              label="Country"
              name="country"
              placeholder="Enter country"
              register={register}
              error={errors.country}
            />
          </div>
        </div>
    </div>
  );
};

export default ContactInformation;
