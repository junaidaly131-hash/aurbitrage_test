import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import HeroImage from "../../assets/images/pricing-dashboard-screenshot.png";
import MessagingFeature from "../../assets/images/messaging-feature.svg";
import StoneXLogo from "../../assets/images/stoneX.svg";
import Feature2 from "../../assets/images/feature-2.svg";
import Feature3 from "../../assets/images/posting-board-ss.png";
import GoldImg from "../../assets/images/Gold-Img.jpeg";
import Rarcoa from "../../assets/images/rarcoa-img.svg";
import Dillion from "../../assets/images/dillion-img.svg";
import Jack from "../../assets/images/jackhunt-img.svg";
import Imperial from "../../assets/images/imperial-img.svg";
import Footer from "./Footer";
const BtnStyle = {
  padding: "10px 20px",
  borderRadius: "30px",
  backgroundColor: "#DBA42D",
  color: "#000",
  fontWeight: "700",
  textTransform: "capitalize",
  fontSize: "14px",
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [pricing, setPricing] = useState({
    price: 299,
    formattedPrice: "$299/month",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch("/api/v1/subscription-products/pricing");
        const data = await response.json();

        if (data.success && data.data) {
          setPricing({
            price: data.data.price,
            formattedPrice: data.data.formattedPrice,
          });
        }
      } catch (error) {
        console.error("Error fetching pricing:", error);
        // Keep default pricing if fetch fails
      }
    };

    fetchPricing();
  }, []);
  return (
    <>
      <Box
        className="main-layout"
        sx={{
          width: "100%",
        }}
      >
        {/* navbar begins */}
        <Navbar />
        {/* navbar ends */}

        {/* hero section begins */}
        <Grid
          className="hero-sec"
          container
          columnSpacing={8}
          sx={{
            color: "#fff",
            alignItems: "center",
            justifyContent: { md: "start", xs: "center" },
            position: "relative",
            padding: { xs: "0 20px", md: "0", lg: "100px" },
            marginTop: { lg: "50px" },
            marginBottom: { lg: "100px" },
          }}
        >
          <Grid item xs={12} md={6}>
            <Box className="hero-box">
              <img
                src={HeroImage}
                alt="hero-img"
                className="hero-img"
                style={{
                  display: "block",
                  width: "95%",
                  maxWidth: "550px",
                  background: "transparent",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { md: "start", xs: "center" },
                marginLeft: { md: "50px", xs: "0" },
              }}
            >
              <h1
                style={{
                  marginBottom: "30px",
                  fontSize: { xs: "28px", md: "48px" },
                }}
              >
                Spot the <br /> opportunity
              </h1>
              <h5
                style={{
                  margin: 0,
                  color: "#fff",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                  fontSize: "23px",
                }}
              >
                The precious metals trading <br /> platform, powering real-time{" "}
                <br /> pricing.
              </h5>
              <Button
                onClick={() => navigate("/register")}
                style={{
                  ...BtnStyle,
                  marginTop: "10px",
                  backgroundColor: "#fff",
                  color: "#000",
                  fontSize: "14px",
                  marginBottom: "25px",
                }}
              >
                Apply for Membership
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* hero section ends */}

        {/* our partners section begins */}
        <Grid
          id="Contributors"
          className="our-partners"
          container
          sx={{
            padding: { xs: "0 20px", md: "0", lg: "100px" },
            backgroundColor: "#18181A",
            color: "#fff",
          }}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { md: "start", xs: "start" },
              }}
            >
              <h5
                style={{
                  marginBottom: "10px",
                  fontSize: { xs: "18px", md: "24px" },
                }}
              >
                Our Contributors
              </h5>
              <Box sx={{ display: "flex" }}>
                <span
                  style={{
                    width: "60px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    zIndex: "999",
                  }}
                ></span>
                <span
                  style={{
                    width: "90px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#383838",
                    marginLeft: "-10px",
                  }}
                ></span>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ textAlign: { md: "start", xs: "start" } }}>
              <h3
                style={{
                  margin: "12px 0",
                  fontSize: { xs: "24px", md: "36px" },
                  textAlign: "start",
                }}
              >
                Real-time pricing at your fingertips
              </h3>
              <h4
                style={{
                  fontSize: { xs: "16px", md: "18px" },
                  margin: "0px",
                  fontWeight: "500",
                  textAlign: "start",
                }}
              >
                View real-time pricing from the largest bullion and pre-33 gold
                and silver market makers in the US.
              </h4>
            </Box>
            <Box
              className="logo-imgs"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "center",
                  md: "center",
                  lg: "space-between",
                },
                flexWrap: "wrap",
                marginTop: "80px",
              }}
            >
              <Box
                component="img"
                src={StoneXLogo}
                alt="stoneX-logo"
                sx={{
                  width: { xs: "150px", md: "227px" },
                  height: { xs: "45px", md: "67px" },
                }}
              />
              <Box
                component="img"
                src={Dillion}
                alt="stoneX-logo"
                sx={{
                  width: { xs: "150px", md: "227px" },
                  height: { xs: "45px", md: "67px" },
                }}
              />
              <Box
                component="img"
                src={Rarcoa}
                alt="stoneX-logo"
                sx={{
                  width: { xs: "150px", md: "227px" },
                  height: { xs: "45px", md: "67px" },
                }}
              />
              <Box
                component="img"
                src={Imperial}
                alt="stoneX-logo"
                sx={{
                  width: { xs: "150px", md: "227px" },
                  height: { xs: "65px", md: "97px" },
                }}
              />
              <Box
                component="img"
                src={Jack}
                alt="stoneX-logo"
                sx={{
                  width: { xs: "150px", md: "227px" },
                  height: { xs: "45px", md: "67px" },
                }}
              />
            </Box>
          </Grid>
        </Grid>
        {/* our partners section ends */}

        {/* about aurbitrage section begins */}
        <Grid
          id="About"
          className="about-aurbitrage"
          container
          sx={{
            backgroundColor: "#DBA42D",
            padding: { xs: "0 20px", md: "0", lg: "100px" },
            borderRadius: "30px",
            alignItems: { md: "center", xs: "start" },
          }}
        >
          <Grid item md={6} xs={12}>
            <Box className="about-box">
              <img
                src={GoldImg}
                width={382}
                height={584.01}
                alt="about-img"
                className="about-img"
              />
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { md: "start", xs: "start" },
                my: { md: 0, xs: 2 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { md: "start", xs: "start" },
                }}
              >
                <h5
                  style={{
                    marginBottom: "10px",
                    fontWeight: "700",
                    textAlign: "start",
                  }}
                >
                  About Aurbitrage
                </h5>
                <Box sx={{ display: "flex" }}>
                  <span
                    style={{
                      width: "50px",
                      height: "6px",
                      borderRadius: "20px",
                      backgroundColor: "#000",
                      zIndex: "999",
                    }}
                  ></span>
                  <span
                    style={{
                      width: "90px",
                      height: "6px",
                      borderRadius: "20px",
                      backgroundColor: "#BFBABA",
                      marginLeft: "-10px",
                    }}
                  ></span>
                </Box>
              </Box>
              <h3
                style={{
                  color: "#000",
                  fontWeight: "700",
                  marginBottom: "10px",
                  textAlign: "start",
                  marginLeft: "10px",
                }}
              >
                {" "}
                Making precious metals <br /> trading better than <br /> ever
                before.
              </h3>
              <h5
                style={{
                  fontFamily: "Manrope",
                  lineHeight: "30px",
                  fontWeight: "530",
                  fontSize: "23px",
                  margin: "0px",
                  textAlign: "left",
                  color: "#000000",
                }}
              >
                We’re committed to supporting the <br /> precious metals
                community by creating <br /> an intuitive platform and powerful{" "}
                <br /> network to help you trade and <br /> understand the
                marketplace.
              </h5>

              <Button
                onClick={() => navigate("/about")}
                style={{
                  padding: "10px 30px",
                  borderRadius: "90px",
                  backgroundColor: "#000",
                  color: "#fff",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: "700",
                  marginTop: "20px",
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* about aurbitrage section ends */}
        {/* features section begins */}
        <Grid
          id="Features"
          className="feat"
          container
          sx={{
            padding: { xs: "0 20px", md: "0", lg: "100px" },
          }}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { md: "start", xs: "start" },
              }}
            >
              <h5
                style={{
                  marginBottom: "10px",
                  color: "#fff",
                  fontSize: { xs: "18px", md: "24px" },
                  textAlign: "start",
                }}
              >
                Features
              </h5>
              <Box sx={{ display: "flex" }}>
                <span
                  style={{
                    width: "60px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    zIndex: "999",
                  }}
                ></span>
                <span
                  style={{
                    width: "90px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#383838",
                    marginLeft: "-10px",
                  }}
                ></span>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <h3
                style={{
                  margin: "12px 0",
                  fontSize: { xs: "24px", md: "36px" },
                  textAlign: "start",
                }}
              >
                A platform that works for you
              </h3>
              <h4
                style={{
                  fontSize: { xs: "16px", md: "18px" },
                  margin: "0px",
                  fontWeight: "500",
                  color: "#fff",
                  textAlign: "start",
                }}
              >
                Now you can focus on growing your business and relationships
                while <br /> letting Aurbitrage handle the price discovery.
              </h4>
            </Box>
          </Grid>
        </Grid>

        <Grid
          className="feat-1"
          container
          sx={{
            padding: { xs: "0 20px", md: "0", lg: "100px" },

            alignItems: { md: "center", xs: "start" },
          }}
        >
          <Grid item md={6} xs={12}>
            <Box className="feature-box">
              <img
                src={Feature2}
                alt="feature-1"
                className="feature-img"
                style={{ width: "95%", maxWidth: "550px" }}
              />
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <h3
                style={{
                  marginBottom: "2px",
                  fontSize: { xs: "24px", md: "45px" },
                  textAlign: "start",
                }}
              >
                {" "}
                Real-time product Dashboard.
              </h3>
              <p
                style={{
                  fontSize: "23px",
                  lineHeight: "30px",
                  color: "#fff",
                  fontWeight: "400",
                  textAlign: "start",
                  margin: "12px 0 !important",
                }}
              >
                View pricing for each product, <br /> automatically updated from
                market <br /> makers.
              </p>

              <Button
                onClick={() => navigate("/login")}
                className="btn-center"
                style={{
                  padding: "10px 20px",
                  borderRadius: "30px",
                  backgroundColor: "#DBA42D",
                  color: "#000",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: "700",
                  display: "inline-block",
                  margin: "10px 0 !important",
                }}
              >
                Check Prices
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid
          className="feat-2"
          container
          sx={{
            padding: { xs: "0 20px", md: "0", lg: "100px" },

            alignItems: "center",
            background: "#18181A",
          }}
        >
          <Grid item md={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "start", md: "start" },
                textAlign: { xs: "start", md: "start" },
              }}
            >
              <h5
                style={{
                  marginBottom: "10px",
                  color: "#fff",
                  fontSize: { xs: "18px", md: "24px" },
                }}
              >
                Features
              </h5>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "start", md: "start" },
                }}
              >
                <span
                  style={{
                    width: "60px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    zIndex: "999",
                    marginRight: "5px",
                  }}
                ></span>
                <span
                  style={{
                    width: "90px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#383838",
                  }}
                ></span>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: { xs: "start", md: "start" },
                textAlign: { xs: "start", md: "start" },
              }}
            >
              <h3
                style={{
                  marginBottom: "10px",
                  fontSize: { xs: "24px", md: "45px" },
                  width: { xs: "auto", md: "508px" },
                }}
              >
                Connect and post in our network
              </h3>
              <p
                style={{
                  color: "#fff",
                  textAlign: "start",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                  lineHeight: "37.98px",
                  fontSize: "23px",
                }}
              >
                Create, interact with, and scroll through deals and questions
                posted by members of our community.
              </p>

              <Button
                onClick={() => navigate("/login")}
                className="btn-center"
                style={{
                  padding: "10px 20px",
                  borderRadius: "30px",
                  backgroundColor: "#DBA42D",
                  color: "#000",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Login to Dashboard
              </Button>
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box className="feature-box">
              <img
                style={{ width: "95%", maxWidth: "550px" }}
                src={Feature3}
                alt="feature-1"
                className="feature-img"
              />
            </Box>
          </Grid>
        </Grid>

        <Grid
          className="feat-3 col-rev"
          container
          sx={{
            padding: { xs: "0 20px", md: "0", lg: "100px" },

            alignItems: { md: "center", xs: "start" },
          }}
        >
          <Grid item md={6} xs={14}>
            <Box className="feature-box">
              <img
                src={HeroImage}
                alt="feature-1"
                className="feature-img"
                style={{
                  width: "95%",
                  maxWidth: "550px",
                  height: "auto",
                }}
              />
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { md: "start", xs: "start" },
              }}
            >
              <h5
                style={{
                  marginBottom: "10px",
                  color: "#fff",
                  fontSize: { xs: "18px", md: "22px" },
                  textAlign: "start",
                }}
              >
                Features
              </h5>
              <Box sx={{ display: "flex" }}>
                <span
                  style={{
                    width: "60px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    zIndex: "999",
                  }}
                ></span>
                <span
                  style={{
                    width: "90px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#383838",
                    marginLeft: "-10px",
                  }}
                ></span>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <h3
                style={{
                  marginBottom: "2px",
                  fontSize: { xs: "24px", md: "45px" },
                  textAlign: "start",
                }}
              >
                {" "}
                Track your favorite <br /> products at a glance
              </h3>
              <p
                style={{
                  color: "#fff",
                  textAlign: "start",
                  fontWeight: "400",
                  fontFamily: "Manrope",
                  lineHeight: "37.98px",
                  fontSize: "23px",
                }}
              >
                Refine your product dashboard with a customizable favorites
                page, tracking the products you deal with most, easier than ever
                before.
              </p>

              <Button
                onClick={() => navigate("/register")}
                className="btn-center"
                style={{
                  padding: "10px 20px",
                  borderRadius: "30px",
                  backgroundColor: "#fff",
                  color: "#000",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Get Started
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid
          className="feat-4"
          container
          sx={{
            padding: { xs: "0 20px", md: "0", lg: "100px" },

            alignItems: { md: "center", xs: "start" },
            background: "#18181A",
          }}
        >
          <Grid item md={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { md: "start", xs: "start" },
              }}
            >
              <h5
                style={{
                  marginBottom: "10px",
                  color: "#fff",
                  fontSize: { xs: "18px", md: "22px" },
                  textAlign: "start",
                }}
              >
                Features
              </h5>
              <Box sx={{ display: "flex" }}>
                <span
                  style={{
                    width: "60px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    zIndex: "999",
                  }}
                ></span>
                <span
                  style={{
                    width: "90px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#383838",
                    marginLeft: "-10px",
                  }}
                ></span>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <h3 style={{ marginBottom: "2px", textAlign: "start" }}>
                Streamlined Communication
              </h3>
              <p
                style={{
                  lineHeight: "30px",
                  color: "#fff",
                  fontSize: "23px",
                  fontWeight: "400",
                  textAlign: "start",
                  fontFamily: "Manrope",
                }}
              >
                Direct message traders about deals, chat in <br /> groups or
                chat amongst your team members <br /> with our intuitive
                messaging service.
              </p>

              <Button
                onClick={() => navigate("/login")}
                className="btn-center"
                style={{
                  padding: "10px 20px",
                  borderRadius: "30px",
                  backgroundColor: "#DBA42D",
                  color: "#000",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  fontWeight: "700",
                  fontFamily: "Manrope",
                }}
              >
                Login to Dashboard
              </Button>
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box className="feature-box">
              <img
                style={{ width: "95%", maxWidth: "550px" }}
                src={MessagingFeature}
                alt="feature-1"
                className="feature-img"
              />
            </Box>
          </Grid>
        </Grid>
        {/* features section ends */}

        {/* membership pricing section begins */}
        <Grid
          className="membership-pricing"
          container
          sx={{
            backgroundColor: "#191919",
            padding: { xs: "40px 20px", md: "60px", lg: "100px" },
            borderRadius: "30px",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <h5
                style={{
                  marginBottom: "10px",
                  color: "#fff",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                Membership
              </h5>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <span
                  style={{
                    width: "60px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#DBA42D",
                    zIndex: "999",
                  }}
                ></span>
                <span
                  style={{
                    width: "90px",
                    height: "6px",
                    borderRadius: "20px",
                    backgroundColor: "#383838",
                    marginLeft: "-10px",
                  }}
                ></span>
              </Box>
            </Box>

            <h2
              style={{
                color: "#fff",
                fontSize: "48px",
                fontWeight: "700",
                margin: "20px 0",
                textAlign: "center",
              }}
            >
              Professional Membership
            </h2>

            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "#DBA42D",
                  fontWeight: "800",
                  fontSize: "72px",
                  background:
                    "linear-gradient(135deg, #DBA42D 0%, #F4D03F 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ${pricing.price}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontWeight: "500",
                  ml: 2,
                }}
              >
                per month
              </Typography>
            </Box>

            <p
              style={{
                color: "#fff",
                fontSize: "20px",
                lineHeight: "28px",
                fontWeight: "400",
                textAlign: "center",
                margin: "0 auto 40px",
                maxWidth: "600px",
                fontFamily: "Manrope",
              }}
            >
              Unlock the real-time pricing dashboard with professional trading
              tools. All other community features remain free for all members.
            </p>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
                justifyContent: "center",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Button
                onClick={() => navigate("/register")}
                style={{
                  padding: "15px 30px",
                  borderRadius: "30px",
                  backgroundColor: "#DBA42D",
                  color: "#000",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: "700",
                  minWidth: "200px",
                }}
              >
                Register for Membership
              </Button>

              <Button
                onClick={() => navigate("/login")}
                style={{
                  padding: "15px 30px",
                  borderRadius: "30px",
                  backgroundColor: "transparent",
                  color: "#DBA42D",
                  border: "2px solid #DBA42D",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: "700",
                  minWidth: "200px",
                }}
              >
                Member Login
              </Button>
            </Box>

            <Box
              sx={{
                backgroundColor: "rgba(219, 164, 45, 0.1)",
                borderRadius: "20px",
                padding: "30px",
                border: "1px solid rgba(219, 164, 45, 0.2)",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "16px",
                  lineHeight: "24px",
                  textAlign: "center",
                  margin: "0 0 20px 0",
                  fontFamily: "Manrope",
                }}
              >
                <strong>Existing Members:</strong> Log in and enter your payment
                details under Settings to activate your subscription.
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "16px",
                  lineHeight: "24px",
                  textAlign: "center",
                  margin: "0",
                  fontFamily: "Manrope",
                }}
              >
                <strong>New Members:</strong> Register for an account and once
                approved, you can enter your payment details in Settings to
                begin your membership.
              </p>
            </Box>
          </Grid>
        </Grid>
        {/* membership pricing section ends */}

        {/* trail section begins */}
        <Grid
          className="trail-sec"
          container
          sx={{
            backgroundColor: "#DBA42D",
            padding: { xs: "0 20px", md: "0", lg: "100px" },

            borderRadius: "30px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item md={6} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <h3
                style={{
                  color: "#000",
                  marginBottom: "2px",
                  fontSize: { xs: "24px", md: "45px" },
                  textAlign: "start",
                  margin: "15px 0",
                }}
              >
                {" "}
                Ready to experience the Aurbitrage advantage?{" "}
              </h3>
              <p
                style={{
                  fontSize: "23px",
                  lineHeight: "30px",
                  fontWeight: "500",
                  textAlign: "start",
                  margin: "12px 0",
                  fontFamily: "Manrope",
                }}
              >
                Join the network transforming the <br /> industry for precious
                metals dealers.
              </p>

              <Button
                onClick={() => navigate("/register")}
                className="btn-center"
                style={{
                  padding: "10px 20px",
                  borderRadius: "30px",
                  backgroundColor: "#000",
                  color: "#fff",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Start your Free Trial
              </Button>
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <Box className="trial-box">
              <img
                src={HeroImage}
                alt="trail-img"
                style={{ width: "95%", maxWidth: "550px" }}
                className="trial-img"
              />
            </Box>
          </Grid>
        </Grid>
        {/* trail section ends */}

        {/* footer begins */}
        <Footer />
        {/* footer ends */}
      </Box>
    </>
  );
};

export default LandingPage;
