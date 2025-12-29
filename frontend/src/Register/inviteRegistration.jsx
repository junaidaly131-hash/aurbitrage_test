import React, { useEffect, useState } from "react";
import { Button, Card, Grid, Box, CircularProgress } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import MainLogo from "../assets/images/logo.svg";
import useFetchInvitedUser from "./hooks/useGetInvitedUser";
import LeftSide from "./Components/pageLeftSide";
import Header from "./Header";
import RegistrationSuccess from "./RegisterationSuccess";
import RegistrationForm from "./RegisterationForm";
import useRegisterInvite from "./hooks/useRegisterInviteUser";

const InviteRegistrationPage = () => {
  const {
    invitedUser,
    loading: inviteLoading,
    error,
    fetchInvitedUser,
  } = useFetchInvitedUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    phoneNo: "",
    lastName: "",
    dealerName: "",
    inviteId: "",
  });

  const [invalidId, setInvalidId] = useState(false);
  const { handleInviteRegister, loading } = useRegisterInvite();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [alreadyRegister, setAlreadyRegister] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = () => 1 === 1;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const inviteId = location.pathname.split("/").pop();
    formData.inviteId = inviteId;
    if (inviteId) {
      fetchInvitedUser(inviteId);
    }
  }, [location]);

  useEffect(() => {
    if (!inviteLoading && error === null && invitedUser) {
      formData.email = invitedUser.email;
      formData.dealerName = invitedUser.dealer.dealerName;
      if (invitedUser.joined) {
        setAlreadyRegister(true);
      }
    }
    if (error !== null) {
      setInvalidId(true);
    }
  }, [inviteLoading, error, invitedUser]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await handleInviteRegister(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.dealerName,
        formData.phoneNo,
        formData.inviteId,
      );
      setRegistrationSuccess(true);
    } catch (e) {
      console.error("Registration failed:", e);
      toast.error(e.message);
    }
  };

  return (
    <>
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
                style={{ textAlign: "start", color: "#000" }}
              >
                {!registrationSuccess ||
                  !alreadyRegister ||
                  (!invalidId && (
                    <Box>
                      <Box
                        sx={{
                          background: "#000",
                          width: "50px",
                          height: "7px",
                          borderRadius: "20px",
                        }}
                      ></Box>
                      <h4 style={{ marginBottom: "10px", color: "#000" }}>
                        Enter your basic details
                      </h4>
                    </Box>
                  ))}
              </div>
              {invalidId ? (
                <Box
                  sx={{ padding: "20px", textAlign: "center", color: "#000" }}
                >
                  <div>
                    <h3>It Looks like</h3>
                    <p>
                      Your invite has been cancelled or maybe you're not
                      authorized.
                    </p>
                  </div>
                </Box>
              ) : (
                <>
                  {alreadyRegister ? (
                    <Box
                      sx={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#000",
                      }}
                    >
                      <div>
                        <h3>It Looks like</h3>
                        <p>You have already Registered using this invite</p>
                      </div>
                    </Box>
                  ) : (
                    <>
                      {registrationSuccess ? (
                        <RegistrationSuccess inviteUser={true} />
                      ) : (
                        <>
                          <RegistrationForm
                            activeStep={activeStep}
                            isLastStep={isLastStep()}
                            handleFormSubmit={handleFormSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            registering={loading}
                            inviteUser={true}
                          />
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default InviteRegistrationPage;
