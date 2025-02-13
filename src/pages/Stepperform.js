// Stepperform.jsx
import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import Layout from "../component/Layout";
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { submitForm } from "../api/Auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const steps = [
  "Personal Information",
  "Country Details",
  "Skills",
  "Credentials",
];

export default function Stepperform() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    countryId: "",
    stateId: "",
    skills: [],
    email: "",
    password: "",
    password_confirmation: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Don't clear errors immediately to maintain validation state

    setErrors((prev) => ({ ...prev, [key]: "" }));
    if (key === "password" || key === "password_confirmation") {
      setErrors((prev) => ({ ...prev, password_confirmation: "" }));
    }
    if (key === "countryId") {
      setErrors((prev) => ({ ...prev, stateId: "" }));
    }
    if (key === "skills") {
      setErrors((prev) => ({ ...prev, skills: "" }));
    }
  };

  const validatePersonalDetails = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter a Full Name.";
    if (!formData.gender) newErrors.gender = "Please select a Gender.";
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter a Phone Number.";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }
    if (!formData.photo) newErrors.photo = "Please upload a Profile Photo.";

    return newErrors;
  };

  const validateCountryDetails = () => {
    const newErrors = {};

    if (!formData.countryId)
      newErrors.countryId = "Please select/enter a Country.";
    if (!formData.stateId) newErrors.stateId = "Please select/enter a State.";

    return newErrors;
  };

  const validateSkills = () => {
    const newErrors = {};

    if (!formData.skills.length) {
      newErrors.skills = "Please add at least one Skill.";
    } else {
      const emptySkills = formData.skills.some((skill) => !skill.trim());
      if (emptySkills) {
        newErrors.skills = "Skills cannot be empty.";
      }
    }

    return newErrors;
  };

  const validateCredentials = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Please enter a Email Address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address format.";
    }

    if (!formData.password) {
      newErrors.password = "Please enter a Password.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Please confirm your password once.";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }

    return newErrors;
  };

  // Validation function for current step
  const validateCurrentStep = () => {
    let stepErrors = {};

    switch (activeStep) {
      case 0:
        stepErrors = validatePersonalDetails();
        break;
      case 1:
        stepErrors = validateCountryDetails();
        break;
      case 2:
        stepErrors = validateSkills();
        break;
      case 3:
        stepErrors = validateCredentials();
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = async () => {
    const isValid = validateCurrentStep();

    if (!isValid) {
      return;
    }

    if (activeStep === steps.length - 1) {
      setLoading(true);

      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData?.name);
        formDataToSend.append("gender", formData?.gender);
        formDataToSend.append("phoneNumber", formData.phoneNumber);
        formDataToSend.append(
          "countryId",
          formData?.countryId?.value || formData?.countryId
        );
        formDataToSend.append(
          "stateId",
          formData?.stateId?.value || formData?.stateId
        );

        formDataToSend.append("skills", formData.skills.join(","));

        formDataToSend.append("email", formData?.email);
        formDataToSend.append("password", formData?.password);
        formDataToSend.append(
          "password_confirmation",
          formData.password_confirmation
        );
        formDataToSend.append("photo", formData.photo);

        for (let pair of formDataToSend.entries()) {
          console.log(pair[0], pair[1]);
        }
        const res = await submitForm(formDataToSend);
        if (res.success === true) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User added successfully!",
          });
          setActiveStep(activeStep + 1);
          setFormData({
            name: "",
            gender: "",
            phoneNumber: "",
            countryId: "",
            stateId: "",
            photo: null,
            email: "",
            password: "",
            password_confirmation: "",
            skills: [],
          });
        }
        console.log("Form Submitted Successfully");
      } catch (error) {
        console.error(error);
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setErrors({});
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Personaldetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            validateField={(field, value) => {
              const fieldErrors = validatePersonalDetails();
              setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
            }}
          />
        );
      case 1:
        return (
          <Countrydetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            validateField={(field, value) => {
              const fieldErrors = validateCountryDetails();
              setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
            }}
          />
        );
      case 2:
        return (
          <Skillsdetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            validateField={() => {
              const fieldErrors = validateSkills();
              setErrors((prev) => ({ ...prev, ...fieldErrors }));
            }}
          />
        );
      case 3:
        return (
          <Credentaildetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            validateField={(field, value) => {
              const fieldErrors = validateCredentials();
              setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
            }}
          />
        );
      default:
        return "Unknown step";
    }
  };

  useEffect(() => {
    if (activeStep === steps?.length) {
      setTimeout(() => {
        navigate(`/List`);
      }, 1000);
    }
  }, [activeStep, navigate]);

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg mt-14">
        <h3 className="text-left text-[1.125rem] font-semibold">
          Stepper Form
        </h3>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="bg-white p-4 rounded-lg">
        {activeStep === steps.length ? (
          <Typography variant="h5">
            Thank you for submitting the form!
          </Typography>
        ) : (
          <>
            <Typography variant="h5">{getStepContent(activeStep)}</Typography>
            <div className="flex justify-between w-full mt-4">
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? (
                  loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
                      viewBox="0 0 24 24"
                    ></svg>
                  ) : (
                    "Submit"
                  )
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
