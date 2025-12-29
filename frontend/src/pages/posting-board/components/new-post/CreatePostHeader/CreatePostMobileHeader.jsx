import { BackBtn, StyledBox, Title } from "./style";
const CreatePostMobileHeader = ({ handleBack }) => {
  return (
    <StyledBox>
      <BackBtn onClick={handleBack} />
      <Title variant="h2">Create Post</Title>
    </StyledBox>
  );
};

export default CreatePostMobileHeader;
