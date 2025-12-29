import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import ReadTicks from "../ReadStatus/ReadTicks";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  DotsThreeVertical,
  DownloadSimple,
  Image,
  XCircle,
} from "phosphor-react";
import { useState, useTransition } from "react";
import { Message_options } from "../../data";
import { formatTime } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import useOptimisticDeleteMessage from "../../hooks/useOptimisticDeleteMessage";
import useAddReaction from "../../hooks/useAddReaction";
import { useAuth } from "@/Context/AuthContext";
import PdfModal from "./PdfModal";
import ReactionTooltip from "./MessageReaction";
import PdfPreview from "./PdfPreview";
import {
  setMessageId,
  setMessageImage,
  setMessageText,
  setMessageType,
  setRepliedMsgName,
  setPayload,
} from "@/redux/slices/app";
import { memo } from "react";
import ArbitrageSku from "./ArbitrageSku/ArbitrageSku";

import {
  PdfPreviewWrapper,
  SkuHeader,
  SkuLabel,
  MessageWrapper,
  SKUBox,
  Deletion,
  DeletionTitle,
  DeletionActions,
  DeleteButton,
  EmojiIcon,
  Options,
  TimeStamp,
  MediaBox,
} from "./styles";
import { highlightText } from "./utils/highlightText";

const emojis = [
  { icon: "❤️", label: "Heart" },
  { icon: "👍", label: "Like" },
  { icon: "👎", label: "Dislike" },
  { icon: "😂", label: "Laugh" },
  { icon: "‼️", label: "Emphasize" },
  { icon: "❓", label: "Question" },
];
const getEmojiIcon = (label) => {
  const emoji = emojis.find((emoji) => emoji.label === label);
  return emoji ? emoji.icon : null;
};
const GroupHeader = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      spacing={1}
      sx={{ marginBottom: "5px" }}
      alignContent={"center"}
    >
      <Avatar
        alt={el.name}
        sx={{ width: 35, height: 35 }}
        src={el?.userProfileImage || ""}
      />
      <Stack spacing={0.1}>
        <Typography variant="subtitle2" sx={{ color: "white" }}>
          {el.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.secondary.main, lineHeight: "0.5em" }}
        >
          {el.dealerName}
        </Typography>
      </Stack>
    </Stack>
  );
};

const DocMsg = ({ el, menu, onEdit }) => {
  const theme = useTheme();
  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );

  const renderGroupHeader = () =>
    el.incoming &&
    selectedConversation?.chatType === "group" && <GroupHeader el={el} />;

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box sx={{ maxWidth: "70%" }}>
        {renderGroupHeader()}
        <Box
          p={1.5}
          sx={{
            backgroundColor: el.incoming
              ? theme.palette.secondary.main
              : "#696969",
            borderRadius: 1.5,
            width: "max-content",
          }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              spacing={3}
              direction="row"
              alignItems="center"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                borderRadius: 1,
                boxShadow: theme.shadows[1],
              }}
            >
              <Image size={48} />
              <Typography variant="caption">Abstract.png</Typography>
              <IconButton>
                <DownloadSimple />
              </IconButton>
            </Stack>
            <Typography variant="body2" sx={{ color: "#fff" }}>
              {el.message}
            </Typography>
          </Stack>
        </Box>
        {el?.reaction?.length > 0 && (
          <ReactionTooltip
            el={el}
            getEmojiIcon={getEmojiIcon}
            chatType={selectedConversation?.chatType}
          />
        )}
      </Box>
      {menu && <MessageOptions message={el} onMessageUpdateStarted={onEdit} />}
    </Stack>
  );
};

