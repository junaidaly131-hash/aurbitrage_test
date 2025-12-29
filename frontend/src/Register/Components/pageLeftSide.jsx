import React, { useState } from "react";
import { Button, Card, Grid, Box, CircularProgress } from "@mui/material";
import HeroImage from "../../assets/images/hero-img.svg";

const LeftSide = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  return (
    <>
      {screenWidth >= 900 && (
        <Grid
          sx={{ background: "#DBA42D", px: 10, height: "100vh", py: 8 }}
          item
          md={6}
          xs={12}
        >
          <Box>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                loading="lazy"
                src={HeroImage}
                className="login-image"
                alt="login-image"
              />
              <h4
                style={{
                  color: "#fff",
                  textAlign: "center",
                  margin: "0px",
                  fontWeight: "700",
                }}
              >
                Making precious metals trading better than ever before.
              </h4>
              <p style={{ textAlign: "center" }}>
                We’re committed to supporting the precious metals community by
                creating an intuitive platform and powerful network to help you
                trade and understand the marketplace.
              </p>
            </div>
          </Box>
        </Grid>
      )}
    </>
  );
};
export default LeftSide;
