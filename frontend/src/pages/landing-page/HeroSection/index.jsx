import { Box, Button, Grid } from "@mui/material";
import advantage_img from "@/assets/images/landing-pages/advantage.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Content,
  ContentWrapper,
  Description,
  Media,
  MediaCard,
  StyledButton,
  StyledGrid,
  Title,
} from "./styles";
import { Wrapper } from "../styles";

const HeroSection = ({
  title = "Ready to experience the Aurbitrage advantage?",
  description = "The precious metals trading platform, powering real-time pricing.",
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ContentWrapper>
      <Wrapper>
        <StyledGrid container>
          <Grid item xs={12} md={6}>
            <Content>
              <Title>{title}</Title>
              <Description>{description}</Description>
              <StyledButton onClick={() => navigate("/register")}>
                Apply for Membership
              </StyledButton>
            </Content>
          </Grid>
          <Grid item xs={12} md={6}>
            <MediaCard>
              <Media src={advantage_img} alt="hero-img" />
            </MediaCard>
          </Grid>
        </StyledGrid>
      </Wrapper>
    </ContentWrapper>
  );
};

export default HeroSection;
