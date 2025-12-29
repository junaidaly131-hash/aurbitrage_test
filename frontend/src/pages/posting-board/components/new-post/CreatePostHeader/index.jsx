import { Box, Button, CircularProgress } from "@mui/material";
import { Actions, BackBtn, StyledBox, Title } from "./style";
const CreatePostHeader = ({
  handleClose,
  isLoading,
  updating,
  onAddPostClick,
  onPreviewPostClick,
}) => {
  return (
    <StyledBox>
      <Box>
        <BackBtn onClick={handleClose} />
      </Box>
      <Title variant="h2">Create Post</Title>
      <Actions>
        <Button variant="contained" onClick={onPreviewPostClick}>
          Preview
        </Button>
        <Button
          variant="contained"
          disabled={isLoading || updating}
          onClick={onAddPostClick}
        >
          {isLoading || updating ? <CircularProgress size={24} /> : "Share"}
        </Button>
      </Actions>
    </StyledBox>
  );
};

export default CreatePostHeader;