const LinkMsg = ({ el, menu, onEdit }) => {
  const theme = useTheme();
  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );

  const renderGroupHeader = () =>
    el.incoming &&
    selectedConversation?.chatType === "group" && <GroupHeader el={el} />;

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box sx={{ maxWidth: "70%" }}>
        {renderGroupHeader()}
        <MediaBox incoming={el.incoming}>
          <Stack spacing={2}>
            <Stack
              p={2}
              spacing={3}
              alignItems="start"
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                borderRadius: 1,
                boxShadow: theme.shadows[1],
              }}
            >
              <img
                src={el.preview}
                alt={el.message}
                style={{
                  maxHeight: 210,
                  borderRadius: "4px",
                  objectFit: "contain",
                }}
              />
              <Stack spacing={2}>
                <Typography variant="subtitle2">Aurbitrage</Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.primary.main }}
                  component={Link}
                  to="//https://www.youtube.com"
                >
                  www.youtube.com
                </Typography>
              </Stack>
              <Typography variant="body2" color={"#fff"}>
                {el.message}
              </Typography>
            </Stack>
          </Stack>
        </MediaBox>
        {el?.reaction?.length > 0 && (
          <ReactionTooltip
            el={el}
            getEmojiIcon={getEmojiIcon}
            chatType={selectedConversation?.chatType}
          />
        )}
      </Box>
      {menu && <MessageOptions message={el} onMessageUpdateStarted={onEdit} />}
    </Stack>
  );
};
const ReplyMsg = ({ el, menu, onEdit, spotPrices }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [_, startTransition] = useTransition();
  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );
  const renderGroupHeader = () =>
    el.incoming &&
    selectedConversation?.chatType === "group" && <GroupHeader el={el} />;
  const skuPayload = el.repliedMessagePayload
    ? typeof el.repliedMessagePayload === "string"
      ? JSON.parse(el.repliedMessagePayload)
      : el.repliedMessagePayload
    : null;

  // if (!skuPayload) {
  //   return <TextMsg el={el} menu={menu} onEdit={onEdit} />;
  // }

  const handleSkuClick = () => {
    if (skuPayload.skuId) {
      const searchParams = new URLSearchParams({
        sku: skuPayload.skuName,
        skuDealerName: skuPayload.dealerName || "",
        trade: skuPayload.trade || "ask",
      });

      startTransition(() => {
        navigate(`/dashboard/pricing?${searchParams.toString()}`);
      });
    } else {
      console.warn(
        "SKU ID not found in payload, cannot navigate to pricing dashboard",
      );
    }
  };
  return (
    <Stack
      direction="row"
      justifyContent={el.incoming ? "start" : "end"}
      sx={{ marginBottom: 1.5 }}
    >
      {el.incoming && !el.isDeleted && menu && (
        <MessageOptions message={el} onMessageUpdateStarted={onEdit} />
      )}

      <Box sx={{ maxWidth: "70%", position: "relative" }}>
        {renderGroupHeader()}
        <MessageWrapper isOwnMessage={el.incoming}>
          <Stack spacing={1}>
            <Stack
              p={1}
              direction="column"
              spacing={1}
              sx={{
                backgroundColor: !el.incoming
                  ? theme.palette.background.dark
                  : theme.palette.primary.light,
                borderRadius: 1,
              }}
            >
              <Stack direction="column">
                <Typography
                  variant="caption"
                  color={"#fff"}
                  fontWeight={600}
                  component="div"
                >
                  {el.repliedMessageName ? el.repliedMessageName : el.name}
                  {skuPayload && (
                    <Tooltip
                      title="Click to view on pricing dashboard"
                      placement="top"
                    >
                      <Box my={1}>
                        <ArbitrageSku
                          direction="column"
                          sku={{
                            ...skuPayload,
                            metal: spotPrices.find(
                              (i) =>
                                i?.metals?.toLowerCase() ===
                                skuPayload?.data?.metal,
                            ),
                          }}
                          onClick={handleSkuClick}
                        />
                      </Box>
                    </Tooltip>
                  )}
                </Typography>
                {el.repliedMessageText && (
                  <Typography
                    color={"#fff"}
                    className="message"
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: el.repliedMessageText,
                    }}
                  />
                )}
              </Stack>

              {el.repliedMessageImage && (
                <Box
                  component="img"
                  src={el.repliedMessageImage}
                  alt="Replied message image"
                  sx={{
                    maxWidth: 120,
                    height: "auto",
                    borderRadius: 1,
                  }}
                />
              )}
            </Stack>
            <Box>
              <Typography variant="body2" color={"#fff"}>
                {el.message}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.5}
                sx={{ mt: 0.5 }}
              >
                {!el.incoming && (
                  <ReadTicks isRead={el.isRead} style={{ marginLeft: "2px" }} />
                )}
                <Typography variant="caption" color={"#fff"} fontSize={"0.5em"}>
                  {formatTime(el.time)}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </MessageWrapper>
        {el?.reaction?.length > 0 && (
          <ReactionTooltip
            el={el}
            getEmojiIcon={getEmojiIcon}
            chatType={selectedConversation?.chatType}
          />
        )}
      </Box>

      {!el.incoming && !el.isDeleted && menu && (
        <MessageOptions message={el} onMessageUpdateStarted={onEdit} />
      )}
    </Stack>
  );
};

