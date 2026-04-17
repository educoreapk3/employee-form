import * as yup from "yup";

export const formSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  capabilities: yup.string().min(10, "Minimum 10 characters"),
  hrapp_email1: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .email("Invalid email format"),
  hrapp_email2: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .email("Invalid email format"),
  // dob: yup
  //   .date()
  //   .transform((value, originalValue) => {
  //     return originalValue === "" ? null : value;
  //   })
  //   .typeError("Invalid date")
  //   .required("Date of birth required"),
  hrapp_gender: yup.string().required("Gender required"),
  hrapp_marital_status: yup.string().required("Marital status is required"),

  // hrapp_kids_num: yup
  //   .number()
  //   .min(0, "Cannot be negative")
  //   .required("Dependants required"),
  country_id: yup.string().required("Nationality is required"),
  hrapp_passport_number: yup.string().required("Passport number is required"),
  hrapp_passport_expiry: yup
    .date()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .typeError("Invalid date")
    .required("Expiry date required"),
  // passportIssueDate: yup
  //   .date()
  //   .transform((value, originalValue) => {
  //     return originalValue === "" ? null : value;
  //   })
  //   .typeError("Invalid date")
  //   .required("Passport issue date required"),
  // passportPlaceOfIssue: yup.string().required(),
  // hrapp_passport_attachment: yup
  //   .mixed()
  //   .test("fileRequired", "Passport copy is required", (value) => {
  //     if (!value) return false;

  //     if (value instanceof File) return true;
  //     if (value.length > 0) return true;
  //     return false;
  //   })
  //   .test("fileSize", "File too large (max 2MB)", (value) => {
  //     if (!value) return true;
  //     return value.size <= 2000000;
  //   }),
  hrapp_id_attachment: yup
    .mixed()
    .nullable()
    .test("fileSize", "File too large (max 2MB)", (value) => {
      if (!value || typeof value === "string") return true;
      return value.size <= 2000000;
    }),

  hrapp_phone1: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^(\+\d{1,3}[- ]?)?\(?\d{2,4}\)?[- ]?\d{3,4}[- ]?\d{4}$/, {
      message: "Invalid phone number format",
      excludeEmptyString: true,
    }),
  hrapp_phone2: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^(\+\d{1,3}[- ]?)?\(?\d{2,4}\)?[- ]?\d{3,4}[- ]?\d{4}$/, {
      message: "Invalid phone number format",
      excludeEmptyString: true,
    })
});
