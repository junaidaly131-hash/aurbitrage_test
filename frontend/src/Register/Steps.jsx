import React from "react";
import { Stepper, Step, StepButton } from "@mui/material";

const Steps = ({ steps, activeStep, completed, handleStep }) => (
  <Stepper
    sx={{
      "& .MuiStepConnector-line ": {
        borderColor: "#000",
        borderTopStyle: "dashed",
        borderTopWidth: "1.6px",
      },
    }}
    nonLinear
    activeStep={activeStep}
  >
    {steps.map((label, index) => (
      <Step
        key={label}
        sx={{
          "& .MuiSvgIcon-root": {
            color: "#E9CF95",
            border: "2px solid #2B2B2B",
            borderRadius: "50%",
          },
        }}
        completed={completed[index]}
      >
        <StepButton
          sx={{
            "& .Mui-active": { fill: "#fff" },
            "& .MuiStepIcon-text": { fill: "#000" },
          }}
          onClick={handleStep(index)}
        >
          {label}
        </StepButton>
      </Step>
    ))}
  </Stepper>
);

export default Steps;
