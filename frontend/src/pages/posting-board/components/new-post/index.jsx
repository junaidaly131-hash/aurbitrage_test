import { useState } from "react";
import { Box, Tooltip, ButtonGroup, Button, Grid } from "@mui/material";
import useAddPost from "../../Hooks/useAddPost";
import useUpdatePost from "../../Hooks/useUpdatePost";
import { usePostingBoardContext } from "@/Context/PostingBoardContext";
import PreviewPost from "./PreviewPost";
import AddSquare from "@/assets/images/add-square.svg";
import Resizer from "react-image-file-resizer";
import CreatePostHeader from "./CreatePostHeader";
import PostImages from "./PostImage";
import PostSettings from "./post-settings";
import PostTextArea from "./PostTextArea";
import {
  CreatePostSettingsWrapper,
  NewPostWrapper,
  StyledModal,
} from "./style";
import Toast from "./Toast";
import {
  PostButton,
  PostIcon,
  ColorPickerContainer,
  ColorPickerBox,
  ColorPickerWrapper,
  ColorPickerPopOver,
  SelectBgColor,
  StyledChevronLeftIcon,
  Wrapper,
  StyledText,
} from "./styles";
import { HexColorPicker } from "react-colorful";
import { COLOR_NAMES } from "./constants";
import { Plus } from "phosphor-react";

