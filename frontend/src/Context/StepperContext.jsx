import React, { createContext, useContext, useState } from "react";

const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {
  const [validationStates, setValidationStates] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const [formData, setFormData] = useState({
    step0: {},
    step1: {},
    step2: {},
    step3: {},
  });

  const updateValidationState = (step, isValid) => {
    setValidationStates((prev) => ({ ...prev, [step]: isValid }));
  };

  const updateFormData = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [`step${step}`]: { ...prev[`step${step}`], ...data },
    }));
  };

  return (
    <ValidationContext.Provider
      value={{
        validationStates,
        updateValidationState,
        formData,
        updateFormData,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => useContext(ValidationContext);