const MediaMsg = ({ el, menu, isPdf, onEdit, setAssetLoaded }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );

  const renderGroupHeader = () =>
    el.incoming &&
    selectedConversation?.chatType === "group" && <GroupHeader el={el} />;

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };
  const isPDF = (url) =>
    typeof url === "string" && url.toLowerCase().endsWith(".pdf");
  const [openPdfModal, setOpenPdfModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < numPages ? prevPage + 1 : prevPage,
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleOpenPdfModal = () => setOpenPdfModal(true);
  const handleClosePdfModal = () => setOpenPdfModal(false);

  const handleAssetLoad = () => {
    setAssetLoaded(true);
  };

  return (
    <>
      <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
        {el.incoming && !el.isDeleted && menu && (
          <MessageOptions message={el} onMessageUpdateStarted={onEdit} />
        )}
        <Box sx={{ maxWidth: "70%", position: "relative" }}>
          {renderGroupHeader()}
          <MediaBox incoming={el.incoming}>
            {(el.repliedMessageText || el.repliedMessageImage) && (
              <PdfPreviewWrapper incoming={el.incoming}>
                {el.repliedMessageText && (
                  <Typography
                    variant="body2"
                    color={"#fff"}
                    sx={{ width: "100%" }}
                    dangerouslySetInnerHTML={{ __html: el.repliedMessageText }}
                  />
                )}
                {el.repliedMessageImage && (
                  <Box
                    component="img"
                    src={el.repliedMessageImage}
                    alt="Replied message image"
                    sx={{
                      width: "120px", // Changed from maxWidth to width for consistency
                      height: "auto",
                      borderRadius: "6px",
                      marginTop: 0.5, // Added spacing between text and image
                    }}
                  />
                )}
              </PdfPreviewWrapper>
            )}
            <Stack
              spacing={1}
              sx={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              {isPDF(el.asset?.name || el.asset || el.img) ? (
                <PdfPreview
                  file={el.asset || el.img}
                  fileName={el.asset?.name}
                  onLoadSuccess={({ numPages }) => {
                    setNumPages(numPages);
                    handleAssetLoad();
                  }}
                  onClick={handleOpenPdfModal}
                />
              ) : (
                <img
                  src={el.asset || el.img}
                  alt="Attachment"
                  onLoad={handleAssetLoad}
                  style={{
                    maxHeight: 400,
                    objectFit: "contain",
                    maxWidth: 400,
                    margin: "auto",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleImageClick(el.asset || el.img)}
                />
              )}
              <Typography
                variant="body2"
                component="div"
                color={"#fff"}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(el.message),
                }}
              />
            </Stack>
          </MediaBox>
          {el?.reaction?.length > 0 && (
            <ReactionTooltip
              el={el}
              getEmojiIcon={getEmojiIcon}
              chatType={selectedConversation?.chatType}
            />
          )}
        </Box>
        {!el.incoming && !el.isDeleted && menu && (
          <MessageOptions message={el} onMessageUpdateStarted={onEdit} />
        )}
      </Stack>

      <Dialog open={openModal} onClose={handleClose} maxWidth="lg">
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            position: "relative",
            width: "100%",
            height: "80vh",
            bgcolor: "background.paper",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <XCircle size={24} color="white" />
          </IconButton>
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              maxWidth: "92%",
              maxHeight: "80vh",
              borderRadius: "4px",
              width: "auto",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </DialogContent>
      </Dialog>
      <PdfModal
        openPdfModal={openPdfModal}
        handleClosePdfModal={handleClosePdfModal}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        numPages={numPages}
        setNumPages={setNumPages}
        file={el.asset || el.img}
      />
    </>
  );
};
const TimeLine = ({ el }) => {
  return <TimeStamp variant="h6">{el.text}</TimeStamp>;
};

