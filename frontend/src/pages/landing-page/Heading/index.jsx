import { Bar, ColoredBar, Container, Divider, Title, Wrapper } from "./styles";

const Heading = ({ children, variant, ...rest }) => {
  return (
    <Container>
      <Wrapper {...rest}>
        <Title variant={variant}>{children}</Title>
        <Divider>
          <ColoredBar variant={variant} />
          <Bar variant={variant} />
        </Divider>
      </Wrapper>
    </Container>
  );
};

export default Heading;
