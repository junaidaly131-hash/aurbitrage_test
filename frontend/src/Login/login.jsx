import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { Box, Checkbox } from "@mui/material";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import HeroImage from "../assets/images/new-hero-img.svg";
import MainLogo from "../assets/images/logo.svg";
import ForgotPassword from "./forgot-password";
import Cookies from "js-cookie";
import { StyledBox, StyledCard, StyledButton } from "./styles";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isForgot, setIsForgot] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = Cookies.get("savedEmail");
    const savedPassword = Cookies.get("savedPassword");
    if (savedEmail) {
      setEmail(savedEmail);
      if (savedPassword) {
        setPassword(savedPassword);
      }
      setRememberMe(true);
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = async (email, password) => {
    setLoading(true);
    const apiEndpoint = `api/v1/user/login`;
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setLoading(false);
      const errorData = await response.json();
      if (response.status === 400) {
        throw new Error(errorData.data.password[0]);
      } else if (response.status === 401 || response.status === 404) {
        throw new Error(errorData.data);
      } else {
        throw new Error("An error occurred during login.");
      }
    }

    setLoading(false);
    const result = await response.json();
    login(
      result.data.Token,
      {
        token: result.data.Token,
        userRole: result.data.UserRole,
        userName: result.data.UserName,
        userId: result.data.UserId,
        dealerId: result.data.DealerId,
        dealerName: result.data.DealerName,
        email: result.data.email,
        phoneNo: result.data.phoneNo,
        profileImage: result.data.profileImage,
        contributor: result.data.contributor,
        isStoneXIntegrated: result.data.isStoneXIntegrated,
        isDillionGageIntegrated: result.data.isDillionGageIntegrated,
        isUpstateIntegrated: result.data.isUpstateIntegrated,
        dealerPricingEmail: result.data.dealerPricingEmail,
      },
      rememberMe,
    );

    if (rememberMe) {
      Cookies.set("savedEmail", email, { expires: 30 });
      Cookies.set("savedPassword", password, { expires: 30 });
    } else {
      Cookies.remove("savedEmail");
      Cookies.remove("savedPassword");
    }

    if (from === "/") {
      navigate("/dashboard/pricing");
    } else {
      navigate(from);
    }
  };

  const handleForgotPassword = () => {
    setIsForgot(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Grid container sx={{ alignItems: "center", background: "#000" }}>
        {screenWidth >= 900 && (
          <Grid
            sx={{ background: "#DBA42D", px: 10, height: "100vh", py: 8 }}
            item
            md={6}
            xs={12}
          >
            <StyledBox>
              <div className="innerDiv">
                <img
                  src={HeroImage}
                  className="login-image"
                  alt="login-image"
                />
                <h4>
                  {" "}
                  Making precious metals trading <br /> better than ever before.
                </h4>
                <p>
                  We’re committed to supporting the precious metals community by
                  creating an intuitive platform and powerful network to help
                  you trade and understand the marketplace.
                </p>
              </div>
            </StyledBox>
          </Grid>
        )}
        <Grid
          item
          md={6}
          xs={12}
          sx={{ px: 10, height: "100vh" }}
          className="log-pad"
        >
          <Box>
            <StyledCard>
              <div className="login-form-content">
                <img
                  src={MainLogo}
                  alt="Login"
                  className="login-logo"
                  onClick={() => {
                    navigate("/");
                  }}
                />
                <h3 style={{ marginBottom: "10px", color: "#fff" }}>
                  Welcome to Aurbitrage
                </h3>
                <p style={{ color: "#8a8a8a" }}>
                  The precious metals trading platform, <br /> powering
                  real-time pricing.
                </p>
              </div>
              {isForgot ? (
                <ForgotPassword />
              ) : (
                <form onSubmit={handleFormSubmit} className="login-form">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      color: "#fff",
                    }}
                  >
                    <label className="login-label">Email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      className="login-input"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      color: "#fff",
                      marginTop: "20px",
                    }}
                  >
                    <label className="login-label">Password</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="login-input"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      color: "#fff",
                      marginTop: "20px",
                    }}
                  >
                    <label
                      onClick={handleForgotPassword}
                      className="login-label"
                    >
                      Forgot Password?
                    </label>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{ "& .MuiSvgIcon-root": { color: "#fff" } }}
                    />
                    <label className="login-remember">Remember me</label>
                  </Box>

                  <Box>
                    <StyledButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {loading ? (
                        <>
                          <CircularProgress size={22} />
                        </>
                      ) : (
                        "Login"
                      )}
                    </StyledButton>
                  </Box>
                </form>
              )}
            </StyledCard>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
