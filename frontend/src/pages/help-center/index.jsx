import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  useTheme,
  Grid,
} from "@mui/material";
import { useAuth } from "@/Context/AuthContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import HelpQuestions from "./HelpQuestions";
import HelpContributors from "./HelpContributors";

const renderAnswer = (answer) => {
  if (typeof answer === "string") {
    return (
      <Typography sx={{ color: "white", whiteSpace: "pre-line" }}>
        {answer}
      </Typography>
    );
  }

  return (
    <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
      {answer.map((item, index) => (
        <li key={index} style={{ listStyle: "decimal", color: "white" }}>
          <Typography sx={{ color: "white", whiteSpace: "pre-line" }}>
            {item.text}
          </Typography>
          {item.image &&
            (Array.isArray(item.image) ? (
              item.image.map((image, index) => (
                <img
                  src={image}
                  key={index}
                  style={{
                    maxWidth: "600px",
                    maxHeight: "300px",
                    margin: "5px",
                  }}
                  alt="Profile Dropdown"
                />
              ))
            ) : (
              <img
                src={item.image}
                style={{
                  maxWidth: "600px",
                  maxHeight: "300px",
                  margin: "5px",
                }}
                alt="Profile Dropdown"
              />
            ))}
        </li>
      ))}
    </ol>
  );
};

const HelpCenter = () => {
  const theme = useTheme();
  const { userRole, contributor } = useAuth();
  return (
    <Grid
      container
      sx={{
        background: "#191919",
        borderRadius: "20px",
        padding: "20px",
        width: "100%",
        margin: "0px auto",
        height: "98%",
        overflowY: "auto",
        position: "relative",
        maxWidth: "lg",
      }}
    >
      <Grid item sx={{ justifyContent: "center" }}>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {"Help Center"}
        </Typography>
        <Container sx={{ marginTop: "40px" }}>
          {HelpQuestions.map((help, index) => (
            <Accordion
              key={index}
              sx={{
                background: theme.palette.primary.light,
                marginBottom: "2px",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ color: theme.palette.secondary.main }}
                  />
                }
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography sx={{ color: theme.palette.secondary.main }}>
                  {help.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>{renderAnswer(help.answer)}</AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Grid>
      {contributor && (
        <Grid item sx={{ justifyContent: "center" }}>
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {"Manage Contributions"}
          </Typography>
          <Container sx={{ marginTop: "40px" }}>
            {HelpContributors.map((help, index) => (
              <Accordion
                key={index}
                sx={{
                  background: theme.palette.primary.light,
                  marginBottom: "2px",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: theme.palette.secondary.main }}
                    />
                  }
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography sx={{ color: theme.palette.secondary.main }}>
                    {help.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>{renderAnswer(help.answer)}</AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </Grid>
      )}
    </Grid>
  );
};

export default HelpCenter;
