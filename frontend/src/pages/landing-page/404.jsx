import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

import HeroImage from "../../assets/images/404-concept.svg";
import MainLogo from "../../assets/images/logo.svg";
import DGLogo from "../../assets/images/DG.svg";
import StoneXLogo from "../../assets/images/stoneX.svg";
import AboutImg from "../../assets/images/about-img.svg";
import Feature1 from "../../assets/images/feature-1.svg";
import TrialImg from "../../assets/images/trail-img.svg";
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

const ErrorPage = () => {
  return (
    <>
      <Box className="main-layout">
        {/* navbar begins */}
        <Navbar about={"true"} />
        {/* navbar ends */}

        {/* hero section begins */}
        <Grid className="hero-sec" container>
          <Grid item xs={12}>
            <Box
              className="error-hero"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1>Oops!</h1>
              <h1 style={{ color: "#fff" }}>
                looks like this Gold Eagle is shooting 14k...this page doesn't
                exist!
              </h1>
              <Box sx={{ textAlign: "center" }} className="hero-box">
                <img
                  style={{ width: "70%" }}
                  src={HeroImage}
                  alt="hero-img"
                  className="hero-img"
                />
              </Box>
              <Button
                style={{
                  ...BtnStyle,
                  marginTop: "40px",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Back to Homepage
                </Link>
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* hero section ends */}

        {/* footer begins */}
        <Grid
          className="footer"
          container
          sx={{
            // px: { xs: 2, md: "135px" },
            // py: { xs: 4, md: 9 },
            color: "#fff",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Grid className="aurbitrage-order" item xs={12} sm={3} md={1} lg={3}>
            <h6 style={{ marginBottom: { xs: "15px", md: "10px" } }}>
              Aurbitrage
            </h6>
            <ul
              className="ul-center"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px",
              }}
            >
              <Link
                style={{ ...ListStyle, fontSize: { xs: "14px", md: "17px" } }}
              >
                About
              </Link>
              <Link
                style={{ ...ListStyle, fontSize: { xs: "14px", md: "17px" } }}
              >
                Features
              </Link>
              <Link
                style={{ ...ListStyle, fontSize: { xs: "14px", md: "17px" } }}
              >
                Partners
              </Link>
              <Link
                style={{ ...ListStyle, fontSize: { xs: "14px", md: "17px" } }}
              >
                Blog
              </Link>
            </ul>
          </Grid>
          <Grid className="legal-order" item xs={12} sm={3} lg={3} md={2}>
            <h6 style={{ marginBottom: { xs: "15px", md: "10px" } }}>
              Legal Information
            </h6>
            <ul
              className="ul-center"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px",
              }}
            >
              <Link
                style={{ ...ListStyle, fontSize: { xs: "12px", md: "14px" } }}
              >
                Privacy Policy
              </Link>
              <Link
                style={{ ...ListStyle, fontSize: { xs: "12px", md: "14px" } }}
              >
                Terms of Service
              </Link>
              <Link
                style={{ ...ListStyle, fontSize: { xs: "12px", md: "14px" } }}
              >
                Privacy Shield
              </Link>
              <Link
                style={{ ...ListStyle, fontSize: { xs: "12px", md: "14px" } }}
              >
                Cookies Policy
              </Link>
            </ul>
          </Grid>
          <Grid className="contact-order" item xs={12} sm={6} md={6} lg={6}>
            <h3
              style={{
                color: "#fff",
                marginBottom: { xs: "20px", md: "10px" },
                marginTop: { xs: "25px", md: 0 },
              }}
            >
              Want to contact Us?
            </h3>
            <ul
              className="ul-center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "0px",
              }}
            >
              <Link
                style={{ ...ListStyle, fontSize: { xs: "14px", md: "17px" } }}
              >
                Contact Us: 0900-123456789
              </Link>
              <Link
                style={{ ...ListStyle, fontSize: { xs: "14px", md: "17px" } }}
              >
                Email Us: Contact@Aurbitrage
              </Link>
              <Button
                className="btn-center"
                style={{
                  ...BtnStyle,
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid #fff",
                  marginTop: "20px",
                }}
              >
                Contact Us
              </Button>
            </ul>
          </Grid>

          <Grid
            className="foot-logo-order"
            xs={12}
            sx={{ py: 2, borderBottom: "1px solid #fff" }}
          >
            <img
              src={MainLogo}
              alt="aurbitrage-logo"
              style={{ marginBottom: { xs: "20px", md: 0 }, width: "180px" }}
            />
          </Grid>

          <Grid className="bottom-menu-order" xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <ul style={{ display: "flex", flexWrap: "wrap", padding: "0px" }}>
                <Link
                  style={{
                    ...ListStyle,
                    marginRight: "20px",
                    fontWeight: "600",
                    fontSize: { xs: "14px", md: "17px" },
                  }}
                >
                  Twitter
                </Link>
                <Link
                  style={{
                    ...ListStyle,
                    marginRight: "20px",
                    fontWeight: "600",
                    fontSize: { xs: "14px", md: "17px" },
                  }}
                >
                  LinkedIn
                </Link>
                <Link
                  style={{
                    ...ListStyle,
                    marginRight: "20px",
                    fontWeight: "600",
                    fontSize: { xs: "14px", md: "17px" },
                  }}
                >
                  Instagram
                </Link>
                <Link
                  style={{
                    ...ListStyle,
                    marginRight: "20px",
                    fontWeight: "600",
                    fontSize: { xs: "14px", md: "17px" },
                  }}
                >
                  Facebook
                </Link>
                <Link
                  style={{
                    ...ListStyle,
                    marginRight: "20px",
                    fontWeight: "600",
                    fontSize: { xs: "14px", md: "17px" },
                  }}
                >
                  Github
                </Link>
              </ul>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: { xs: "12px", md: "14px" },
                }}
              >
                2023
                <CopyrightOutlinedIcon sx={{ mx: 1 }} />
                Aurbitrage Copyrights
              </p>
            </Box>
          </Grid>
        </Grid>
        {/* footer ends */}
      </Box>
    </>
  );
};

export default ErrorPage;
