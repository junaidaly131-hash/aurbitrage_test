import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import HeroImage from "../../assets/images/pricing-dashboard-screenshot.png";

import TrialImg from "@/assets/images/trail-img.svg";
import Footer from "./Footer";
import FAQs from "./FAQ";

const FAQsPage = () => {
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
            minHeight: "85vh",
          }}
        >
          <Grid item md={12} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { md: "center", xs: "center" },
              }}
            >
              <h5
                style={{
                  marginBottom: "10px",
                  color: "#fff",
                  fontSize: { xs: "18px", md: "22px" },
                  textAlign: "center",
                }}
              >
                Frequently Asked Questions
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
              <FAQs />
            </Box>
          </Grid>
        </Grid>
        {/* hero section ends */}

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
                loading="lazy"
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

export default FAQsPage;
