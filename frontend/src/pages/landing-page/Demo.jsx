import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import HeroImage from "../../assets/images/pricing-dashboard-screenshot.png";
import Footer from "./Footer";

const DemoPage = () => {
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
          <Grid item xs={12} md={6}>
            <Box className="hero-box">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/1xZ9dk4ce9Y?si=NDlhFRCTFvZuZJYX"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
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
                Want to experience Aurbitrage?
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
                In this video, you’ll get an exclusive tour of Aurbitrage, the
                newest platform revolutionizing precious metals trading.
                Discover how our real-time pricing dashboard aggregates data
                from top bullion and pre-33 gold and silver market makers.
                You’ll also explore our dynamic posting board and experience the
                security of our end-to-end encrypted messaging service.
              </h6>
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

export default DemoPage;