const TextMsg = ({ el, menu, onEdit: onMessageEditStarted, searchTerm }) => {
  const theme = useTheme();
  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );

  const renderGroupHeader = () =>
    el.incoming &&
    selectedConversation?.chatType === "group" && <GroupHeader el={el} />;

  const handleUpdate = (updatedMessage) => {
    onMessageEditStarted(updatedMessage);
  };

  const isEdited = el.updatedAt && el.updatedAt !== el.createdAt;
  const formattedTime = formatTime(el.time);
  const displayTime = isEdited ? `Edited ${formattedTime}` : formattedTime;

  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      {el.incoming && !el.isDeleted && menu && (
        <MessageOptions message={el} onMessageUpdated={handleUpdate} />
      )}
      <Box sx={{ maxWidth: "70%", position: "relative" }}>
        {renderGroupHeader()}
        <MessageWrapper isOwnMessage={el.incoming}>
          <Typography
            variant="body2"
            color={"#fff"}
            sx={{
              wordWrap: "break-word",
              width: "100%", // Added to ensure text takes full width
            }}
          >
            {(el.repliedMessageText || el.repliedMessageImage) && (
              <Box
                sx={{
                  backgroundColor: el.incoming
                    ? theme.palette.primary.light
                    : theme.palette.background.dark,
                  borderRadius: 1,
                  padding: 1,
                  marginBottom: 1,
                  width: "100%", // Added to match parent width
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start", // Aligns content to the start
                }}
              >
                {el.repliedMessageText && (
                  <Typography
                    variant="caption"
                    color={"black"}
                    fontWeight={600}
                    sx={{ width: "100%" }} // Added to ensure text takes full width
                    dangerouslySetInnerHTML={{ __html: el.repliedMessageText }}
                  />
                )}
                {el.repliedMessageImage && (
                  <Box
                    component="img"
                    src={el.repliedMessageImage}
                    alt="Replied message image"
                    sx={{
                      width: "120px", // Changed from maxWidth to width for consistency
                      height: "auto",
                      borderRadius: "4px",
                      marginTop: 0.5, // Added spacing between text and image
                    }}
                  />
                )}
              </Box>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: highlightText(el.message, searchTerm),
              }}
            />
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={0.5}
            sx={{ mt: 0.5 }}
          >
            {!el.incoming && (
              <ReadTicks isRead={el.isRead} style={{ marginLeft: "4px" }} />
            )}
            <Typography variant="caption" color={"#fff"} fontSize={12}>
              {displayTime}
            </Typography>
          </Stack>
        </MessageWrapper>

        {el?.reaction?.length > 0 && (
          <ReactionTooltip
            el={el}
            getEmojiIcon={getEmojiIcon}
            chatType={selectedConversation?.chatType}
          />
        )}
      </Box>
      {!el.incoming && !el.isDeleted && menu && (
        <MessageOptions
          message={el}
          onMessageUpdateStarted={handleUpdate}
          msgType={"txt"}
        />
      )}
    </Stack>
  );
};

