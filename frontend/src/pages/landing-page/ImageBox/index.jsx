import { useNavigate } from "react-router-dom";
import {
  ContentWrapper,
  Description,
  Header,
  Media,
  StyledButton,
  Title,
} from "./styles";
import { Grid } from "@mui/material";
import Heading from "../Heading";

const ImageBox = ({
  img,
  buttonLabel,
  url,
  title,
  description,
  order = 0,
  tag = "",
  btnVariant = "",
  imgWidth = "550px",
  variant = "",
  spacing = 6,
}) => {
  const navigate = useNavigate();
  return (
    <ContentWrapper container media={order} spacing={spacing}>
      <Grid item md={6} xs={12}>
        <Media src={img} alt="feature-1" imgWidth={imgWidth} />
      </Grid>

      <Grid item md={6} xs={12}>
        <Header>
          {tag && <Heading variant={variant}>{tag}</Heading>}
          <Title variant={variant}>{title}</Title>
          <Description variant={variant}>{description}</Description>
          <StyledButton
            onClick={() => {
              if (url.startsWith("http")) {
                window.open(url, "_blank");
              } else {
                navigate(url);
              }
            }}
            className={btnVariant}
          >
            {buttonLabel}
          </StyledButton>
        </Header>
      </Grid>
    </ContentWrapper>
  );
};

export default ImageBox;
