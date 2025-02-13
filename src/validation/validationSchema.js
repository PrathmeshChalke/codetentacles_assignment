import * as Yup from "yup";

// Allowed image file types
const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
  "image/svg+xml",
];

// Personal Details Validation (Including Photo)
export const personalDetailsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  gender: Yup.string().required("Gender is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  photo: Yup.mixed()
    .test(
      "fileType",
      "The photo must be a file of type: jpeg, png, jpg, gif, svg.",
      (value) => {
        if (!value) return true; // Allow empty field, remove this if required
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    )
    .test("fileSize", "The photo must not be greater than 2MB.", (value) => {
      return value && value.size <= 2048 * 1024; // 2MB file size limit
    }),
});

// Country Details Validation
export const countryDetailsSchema = Yup.object().shape({
  countryId: Yup.object().shape({
    value: Yup.number().required("Country is required"),
  }),
  stateId: Yup.object().shape({
    value: Yup.number().required("State is required"),
  }),
});

// Skills Validation
export const skillsSchema = Yup.object().shape({
  skills: Yup.array().min(1, "At least one skill is required"),
});

// Credentials Validation (Including Email & Password)
export const credentialsSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
