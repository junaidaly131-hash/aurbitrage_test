import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  CssBaseline,
  Box,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import MainLogo from "../assets/images/logo.svg";
import { useParams } from "react-router-dom";
import useAddRefResponse from "./Hooks/useAddRefResponse";
import useCheckResponse from "./Hooks/useCheckResponseExists";
import useGetUserOfReference from "./Hooks/useGetUserOfReference";
import { useNavigate } from "react-router-dom";

function FeedbackPage() {
  const [referenceName, setReferenceName] = useState("");
  const [goodUnderstanding, setGoodUnderstanding] = useState(false);
  const [wouldRecommend, setWouldRecommend] = useState(false);
  const [referenceFeedback, setReferenceFeedback] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const { refId } = useParams();
  const {
    handleAddResponse,
    loading: addLoading,
    error: addError,
  } = useAddRefResponse();
  const {
    handleCheckResponse,
    loading: checkLoading,
    error: checkError,
  } = useCheckResponse();
  const { userReference, loading, error, getUserOfReference } =
    useGetUserOfReference();

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [invalidUrl, setInvalidUrl] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (refId) {
        setReferenceId(refId);
        try {
          const res = await handleCheckResponse(refId);
          if (res.success && res.data === "Reference response already exists") {
            setAlreadySubmitted(true);
          } else if (
            (res.success && res.data === "Reference Email does not") ||
            !res.success
          ) {
            setInvalidUrl(true);
          } else {
          }
        } catch (error) {
          console.error("Error while checking response:", error);
        }
      }
    };
    fetchData();
  }, [refId]);

  useEffect(() => {
    getUserOfReference(refId);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleAddResponse(
        referenceFeedback,
        referenceId,
        goodUnderstanding,
        wouldRecommend,
      );
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Response failed:", error);
      // Handle error
    }
  };
  if (invalidUrl) {
    return <h2>Page Not Found</h2>;
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", height: "90vh" }}>
          <div
            className="login-form-content"
            style={{ textAlign: "center", color: "#fff" }}
          >
            <img
              src={MainLogo}
              alt="Login"
              onClick={() => {
                navigate("/");
              }}
              style={{ height: "64px" }}
            />
          </div>

          <Container
            maxWidth="lg"
            style={{
              backgroundColor: "#292929",
              padding: "80px",
              borderRadius: "15px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              marginTop: "15px",
              height: "80vh",
              overflowY: "scroll",
            }}
          >
            {checkLoading ? (
              <Box sx={{ padding: "20px", textAlign: "center", color: "#fff" }}>
                <CircularProgress />
              </Box>
            ) : alreadySubmitted ? (
              <Box sx={{ padding: "20px", textAlign: "center", color: "#fff" }}>
                <div>
                  <h3>You have Already Submitted Feedback!</h3>
                </div>
              </Box>
            ) : (
              <>
                {registrationSuccess ? (
                  <Box
                    sx={{
                      padding: "20px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <EmailIcon
                        style={{ fontSize: "100px", color: "#dba42d" }}
                      />
                      <h3
                        style={{
                          textAlign: "center",
                          color: "#fff",
                          margin: "10px 0",
                        }}
                      >{`Thanks  ${userReference.reference?.traderName}!`}</h3>
                      <p>
                        Please note we may reach out to you with additional
                        questions if necessary, we appreciate your feedback.
                      </p>
                    </div>
                  </Box>
                ) : (
                  <>
                    <Typography variant="h3" gutterBottom>
                      Reference Confirmation
                    </Typography>

                    <Typography component="div">
                      <Box
                        sx={{
                          fontStyle: "italic",
                          m: 1,
                          color: "#fff",
                          marginBottom: "10px",
                        }}
                      >
                        Please keep in mind all responses are strictly
                        confidential and will only be seen and discussed within
                        Aurbitrage. Your responses do not constitute any
                        liability for actions taken by the applicant at any
                        point in the future.
                      </Box>
                    </Typography>

                    <form onSubmit={handleSubmit}>
                      <FormControlLabel
                        sx={{
                          color: "#fff",
                          "& .MuiTypography-root": { fontSize: "16px" },
                        }}
                        control={
                          <Checkbox
                            checked={goodUnderstanding}
                            onChange={(e) =>
                              setGoodUnderstanding(e.target.checked)
                            }
                            sx={{ "& .MuiSvgIcon-root": { color: "#fff" } }}
                          />
                        }
                        label={`Can you confirm you have done business with ${userReference.user?.firstName + " " + userReference.user?.lastName} and that ${userReference.user?.dealer?.dealerName} is currently in good standing with you?`}
                      />
                      <FormControlLabel
                        sx={{
                          color: "#fff",
                          marginTop: "15px",
                          "& .MuiTypography-root": { fontSize: "16px" },
                        }}
                        control={
                          <Checkbox
                            checked={wouldRecommend}
                            onChange={(e) =>
                              setWouldRecommend(e.target.checked)
                            }
                            sx={{ "& .MuiSvgIcon-root": { color: "#fff" } }}
                          />
                        }
                        label={`Would you feel comfortable recommending ${userReference.user?.firstName + " " + userReference.user?.lastName} and ${userReference.user?.dealer?.dealerName} to participate in an online coin network focused on reputable and trustworthy businesses? `}
                      />

                      <Typography>
                        <label
                          htmlFor="feedback"
                          style={{
                            marginTop: "20px",
                            display: "block",
                            color: "#fff",
                            fontSize: "16px",
                          }}
                        >
                          {`Please let us know below if you have any additional comments (positive or negative) you think would be valuable in considering ${userReference.user?.dealer?.dealerName}, and ${userReference.user?.firstName}'s admission into our network:`}
                        </label>
                      </Typography>
                      <TextField
                        id="feedback"
                        label="Feedback"
                        variant="outlined"
                        fullWidth
                        multiline
                        required
                        rows={4}
                        value={referenceFeedback}
                        onChange={(e) => setReferenceFeedback(e.target.value)}
                        sx={{
                          "& .MuiFormLabel-root": { color: "#fff" },
                          margin: "12px 0",
                          "& .MuiInputBase-root ": { color: "#fff" },
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        disabled={addLoading}
                        sx={{
                          background: "#dba42d",
                          padding: "8px 30px",
                          "&:hover": { background: "#dba42d" },
                        }}
                      >
                        {addLoading ? <CircularProgress size={22} /> : "Submit"}
                      </Button>
                    </form>
                  </>
                )}
              </>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default FeedbackPage;
