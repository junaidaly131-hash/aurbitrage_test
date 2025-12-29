import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import Avatar from "../assets/images/rounded-avatar.png";
import Lock from "../assets/images/lock.png";
import RoundedPhone from "../assets/images/rounded-phone.png";
import Envelope from "../assets/images/envelope.png";
import PhoneInput from "react-phone-number-input";
import Eye from "../assets/images/eye.svg";
import "react-phone-number-input/style.css";
import { FormStyledBox } from "./styles";

const RegistrationForm = ({
  activeStep,
  handleFormSubmit,
  formData,
  setFormData,
  handleBack,
  handleNext,
  isLastStep,
  registering,
  inviteUser,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordValid = (password) => password.length > 5;

  const isStepComplete = () => {
    if (inviteUser) return true;

    const allFieldsFilled = stepsContent[activeStep].every(
      ({ name }) => formData[name] !== "",
    );

    if (activeStep === 0) {
      return allFieldsFilled && isPasswordValid(formData.password);
    }

    return allFieldsFilled;
  };

  const stepsContent = [
    [
      { label: "First Name", name: "firstName", type: "text", icon: Avatar },
      { label: "Last Name", name: "lastName", type: "text", icon: Avatar },
      { label: "Dealer Name", name: "dealerName", type: "text", icon: Avatar },
      {
        label: "Phone Number",
        name: "phoneNo",
        type: "tel",
      },
      { label: "Email address", name: "email", type: "email", icon: Envelope },
      {
        label: "Password",
        name: "password",
        type: "password",
        icon: Lock,
        eyeIcon: Eye,
      },
    ],
    [
      {
        label: "Dealer Name",
        name: "referenceDealer1",
        type: "text",
        icon: Avatar,
      },
      {
        label: "Trader Name",
        name: "referenceTrader1",
        type: "text",
        icon: Avatar,
      },
      {
        label: "Trader Phone Number",
        name: "referenceTraderPhoneNo1",
        type: "tel",
        icon: RoundedPhone,
      },
      {
        label: "Trader Email Address",
        name: "referenceTraderEmail1",
        type: "email",
        icon: Envelope,
      },
    ],
    [
      {
        label: "Dealer Name",
        name: "referenceDealer2",
        type: "text",
        icon: Avatar,
      },
      {
        label: "Trader Name",
        name: "referenceTrader2",
        type: "text",
        icon: Avatar,
      },
      {
        label: "Trader Phone Number",
        name: "referenceTraderPhoneNo2",
        type: "tel",
        icon: RoundedPhone,
      },
      {
        label: "Trader Email Address",
        name: "referenceTraderEmail2",
        type: "email",
        icon: Envelope,
      },
    ],
    [
      {
        label: "Dealer Name",
        name: "referenceDealer3",
        type: "text",
        icon: Avatar,
      },
      {
        label: "Trader Name",
        name: "referenceTrader3",
        type: "text",
        icon: Avatar,
      },
      {
        label: "Trader Phone Number",
        name: "referenceTraderPhoneNo3",
        type: "tel",
        icon: RoundedPhone,
      },
      {
        label: "Trader Email Address",
        name: "referenceTraderEmail3",
        type: "email",
        icon: Envelope,
      },
    ],
  ];

  return (
    <>
      <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
        <FormStyledBox>
          {stepsContent[activeStep].map(
            ({ label, name, type, icon, eyeIcon }, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  margin: "10px 0",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {label} <span style={{ color: "#fff" }}>*</span>
                </span>
                <Box sx={{ position: "relative", width: "100%" }}>
                  {type !== "tel" && (
                    <img src={icon} className="leftIcon" alt="icon" />
                  )}

                  {type === "tel" ? (
                    <PhoneInput
                      defaultCountry="US"
                      onChange={(v) => (formData[name] = v)}
                      placeholder={`Enter ${activeStep === 0 ? "your" : "Reference"} ${label}`}
                      international
                      countryCallingCodeEditable={false}
                      value={formData[name]}
                      disabled={
                        ["email", "dealerName"].includes(name) && inviteUser
                      }
                    />
                  ) : (
                    <input
                      type={type === "password" && showPassword ? "text" : type}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      placeholder={`Enter ${activeStep === 0 ? "your" : "Reference"} ${label}`}
                      className="commonInputStyle"
                      disabled={
                        ["email", "dealerName"].includes(name) && inviteUser
                      }
                    />
                  )}
                  {type === "password" && (
                    <>
                      <img
                        src={eyeIcon}
                        className="rightIcon"
                        alt="icon"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      />
                      <span
                        className={
                          !isPasswordValid(formData[name]) ? "errorMessage" : ""
                        }
                      >
                        {formData[name] &&
                          !isPasswordValid(formData[name]) &&
                          "Minimum 5 characters required"}
                      </span>
                    </>
                  )}
                </Box>
              </Box>
            ),
          )}
        </FormStyledBox>
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            mr: 1,
            background: "#fff",
            color: "#000",
            ":hover": { background: "#fff" },
            borderRadius: "50px",
            px: 10,
            paddingY: "12px",
          }}
        >
          Prev
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          onClick={isLastStep ? handleFormSubmit : handleNext}
          sx={{
            mr: 1,
            color: "#fff",
            background: "#000",
            borderRadius: "50px",
            ":hover": { background: "#000" },
            px: 10,
            paddingY: "12px",
            ":disabled": {
              color: "#555",
              opacity: 0.7,
            },
          }}
          disabled={!isStepComplete()}
        >
          {isLastStep ? (
            registering ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              "Register"
            )
          ) : (
            "Next"
          )}
        </Button>
      </Box>
    </>
  );
};

export default RegistrationForm;
