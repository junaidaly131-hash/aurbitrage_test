import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import React, { useState, useCallback, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Image,
  PaperPlane,
} from "phosphor-react";
import { resizeImage } from "@/lib";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useSendMessage from "../../../hooks/useSendMessage";
import { useSelector } from "react-redux";
import {
  setMessageType,
  setMessageId,
  setMessageText,
  setPayload,
} from "@/redux/slices/app";
import {
  FooterBox,
  StyledInput,
  PickerBox,
  Wrapper,
  AttachmentBtn,
  SendBtn,
} from "./style";
import { pdfjs } from "react-pdf";
import { Send } from "@mui/icons-material";
import AttachmentIcon from "@/components/Icons/AttachmentIcon";
import MoodIcon from "@/components/Icons/MoodIcon";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ChatInput = forwardRef(({ ...props }, ref) => {
  const {
    setOpenPicker,
    onMessage,
    triggerMessageSend,
    setTriggerMessageSend,
    setAsset,
    asset,
    setAssetPreview,
    assetPreview,
    message,
    setMessage,
    setType,
    setOnlyImage,
    isPDF,
    skuData,
    showSkuComponent,
    onSkuSent,
    updateChatOptimistically,
    onLoadingChange,
  } = props;
  const { loading, sendMessage } = useSendMessage();
  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );
  const dispatch = useDispatch();

  const dispatchMessage = useCallback(() => {
    let type = "msg";
    let replyId = 0;
    let payload = null;

    if (asset) {
      type = isPDF(asset) ? "pdf" : "img";
    }
    if (selectedConversation?.type == "replymsg") {
      type = "reply";
      replyId = selectedConversation?.msgId;
    }

    if (
      showSkuComponent &&
      skuData &&
      message.length > 0 &&
      selectedConversation?.type !== "replymsg"
    ) {
      type = "sku";
      payload = skuData;
    }

    if (message.length > 0 || asset) {
      if (updateChatOptimistically) {
        const messagePreview =
          message || (asset ? (isPDF(asset) ? "PDF Document" : "Image") : "");
        updateChatOptimistically(
          messagePreview,
          selectedConversation?.id,
          selectedConversation?.chatType,
          selectedConversation?.name,
          selectedConversation?.profileImage,
          type,
          skuData,
        );
      }

      setMessage("");
      setAsset(null);
      if (ref.current) {
        ref.current.value = null;
      }

      dispatch(setMessageType("msg"));
      dispatch(setMessageId(null));
      dispatch(setMessageText(""));
      dispatch(setPayload(null));

      sendMessage(
        selectedConversation?.id,
        selectedConversation?.chatType,
        message,
        asset,
        replyId,
        type,
        payload,
      );
      if (onMessage) {
        onMessage(message);
        setType(type);
        if (message == "") {
          setOnlyImage(true);
        } else {
          setOnlyImage(false);
        }
      }
      if (type == "reply") {
        dispatch(setMessageType("msg"));
      }

      if (type === "sku" && onSkuSent) {
        onSkuSent();
      }
    }
  }, [
    message,
    selectedConversation,
    sendMessage,
    onMessage,
    asset,
    showSkuComponent,
    skuData,
    onSkuSent,
    updateChatOptimistically,
    isPDF,
    dispatch,
    setMessage,
    setAsset,
    setType,
    setOnlyImage,
    ref,
  ]);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      if (message.length === 0 && !asset && showSkuComponent) {
        return;
      }
      dispatchMessage();
      e?.preventDefault();
    }
  };
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const resizedImage = await resizeImage(file, 1200, 1200);
        setAsset(resizedImage);
        setAssetPreview(URL.createObjectURL(resizedImage));
      } else if (file.type === "application/pdf") {
        setAsset(file);
        setAssetPreview(file); // Generate preview
      }
    }
  };

  const handleFabClick = (e) => {
    e.stopPropagation();
    console.log("handleFabClick", ref);
    // setOpenAction(false);
    if (ref.current) {
      ref.current.click();
    }
  };

  React.useEffect(() => {
    if (triggerMessageSend) {
      dispatchMessage();
      setTriggerMessageSend(false);
    }
  }, [setTriggerMessageSend, triggerMessageSend]);

  React.useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  return (
    <Wrapper>
      <AttachmentBtn onClick={handleFabClick}>
        <AttachmentIcon />
      </AttachmentBtn>
      <input
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        type="file"
        id="file-upload-link"
        hidden
        ref={ref}
      />
      <StyledInput
        fullWidth
        id="chat-input"
        key={"chat-input"}
        placeholder={
          showSkuComponent && message.length === 0
            ? "Type a message to send with SKU..."
            : "Type your message..."
        }
        variant="filled"
        multiline
        maxRows={3}
        value={message}
        onKeyDown={onKeyPress}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment>
              <IconButton
                onClick={() => {
                  setOpenPicker((prev) => !prev);
                }}
              >
                <MoodIcon color="white" />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            padding: "5px",
          },
        }}
      />
    </Wrapper>
  );
});
ChatInput.displayName = "ChatInput";

const Footer = forwardRef((props, ref) => {
  const {
    onMessage,
    cancelImageSelection,
    setAssetPreview,
    assetPreview,
    asset,
    setAsset,
    setType,
    setOnlyImage,
    isPDF,
    skuData,
    showSkuComponent,
    onSkuSent,
    updateChatOptimistically,
  } = props;
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);
  const [triggerMessageSend, setTriggerMessageSend] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  const handleLoadingChange = (loading) => {
    setIsSending(loading);
  };

  return (
    <FooterBox>
      <Stack direction="row" alignItems={"center"} spacing={1.5}>
        <Stack className="stack">
          <PickerBox openPicker={openPicker}>
            <Picker
              theme="dark"
              data={data}
              onEmojiSelect={handleEmojiSelect}
              onClickOutside={() => {
                if (openPicker) {
                  setOpenPicker(false);
                }
              }}
            />
          </PickerBox>
          <ChatInput
            ref={ref}
            setOpenPicker={setOpenPicker}
            onMessage={onMessage}
            triggerMessageSend={triggerMessageSend}
            setTriggerMessageSend={setTriggerMessageSend}
            setAsset={setAsset}
            asset={asset}
            setAssetPreview={setAssetPreview}
            assetPreview={assetPreview}
            message={message}
            setMessage={setMessage}
            setType={setType}
            setOnlyImage={setOnlyImage}
            isPDF={isPDF}
            skuData={skuData}
            showSkuComponent={showSkuComponent}
            onSkuSent={onSkuSent}
            updateChatOptimistically={updateChatOptimistically}
            onLoadingChange={handleLoadingChange}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack>
            <Tooltip
              title={
                message.length === 0 && !asset && showSkuComponent
                  ? "Please type a message to send with SKU"
                  : "Send message"
              }
              placement="top"
            >
              <span>
                <SendBtn
                  onClick={() => setTriggerMessageSend(true)}
                  disabled={message.length === 0 && !asset && showSkuComponent}
                  sx={{
                    opacity:
                      message.length === 0 && !asset && showSkuComponent
                        ? 0.5
                        : 1,
                    cursor:
                      message.length === 0 && !asset && showSkuComponent
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {isSending ? (
                    <CircularProgress
                      size={20}
                      sx={{
                        color: theme.palette.secondary.main,
                      }}
                    />
                  ) : (
                    <Send color="#fff" />
                  )}
                </SendBtn>
              </span>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </FooterBox>
  );
});
Footer.displayName = "Footer";

export default Footer;