const MessageOptions = ({
  message,
  onMessageUpdateStarted,
  msgType = "not-txt",
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { userName } = useAuth();
  const { deleteMessage, loading, error, deletingMessageId, clearError } =
    useOptimisticDeleteMessage();
  const { addReaction } = useAddReaction();
  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );
  const chatType = selectedConversation?.chatType;
  const open = Boolean(anchorEl);
  const emojiOpen = Boolean(emojiAnchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmojiClick = (event) => {
    setEmojiAnchorEl(event.currentTarget);
  };

  const handleEmojiClose = () => {
    setEmojiAnchorEl(null);
  };

  const handleMessageAction = async (el, id, e) => {
    if (el.title === "Delete Message") {
      setDeleteDialogOpen(true);
      handleClose();
      return;
    }
    if (el.title === "Reply") {
      dispatch(setMessageType("replymsg"));
      dispatch(setMessageId(message.id));
      dispatch(setMessageText(message.message));
      dispatch(setMessageImage(message.asset));
      dispatch(setRepliedMsgName(message.name));
      dispatch(setPayload(message.payload));
    }
    if (el.title === "Edit Message") {
      if (!onMessageUpdateStarted) {
        return;
      }
      onMessageUpdateStarted(message.id);
    }
    if (el.title === "React to message") {
      handleEmojiClick(e);
    }
    handleClose();
  };

  const handleDeleteConfirm = async () => {
    const success = await deleteMessage(message.id);
    setDeleteDialogOpen(false);

    if (success) {
      setSnackbarOpen(true);
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    clearError();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    clearError();
  };

  const handleEmojiReaction = (messageId, emoji) => {
    addReaction(messageId, emoji.label, chatType);
    handleEmojiClose();
  };

  const isOwnMessage = userName === message.name;

  // Calculate message age
  const messageAgeInMinutes = (new Date() - new Date(message.time)) / 60000;
  const canEditMessage = messageAgeInMinutes <= 15 && msgType == "txt";

  const filteredOptions = Message_options.filter((option) => {
    if (
      (option.title === "Delete Message" || option.title === "Edit Message") &&
      !isOwnMessage
    ) {
      return false;
    }
    if (option.title === "Edit Message" && !canEditMessage) {
      return false;
    }
    return true;
  });

  const isDeleting = deletingMessageId === message.id;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={message.incoming && chatType === "group" ? 3.5 : 1.5}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {isDeleting ? (
          <CircularProgress size={20} color="primary" />
        ) : (
          <DotsThreeVertical
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            size={20}
            color={"#818284"}
          />
        )}
      </Stack>

      <Options
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {filteredOptions.map((el) => {
          const Icon = el.icon;
          return (
            <EmojiIcon
              key={`options-message-${el.title}`}
              onClick={(event) => handleMessageAction(el, message.id, event)}
            >
              <Icon color="white" size={14} height={14} width={14} />
            </EmojiIcon>
          );
        })}
      </Options>

      <Options
        direction="row"
        id="emoji-menu"
        anchorEl={emojiAnchorEl}
        open={emojiOpen}
        onClose={handleEmojiClose}
        sx={{
          top: -90,
          left: -50,
        }}
        MenuListProps={{
          "aria-labelledby": "emoji-button",
        }}
      >
        <Stack
          direction="row"
          sx={{
            background: "transparent",
            padding: "0px",
          }}
        >
          {emojis.map((emoji) => (
            <EmojiIcon
              key={emoji.label}
              onClick={() => handleEmojiReaction(message.id, emoji)}
              sx={{
                color: emoji.label === "Emphasize" ? "red" : "inherit",
                filter: "brightness(1)",
              }}
            >
              {emoji.icon}
            </EmojiIcon>
          ))}
        </Stack>
      </Options>

      {/* Delete Confirmation Dialog */}
      <Deletion
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DeletionTitle>Delete Message</DeletionTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this Message ?
          </Typography>
        </DialogContent>
        <DeletionActions>
          <DeleteButton
            onClick={handleDeleteCancel}
            disabled={loading}
            variant="contained"
          >
            No, Cancel
          </DeleteButton>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DeletionActions>
      </Deletion>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {error ? error : "Message deleted successfully"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const SkuMsg = memo(({ el, menu, onEdit, spotPrices }) => {
  const navigate = useNavigate();
  const [_, startTransition] = useTransition();
  const selectedConversation = useSelector(
    (state) => state.app.chat.selectedConversation,
  );
  if (!el) {
    return null;
  }

  const skuPayload = el.payload
    ? typeof el.payload === "string"
      ? JSON.parse(el.payload)
      : el.payload
    : null;

  if (!skuPayload) {
    return <TextMsg el={el} menu={menu} onEdit={onEdit} />;
  }

  const handleSkuClick = () => {
    if (skuPayload.skuId) {
      const searchParams = new URLSearchParams({
        sku: skuPayload.skuName,
        skuDealerName: skuPayload.dealerName || "",
        trade: skuPayload.trade || "ask",
      });

      startTransition(() => {
        navigate(`/dashboard/pricing?${searchParams.toString()}`);
      });
    } else {
      console.warn(
        "SKU ID not found in payload, cannot navigate to pricing dashboard",
      );
    }
  };
  const isEdited = el.updatedAt && el.updatedAt !== el.createdAt;
  const formattedTime = formatTime(el.time);
  const displayTime = isEdited ? `Edited ${formattedTime}` : formattedTime;
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      {el.incoming && !el.isDeleted && menu && (
        <MessageOptions message={el} onMessageUpdateStarted={onEdit} />
      )}
      <Stack>
        <SKUBox incoming={el.incoming}>
          <SkuHeader>
            <SkuLabel>
              {el.message && (
                <Typography
                  variant="h4"
                  color={"#fff"}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(el.message),
                  }}
                />
              )}
            </SkuLabel>
          </SkuHeader>

          <Stack spacing={0.75}>
            <Tooltip title="Click to view on pricing dashboard" placement="top">
              <ArbitrageSku
                direction="column"
                sku={{
                  ...skuPayload,
                  metal: spotPrices.find(
                    (i) => i?.metals?.toLowerCase() === skuPayload?.data?.metal,
                  ),
                }}
                onClick={handleSkuClick}
              />
            </Tooltip>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              spacing={0.5}
              sx={{ mt: 0.5 }}
            >
              {" "}
              {!el.incoming && (
                <ReadTicks isRead={el.isRead} style={{ marginLeft: "4px" }} />
              )}
              <Typography variant="caption" color={"#fff"} fontSize={12}>
                {displayTime}
              </Typography>
            </Stack>
          </Stack>
        </SKUBox>
        {el?.reaction?.length > 0 && (
          <ReactionTooltip
            el={el}
            getEmojiIcon={getEmojiIcon}
            chatType={selectedConversation?.chatType}
          />
        )}
      </Stack>
      {!el.incoming && !el.isDeleted && menu && (
        <MessageOptions message={el} onMessageUpdateStarted={onEdit} />
      )}
    </Stack>
  );
});

SkuMsg.displayName = "SkuMsg";

export default MessageOptions;
export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg, SkuMsg };
