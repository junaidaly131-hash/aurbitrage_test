import { useState, useRef } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  styled,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Camera, PaperPlaneTilt, X } from "phosphor-react";
import useEditMessage from "@/pages/messages/hooks/useEditMessage";
import { useAuth } from "@/Context/AuthContext";
import { SendBtn } from "./Footer/style";
import { Send } from "@mui/icons-material";

const StyledFooter = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  boxShadow: "0px -1px 2px rgba(0, 0, 0, 0.05)",
  zIndex: 100,
  backgroundColor: theme.palette.background.dark4,
  padding: "24px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  [theme.breakpoints.down("md")]: {
    padding: "12px 18px",
  },
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.overlay,
    borderRadius: "50px",
    height: "36px",
    border: `1px solid ${theme.palette.background.grey}`,
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
}));

const MessageEditor = ({ message, onSave, onCancel }) => {
  const [newMessage, setNewMessage] = useState(message.message);
  const [newAsset, setNewAsset] = useState(null);
  const [imagePreview, setImagePreview] = useState(message.asset || null);
  const fileInputRef = useRef(null);
  const { editMessage, loading } = useEditMessage();
  const { userName } = useAuth();

  const theme = useTheme();

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("newMessage", newMessage);
    formData.append(
      "newType",
      newAsset ? "img" : message.type === "replymsg" ? "replymsg" : "msg",
    );

    if (newAsset) {
      formData.append("messageAsset", newAsset);
    } else if (!imagePreview) {
      formData.append("removeImg", "yes");
    }

    if (message.repliedMessageId) {
      formData.append("replyId", message.repliedMessageId);
      formData.append("repliedMessageText", message.repliedMessageText);
      formData.append("repliedMessageName", message.repliedMessageName);
      if (message.repliedMessageImage) {
        formData.append("repliedMessageImage", message.repliedMessageImage);
      }
    }

    try {
      const result = await editMessage(message.id, formData);
      if (result.success) {
        onSave(result.data);
      }
    } catch (err) {
      console.error(err);
      onCancel();
    }
  };

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setNewAsset(null);
    setImagePreview(null);
  };

  const isOwnMessage = message.repliedMessageName === userName;

  return (
    <StyledFooter>
      {imagePreview && (
        <Box
          sx={{
            mb: 2,
            width: "200px",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              },
            }}
          >
            <X />
          </IconButton>
        </Box>
      )}
      {(message.repliedMessageText || message.repliedMessageImage) && (
        <Box
          sx={{
            mb: 2,
            padding: 2,
            backgroundColor: isOwnMessage
              ? "#343434"
              : theme.palette.secondary.main,
            borderRadius: "8px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Typography
            variant="body2"
            color={isOwnMessage ? "#fff" : "#000"}
            sx={{ mb: 1, opacity: 0.8 }}
          >
            Replying to:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {message.repliedMessageText && (
              <Typography
                dangerouslySetInnerHTML={{
                  __html: message.repliedMessageText,
                }}
                variant="caption"
                color={isOwnMessage ? "#fff" : "#000"}
                sx={{
                  wordBreak: "break-word",
                  width: "100%",
                }}
              />
            )}
            {message.repliedMessageImage && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Box
                  component="img"
                  src={message.repliedMessageImage}
                  alt="Replied message image"
                  sx={{
                    width: "120px",
                    height: "auto",
                    borderRadius: 1,
                    display: "block",
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
      <Stack direction="row" spacing={2} alignItems="center">
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setNewAsset(file);
              setImagePreview(URL.createObjectURL(file));
            }
          }}
          accept="image/*"
        />
        <StyledInput
          fullWidth
          placeholder="Edit message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          multiline
          maxRows={4}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ color: "#fff" }}
                >
                  <Camera />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={1}>
          <SendBtn disabled={loading} onClick={handleSave}>
            <Send color="#fff" />
          </SendBtn>
          <IconButton
            onClick={onCancel}
            sx={{
              color: "error.main",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.04)",
              },
            }}
          >
            <X />
          </IconButton>
        </Stack>
      </Stack>
    </StyledFooter>
  );
};

export default MessageEditor;
