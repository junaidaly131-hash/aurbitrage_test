import Heading from "../Heading";
import { Wrapper } from "../styles";
import {
  ActionButton,
  ContentWrapper,
  Description,
  Media,
  ContributorWrapper,
} from "./styles";
import { useNavigate } from "react-router-dom";

const Contributor = ({ description, logo, ...rest }) => {
  const navigate = useNavigate();
  return (
    <ContributorWrapper {...rest}>
      <Wrapper>
        <ContentWrapper>
          <Heading>Our Contributors</Heading>
          <Media src={logo} />
          <Description>{description}</Description>
          <ActionButton onClick={() => navigate("/login")}>
            Login to Dashboard
          </ActionButton>
        </ContentWrapper>
      </Wrapper>
    </ContributorWrapper>
  );
};

export default Contributor;
