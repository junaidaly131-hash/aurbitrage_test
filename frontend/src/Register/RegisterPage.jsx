import React, { useState } from "react";
import { Grid, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useCreateUser from "./hooks/useCreateUser";
import Header from "./Header";
import Steps from "./Steps";
import RegistrationForm from "./RegisterationForm";
import RegistrationSuccess from "./RegisterationSuccess";

const steps = ["", "", "", ""];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    phoneNo: "",
    lastName: "",
    dealerName: "",
    referenceDealer1: "",
    referenceTrader1: "",
    referenceTraderEmail1: "",
    referenceTraderPhoneNo1: "",
    referenceDealer2: "",
    referenceTrader2: "",
    referenceTraderEmail2: "",
    referenceTraderPhoneNo2: "",
    referenceDealer3: "",
    referenceTrader3: "",
    referenceTraderEmail3: "",
    referenceTraderPhoneNo3: "",
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { handleRegister, loading } = useCreateUser();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleStep = (step) => () => setActiveStep(step);
  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await handleRegister(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.dealerName,
        formData.phoneNo,
        formData.referenceDealer1,
        formData.referenceTrader1,
        formData.referenceTraderEmail1,
        formData.referenceTraderPhoneNo1,
        formData.referenceDealer2,
        formData.referenceTrader2,
        formData.referenceTraderEmail2,
        formData.referenceTraderPhoneNo2,
        formData.referenceDealer3,
        formData.referenceTrader3,
        formData.referenceTraderEmail3,
        formData.referenceTraderPhoneNo3,
      );
      setRegistrationSuccess(true);
    } catch (e) {
      console.error("Registration failed:", e);
      toast.error(e.message);
    }
  };

  return (
    <Box>
      <Grid container sx={{ alignItems: "center", background: "#000" }}>
        <Header />
        <Grid
          item
          sm={6}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            px: { xs: 2, md: 6 },
            height: { xs: "auto", md: "100vh" },
            backgroundColor: "#DBA42D",
            py: 6,
            overflowY: "scroll",
            borderRadius: { xs: "20px", sm: "0" },
          }}
          className="log-pad"
        >
          <Box sx={{ width: "100%" }}>
            <Card style={{ backgroundColor: "transparent", boxShadow: "none" }}>
              <div
                className="login-form-content"
                style={{ textAlign: "start", color: "#fff" }}
              >
                {!registrationSuccess && (
                  <Box
                    sx={{
                      background: "#000",
                      width: "50px",
                      height: "7px",
                      borderRadius: "20px",
                    }}
                  ></Box>
                )}
                <p
                  style={{
                    color: "#000",
                    fontSize: "15px",
                    marginTop: "20px",
                    marginBottom: "-35px",
                  }}
                >
                  {[1, 2, 3].includes(activeStep) &&
                    !registrationSuccess &&
                    "To ensure a trusted marketplace for our members, we require each applicant to provide contact information for three wholesale business references who can confirm your experience and ethical practices in the coin dealing community. Please do not list multiple traders at one dealer."}
                </p>

                <h4 style={{ marginBottom: "10px", color: "#000 " }}>
                  {activeStep === 0 &&
                    !registrationSuccess &&
                    " Enter your basic details"}
                  {activeStep === 1 &&
                    !registrationSuccess &&
                    " First Reference Information"}
                  {activeStep === 2 &&
                    !registrationSuccess &&
                    " Second Reference Information"}
                  {activeStep === 3 &&
                    !registrationSuccess &&
                    " Third Reference Information"}
                </h4>
              </div>
              {registrationSuccess ? (
                <RegistrationSuccess inviteUser={false} />
              ) : (
                <>
                  <Steps
                    steps={steps}
                    activeStep={activeStep}
                    completed={completed}
                    handleStep={handleStep}
                  />
                  <RegistrationForm
                    activeStep={activeStep}
                    isLastStep={isLastStep()}
                    handleFormSubmit={handleFormSubmit}
                    formData={formData}
                    setFormData={setFormData}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    registering={loading}
                    inviteUser={false}
                  />
                </>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPage;
