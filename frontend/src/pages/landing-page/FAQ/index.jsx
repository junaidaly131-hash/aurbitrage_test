import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqsData = [
  {
    question: "Can you execute trades on the Pricing Dashboard?",
    answer: "No, it is currently for indication only.",
  },
  {
    question: "Why is this platform free and is there a plan to monetize it?",
    answer:
      "We decided to launch Aurbitrage for free initially to allow as many potential users as possible to experience its benefits firsthand and provide valuable feedback.\n\nBy offering a free trial, we aim to build a strong user base and create network effects quickly.\n\nWe will introduce a paywall in the form of a monthly subscription plan in the months following the launch. We have not created the cost structure yet, but will relay that information when available. There are several more features we would like to add before introducing the paywall, and we can’t wait to share them with you.",
  },
  {
    question: "Who is eligible to become a member of Aurbitrage?",
    answer:
      "Aurbitrage membership is open to all qualified businesses engaged in wholesale precious metals trading. In order to apply, we require three business references who can verify your business is in good standing.",
  },
];

const FAQs = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ marginTop: "40px" }}>
      {faqsData.map((faq, index) => (
        <Accordion key={index} sx={{ background: theme.palette.primary.light }}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: theme.palette.secondary.main }} />
            }
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography sx={{ color: theme.palette.secondary.main }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: "white", whiteSpace: "pre-line" }}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQs;
