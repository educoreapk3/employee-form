import { useState } from "react";

const useFormData = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    dependents: "",
    nationality: "",
    secondaryNationality: "",
    passportNumber: "",
    passportExpiry: "",
    passportPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return {
    formData,
    handleChange,
    currentStep,
    setCurrentStep,
  };
};

export default useFormData;
