import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import HeroImage from "../../assets/images/about-hero.svg";
import MainLogo from "../../assets/images/logo.svg";
import DGLogo from "../../assets/images/DG.svg";
import StoneXLogo from "../../assets/images/stoneX.svg";
import AboutImg from "../../assets/images/about-img.svg";
import Feature1 from "../../assets/images/feature-1.svg";
import TrialImg from "../../assets/images/trail-img.svg";
import AboutUs from "../../assets/images/about-us.svg";
import Rarcoa from "../../assets/images/rarcoa-img.svg";
import Dillion from "../../assets/images/dillion-img.svg";
import Jack from "../../assets/images/jackhunt-img.svg";
import Imperial from "../../assets/images/imperial-img.svg";
import Footer from "./Footer";

import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";

const pages = ["About", "Features", "Partners", "Learn"];

const BtnStyle = {
  padding: "10px 20px",
  borderRadius: "30px",
  backgroundColor: "#DBA42D",
  color: "#000",
  fontWeight: "700",
  textTransform: "capitalize",
  fontSize: "14px",
};

const ListStyle = {
  margin: "7px 0",
  textDecoration: "none",
  color: "#fff",
  fontSize: "17px",
};

const AboutPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box className="main-layout ">
        {/* navbar begins */}
        <Navbar about={"true"} />
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
          }}
        >
          <Grid item xs={12} md={6}>
            <Box className="hero-box">
              <img
                loading="lazy"
                src={AboutUs}
                alt="hero-img"
                className="hero-img"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              className="about-sec"
              sx={{ textAlign: { md: "start", xs: "center" } }}
            >
              <h3
                style={{
                  marginBottom: "20px",
                }}
              >
                About Aurbitrage
              </h3>
              <h6
                style={{
                  fontWeight: "400",
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: "30px",
                  color: "#fff",
                }}
              >
                Precious metals have been trusted stores of value for millennia.
                We're here to modernize how they're traded.
                <br />
                <br />
                Aurbitrage brings together top bullion and pre-33 gold and
                silver market makers, delivering unparalleled price
                transparency. Gone are the days of combing through dozens of
                price sheets or logging onto portals. We've consolidated the
                market, putting accurate pricing in one place at your
                fingertips.
                <br />
                <br />
                Our platform empowers dealers to make faster, more informed
                decisions, increasing efficiency and profitability. Now you can
                focus on what really matters: growing your business and building
                stronger relationships.
                <br />
                <br />
                As markets fluctuate, we keep you ahead with real-time updates
                on premiums and product availability.
                <br />
                <br />
                Join our network and let Aurbitrage work for you.
              </h6>
              <Button
                onClick={() => navigate("/register")}
                style={{
                  ...BtnStyle,
                  marginTop: "40px",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                Sign up for a free trial today!
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* hero section ends */}

        {/* our partners section begins */}
        <Grid
          className="our-partners"
          container
          sx={{
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
                Our Partners
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
                Forge Profitable Relationships with Aurbitrage
              </h3>
              <h4
                style={{
                  fontSize: { xs: "16px", md: "18px" },
                  margin: "0px",
                  fontWeight: "500",
                  textAlign: "start",
                }}
              >
                Collaborate with Industry-Leading Metal Traders to <br /> Expand
                Your Trading Horizons and Maximize Your Returns
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

        {/* trail section begins */}
        <Grid
          className="trail-sec"
          container
          sx={{
            backgroundColor: "#DBA42D",
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
                Ready to leverage <br /> Aurbitrage to <br /> your advantage?{" "}
              </h3>
              <p
                style={{
                  fontSize: "23px",
                  lineHeight: "30px",
                  fontWeight: "500",
                  textAlign: "start",
                  margin: "12px 0",
                }}
              >
                Start Your Metal Trading Odyssey Today <br /> – Join Aurbitrage
                and Dive Into a World <br /> of Profitable Opportunities
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
                loading="lazy"
                src={TrialImg}
                alt="trail-img"
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

export default AboutPage;
