import React from "react";
import { Grid, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../assets/images/logo.svg";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Grid
      item
      sm={6}
      xs={12}
      sx={{
        px: 10,
        height: { xs: "70vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ height: { xs: "70vh", md: "100vh" }, margin: "auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "start",
            height: "100%",
            color: "#fff",
          }}
        >
          <img
            src={MainLogo}
            alt="Login"
            style={{ height: "50px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Box
              style={{
                color: "#fff",
                margin: "0px",
                fontWeight: "400",
                fontSize: "40px",
              }}
            >
              Welcome to <br /> Aurbitrage
            </Box>
            <p style={{ textAlign: "start" }}>
              The precious metals trading platform, <br />
              powering real-time pricing.
            </p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/GbDuDNsb0Fg?si=FOCH8UVyRx9uRbVF"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </Box>
          <Grid container>
            <Grid item md={10} sx={{ display: { xs: "none", md: "block" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {["Home", "About", "Contributors", "Features"].map((text) => (
                  <HashLink
                    key={text}
                    to={`/#${text}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    {text}
                  </HashLink>
                ))}
              </Box>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Grid>
  );
};

export default Header;