const Add = ({ defaultOpen, defaultData, onClose, isUpdate, isDuplicate }) => {
  const {
    triggerPostFetch: refetchPosts,
    fetchMyPosts,
    fetchSavedPosts,
  } = usePostingBoardContext();
  const [open, setOpen] = useState(defaultOpen);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearAddPost();

    if (onClose) {
      onClose();
      clearAddPost();
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [customColorPicker, setCustomColorPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [allowComments, setAllowComments] = useState(
    defaultData?.PostSettings[0]?.allowComment ?? true,
  );

  const [allowMessages, setAllowMessages] = useState(
    defaultData?.PostSettings[0]?.allowMessage ?? true,
  );
  const [allowTextPost, setTextPost] = useState(
    defaultData?.textBackground ? true : false,
  );

  const [showEmail, setShowEmail] = useState(
    defaultData?.PostSettings[0]?.showEmail ?? true,
  );

  const [hideUsername, setHideUsername] = useState(
    defaultData?.PostSettings[0]?.hideUsername || false,
  );
  const handleSetPostTypeRev = (selectedOption) => {
    const mapping = {
      Buy: "Looking to Buy",
      Sell: "Looking to Sell",
      Bulletin: "General Bulletin",
      Question: "Ask a Question",
    };
    return mapping[selectedOption];
  };
  const [postType, setPostType] = useState(defaultData?.postType || "");
  const [viewPostType, setViewPostType] = useState(
    handleSetPostTypeRev(defaultData?.postType) || "",
  );

  const [postContent, setPostContent] = useState(
    defaultData?.postContent || "",
  );
  const [enableDeal, setEnableDeal] = useState(
    defaultData?.enableDeal || false,
  );
  const [spotType, setSpotType] = useState(
    defaultData?.PostDeals[0]?.spotType || "",
  );
  const [selectedMetals, setSelectedMetals] = useState(
    defaultData?.PostDeals[0]?.metal || [],
  );
  const [priceOption, setPriceOption] = useState(
    defaultData?.PostDeals[0]?.priceOption || "flat",
  );
  const [priceData, setPriceData] = useState(
    defaultData?.PostDeals[0]?.priceData || "",
  );
  const [priceType, setPriceType] = useState(
    defaultData?.PostDeals[0]?.priceType || "fixed",
  );
  const [contactBefore, setContactBefore] = useState(
    defaultData?.PostDeals[0]?.contactBefore ?? true,
  );
  const [startDate, setStartDate] = useState(
    defaultData?.PostDeals[0]?.startDate || "",
  );
  const [endDate, setEndDate] = useState(
    defaultData?.PostDeals[0]?.endDate || "",
  );
  const [startTime, setStartTime] = useState(
    defaultData?.PostDeals[0]?.startTime || "",
  );
  const [endTime, setEndTime] = useState(
    defaultData?.PostDeals[0]?.endTime || "",
  );
  const [postImages, setPostImages] = useState(
    defaultData?.PostAssets?.map((image) => image.imageUrl) || [],
  );
  const [imagePreviews, setImagePreviews] = useState(
    defaultData?.PostAssets?.map((image) => image.imageUrl) || [],
  );
  const [postHeader, setPostHeader] = useState(defaultData?.postHeader || "");
  const [bgColor, setBgColor] = useState(defaultData?.textBackground || "");
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200,
        1200,
        "JPEG",
        100,
        0,
        (uri) => {
          const byteString = atob(uri.split(",")[1]);
          const mimeString = uri.split(",")[0].split(":")[1].split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          resolve(blob);
        },
        "base64",
      );
    });

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + postImages.length > 5) {
      alert("Total files should be five or fewer.");
      return;
    }
    const resizedFiles = await Promise.all(
      files.map(async (file) => {
        if (file.type.startsWith("image/")) {
          const blob = await resizeFile(file);
          return new File([blob], file.name, { type: "image/jpeg" });
        }
        return file;
      }),
    );
    setPostImages((prev) => [...prev, ...resizedFiles]);
    setImagePreviews((prev) => [
      ...prev,
      ...resizedFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const clearAddPost = () => {
    setPostType("");
    setViewPostType("");
    setPostContent("");
    setPostHeader("");
    setPostImages([]);
    setImagePreviews([]);
    setEnableDeal(false);
    setPriceOption("flat");
    setSelectedMetals([]);
    setSpotType("");
    setPriceData("");
    setPriceType("fixed");
    setContactBefore(true);
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setAllowComments(true);
    setAllowMessages(true);
    setHideUsername(false);
    setShowEmail(true);
    setBgColor("");
  };
  const { isLoading, handlePost } = useAddPost(
    refetchPosts,
    fetchMyPosts,
    handleClose,
  );
  const { isLoading: updating, updatePost } = useUpdatePost(
    refetchPosts,
    fetchMyPosts,
    fetchSavedPosts,
    handleClose,
  );
  const [showAlert, setShowAlert] = useState({
    show: false,
    error: false,
    errorMessage: "",
  });

  const hideAlert = () => {
    setShowAlert((prev) => ({ ...prev, show: false }));
  };

  const showAlertMessage = (message) => {
    setShowAlert({
      show: true,
      error: true,
      errorMessage: message,
    });
  };

  const checkRequiredFields = () => {
    if (postType == "") {
      showAlertMessage("PostType is Required");
      return false;
    }

    if (postContent == "" && postHeader == "") {
      showAlertMessage("Either PostContent or PostHeader is required");
      return false;
    }
    if (startDate === "" && priceType === "spot" && enableDeal) {
      showAlertMessage("Start Date Required");
      return false;
    }
    if (endDate === "" && priceType === "spot" && enableDeal) {
      showAlertMessage("End Date Required");
      return false;
    }
    if (startTime == "" && priceType === "spot" && enableDeal) {
      showAlertMessage("Start Time Required");
      return false;
    }
    if (endTime == "" && priceType === "spot" && enableDeal) {
      showAlertMessage("End Time Required");
      return false;
    }
    if (selectedMetals.length == 0 && priceType === "spot" && enableDeal) {
      showAlertMessage("Please Select a Metal");
      return false;
    }
    if (spotType == "" && priceType === "spot" && enableDeal) {
      showAlertMessage("SpotType is Required");
      return false;
    }
    if (priceData == "" && priceType === "fixed" && enableDeal) {
      showAlertMessage("Please enter price details");
      return false;
    }
    return true;
  };

  const onAddPostClick = async () => {
    if (!checkRequiredFields()) {
      return;
    }
    if (isUpdate) {
      const updatedPost = {};
      if (postType !== defaultData.postType) {
        updatedPost["postType"] = postType;
      }
      if (postContent !== defaultData.postContent) {
        updatedPost["postContent"] = postContent;
      }
      if (postHeader !== defaultData.postHeader) {
        updatedPost["postHeader"] = postHeader;
      }
      if (enableDeal !== defaultData.enableDeal) {
        updatedPost["enableDeal"] = enableDeal;
      }
      if (allowComments !== defaultData.PostSettings[0]?.allowComment) {
        updatedPost["allowComment"] = allowComments;
      }
      if (allowMessages !== defaultData.PostSettings[0]?.allowMessage) {
        updatedPost["allowMessage"] = allowMessages;
      }
      if (showEmail !== defaultData.PostSettings[0]?.showEmail) {
        updatedPost["showEmail"] = showEmail;
      }
      if (hideUsername !== defaultData.PostSettings[0]?.hideUsername) {
        updatedPost["hideUsername"] = hideUsername;
      }
      if (bgColor !== defaultData.textBackground || !allowTextPost) {
        updatedPost["textBackground"] = allowTextPost ? bgColor : "";
        updatedPost["postHeader"] = !allowTextPost ? postHeader : "";
      }
      if (postType != "Bulletin") {
        if (contactBefore !== defaultData?.PostDeals[0]?.contactBefore) {
          updatedPost["contactBefore"] = contactBefore;
        }
        if (spotType !== defaultData?.PostDeals[0]?.spotType) {
          updatedPost["spotType"] = spotType;
        }
        if (priceOption !== defaultData?.PostDeals[0]?.priceOption) {
          updatedPost["priceOption"] = priceOption;
        }
        if (priceData !== defaultData?.PostDeals[0]?.priceData) {
          updatedPost["priceData"] = priceData;
        }
        if (endDate !== defaultData?.PostDeals[0]?.endDate) {
          updatedPost["endDate"] = endDate;
        }
        if (startDate !== defaultData?.PostDeals[0]?.startDate) {
          updatedPost["startDate"] = startDate;
        }
        if (startTime !== defaultData?.PostDeals[0]?.startTime) {
          updatedPost["startTime"] = startTime;
        }
        if (endTime !== defaultData?.PostDeals[0]?.endTime) {
          updatedPost["endTime"] = endTime;
        }
        if (selectedMetals !== defaultData?.PostDeals[0]?.metal) {
          updatedPost["metal"] = selectedMetals;
        }
      }

      if (imagePreviews.length <= 5) {
        updatePost(
          defaultData.id,
          updatedPost,
          postImages,
          priceType,
          clearAddPost,
        );
      } else {
        alert("Total images should be five or fewer.");
      }
    } else {
      const payload = {
        postType,
        postContent,
        postHeader,
        enableDeal,
        spotType,
        selectedMetals,
        priceOption,
        priceData,
        priceType,
        contactBefore,
        startDate,
        endDate,
        startTime,
        endTime,
        allowMessages,
        allowComments,
        hideUsername,
        showEmail,
        clearAddPost,
        textBackground: bgColor,
      };
      const order = [];
      postImages.forEach((img, index) => {
        order.push({ type: typeof img === "string" ? "url" : "file", index });
      });
      payload["postImages"] = postImages;
      payload["order"] = JSON.stringify(order);
      handlePost(payload);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  const handleMetalChange = (event) => {
    const value = event.target.value;
    setSelectedMetals(typeof value === "string" ? value.split(",") : value);
  };
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const onPreviewPostClick = () => {
    setModalOpen(true);
  };

  const handleSetPostType = (selectedOption) => {
    const mapping = {
      "Looking to Buy": "Buy",
      "Looking to Sell": "Sell",
      "General Bulletin": "Bulletin",
      "Ask a Question": "Question",
    };
    setPostType(mapping[selectedOption]);
    setViewPostType(selectedOption);
  };

  return (
    <>
      {!isDuplicate && (
        <Tooltip title={"Create a new post"}>
          <PostButton onClick={handleOpen} variant="contained">
            <Plus /> New Post
          </PostButton>
        </Tooltip>
      )}

      <StyledModal open={open} onClose={handleClose}>
        <NewPostWrapper
          style={{ backgroundColor: allowTextPost ? bgColor : "" }}
        >
          <CreatePostHeader
            isLoading={isLoading}
            updating={updating}
            onAddPostClick={onAddPostClick}
            handleClose={handleClose}
            onPreviewPostClick={onPreviewPostClick}
          />

          <CreatePostSettingsWrapper>
            {!allowTextPost ? (
              <PostImages
                postImages={postImages}
                imagePreviews={imagePreviews}
                handleFileChange={handleFileChange}
                setImagePreviews={setImagePreviews}
                setPostImages={setPostImages}
              />
            ) : (
              <ColorPickerContainer>
                <Wrapper>
                  <SelectBgColor
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    showColorPicker={showColorPicker}
                  >
                    {showColorPicker ? (
                      <StyledChevronLeftIcon />
                    ) : (
                      <StyledText>Aa</StyledText>
                    )}
                  </SelectBgColor>
                  {showColorPicker && (
                    <ColorPickerWrapper>
                      <Tooltip
                        id={`tooltip-color-picker`}
                        title={"Pick custom color"}
                        placement="top"
                        effect="solid"
                      >
                        <ColorPickerBox
                          onClick={(event) => {
                            setCustomColorPicker(true);
                            setAnchorEl(event.currentTarget);
                          }}
                          bgColor={bgColor}
                        />
                      </Tooltip>
                      {Object.entries(COLOR_NAMES).map(
                        ([colorCode, colorName]) => (
                          <Tooltip
                            key={colorCode}
                            id={`tooltip-${colorName}`}
                            title={colorName}
                            placement="top"
                            effect="solid"
                          >
                            <ColorPickerBox
                              onClick={() => {
                                setBgColor(colorCode);
                                setCustomColorPicker(false);
                              }}
                              color={colorCode}
                              bgColor={bgColor}
                              data-tooltip-id={`tooltip-${colorName}`}
                              data-tooltip-content={colorName}
                            />
                          </Tooltip>
                        ),
                      )}

                      <ColorPickerPopOver
                        open={customColorPicker}
                        anchorEl={anchorEl}
                        onClose={() => {
                          setCustomColorPicker(false);
                          setAnchorEl(null);
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                      >
                        <HexColorPicker
                          color={bgColor}
                          onChange={(color) => setBgColor(color)}
                        />
                      </ColorPickerPopOver>
                    </ColorPickerWrapper>
                  )}
                </Wrapper>
              </ColorPickerContainer>
            )}

            <PostSettings
              handleSetPostType={handleSetPostType}
              viewPostType={viewPostType}
              setDropdown={setDropdown}
              dropdown={dropdown}
              allowComments={allowComments}
              setAllowComments={setAllowComments}
              setTextPost={setTextPost}
              allowTextPost={allowTextPost}
              allowMessages={allowMessages}
              setAllowMessages={setAllowMessages}
              showEmail={showEmail}
              setShowEmail={setShowEmail}
              hideUsername={hideUsername}
              setHideUsername={setHideUsername}
              postType={postType}
              enableDeal={enableDeal}
              setEnableDeal={setEnableDeal}
              priceType={priceType}
              setPriceType={setPriceType}
              priceOption={priceOption}
              setPriceOption={setPriceOption}
              priceData={priceData}
              setPriceData={setPriceData}
              startDate={startDate}
              endDate={endDate}
              startTime={startTime}
              endTime={endTime}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
              handleStartTimeChange={handleStartTimeChange}
              handleEndTimeChange={handleEndTimeChange}
              selectedMetals={selectedMetals}
              handleMetalChange={handleMetalChange}
              spotType={spotType}
              setSpotType={setSpotType}
              setContactBefore={setContactBefore}
              setBgColor={setBgColor}
            />
          </CreatePostSettingsWrapper>
          <PostTextArea
            allowTextPost={allowTextPost}
            postHeader={postHeader}
            setPostHeader={setPostHeader}
            postContent={postContent}
            setPostContent={setPostContent}
            handleFileChange={handleFileChange}
          />

          <Box />
        </NewPostWrapper>
      </StyledModal>

      <Toast showAlert={showAlert} hideAlert={hideAlert} />

      <PreviewPost
        isOpen={modalOpen}
        handleClose={handleCloseModal}
        postType={postType}
        postContent={postContent}
        postHeader={postHeader}
        postImages={postImages}
        enableDeal={enableDeal}
        spotType={spotType}
        selectedMetals={selectedMetals}
        priceOption={priceOption}
        priceData={priceData}
        priceType={priceType}
        contactBefore={contactBefore}
        startDate={startDate}
        endDate={endDate}
        startTime={startTime}
        endTime={endTime}
        allowComments={allowComments}
        allowMessages={allowMessages}
        hideUsername={hideUsername}
        showEmail={showEmail}
        postUser={defaultData?.user}
        bgColor={bgColor}
      />
    </>
  );
};

export default Add;
