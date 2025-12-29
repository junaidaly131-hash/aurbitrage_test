import { useEffect } from "react";
import { ContactForm, Description, Header, Title } from "./styles";
import { SectionWrapper, Wrapper } from "../styles";
import { Grid } from "@mui/material";

const JoinNetwork = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      window.hbspt.forms.create({
        portalId: import.meta.env.VITE_APP_HUBSPOT_PORTAL_ID,
        formId: import.meta.env.VITE_APP_HUBSPOT_FORM_ID,
        target: "#hubspotForm",
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <SectionWrapper className="colored round-top">
      <Wrapper>
        <Grid container alignItems="center">
          <Grid item md={6} xs={12}>
            <Header>
              <Title>Ready to experience the Aurbitrage advantage?</Title>
              <Description>
                Join the network transforming the industry for precious metals
                dealers.
              </Description>
            </Header>
          </Grid>

          <Grid item md={6} xs={12}>
            <ContactForm id="hubspotForm"></ContactForm>
          </Grid>
        </Grid>
      </Wrapper>
    </SectionWrapper>
  );
};

export default JoinNetwork;
