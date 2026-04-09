export const steps = [
  {
    id: "personal",
    label: "Personal Information",
    fields: ["firstName", "lastName", "capabilities", "dob", "hrapp_gender", "hrapp_marital_status"],
  },
  {
    id: "nationality",
    label: "Nationality Details",
    fields: ["country_id", "hrapp_passport_number", "hrapp_passport_expiry", "passportIssueDate", "passportPlaceOfIssue", "hrapp_passport_attachment"],
  },
  {
    id: "contact",
    label: "Contact",
    fields: ["hrapp_phone1", "hrapp_email1"],
  },
  {
    id: "experience",
    label: "Professional Experience",
    fields: ["joining_date", "hrapp_local_experience", "hrapp_broad_experience"],
  },
  {
    id: "credentials",
    label: "Professional Credentials",
    fields: ["degrees", "dbs"],
  },
];
