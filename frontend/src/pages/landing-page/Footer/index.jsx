import React from "react";
import { Grid, Box, Link } from "@mui/material";
import MainLogo from "@/assets/images/logo.svg";

import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";

const ListStyle = {
  margin: "7px 0",
  textDecoration: "none",
  color: "#fff",
  fontSize: "17px",
};

const Footer = () => {
  return (
    <Grid
      className="footer"
      container
      sx={{
        color: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Grid className="aurbitrage-order" item xs={12} sm={3} md={1} lg={3}>
        <img
          src={MainLogo}
          alt="aurbitrage-logo"
          style={{ marginBottom: { xs: "20px", md: 0 }, width: "180px" }}
        />
        <ul
          className="ul-center"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0px",
          }}
        >
          <Link style={{ ...ListStyle, fontSize: { xs: "14px", md: "17px" } }}>
            About
          </Link>
          <Link style={{ ...ListStyle, fontSize: { xs: "14px", md: "17px" } }}>
            Features
          </Link>
          <Link style={{ ...ListStyle, fontSize: { xs: "14px", md: "17px" } }}>
            Contributors
          </Link>
        </ul>
      </Grid>

      <Grid
        className="contact-order"
        item
        xs={12}
        sm={6}
        md={6}
        lg={8}
        sx={{
          marginBottom: "50px",
        }}
      >
        <h3
          style={{
            color: "#fff",
          }}
        >
          Contact Us
        </h3>

        <p
          style={{
            color: "#fff",
            textAlign: "start",
            ...ListStyle,
            fontSize: { xs: "8px", md: "12px" },
          }}
        >
          Have questions or need assistance? Reach out to us at <br />
          support@aurbitrage.com
        </p>
      </Grid>

      <Grid
        className="foot-logo-order"
        item
        xs={12}
        sx={{ py: 2, borderBottom: "1px solid #fff" }}
      ></Grid>

      <Grid className="bottom-menu-order" item xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "12px", md: "14px" },
            }}
          >
            2024
            <CopyrightOutlinedIcon sx={{ mx: 1 }} />
            Aurbitrage Copyrights
          </p>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
