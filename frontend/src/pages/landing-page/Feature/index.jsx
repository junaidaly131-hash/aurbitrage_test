import { Box, Button, Grid } from "@mui/material";
import {
  ContentWrapper,
  Description,
  Header,
  Media,
  StyledButton,
  Title,
  FeatureWrapper,
} from "./styles";
import Heading from "../Heading";
import { useNavigate } from "react-router-dom";
import feat1 from "@/assets/images/features/0.png";
import ImageBox from "../ImageBox";
import { Wrapper } from "../styles";

const Feature = ({
  url = "",
  buttonLabel = "Check Prices",
  title = "",
  description = "",
  heading = "",
  info = "",
}) => {
  return (
    <FeatureWrapper id="Features">
      <Wrapper>
        <Heading>Features</Heading>
        <Header>
          <Title>A platform that works for you</Title>
          <Description>
            Now you can focus on growing your business and relationships while{" "}
            <br /> letting Aurbitrage handle the price discovery.
          </Description>
        </Header>
        <ImageBox
          img={feat1}
          title="Real-time product Dashboard"
          description=" View pricing for each product, automatically updated from market 
              makers."
          buttonLabel="Check Prices"
          url="/login"
        />
      </Wrapper>
    </FeatureWrapper>
  );
};

export default Feature;
