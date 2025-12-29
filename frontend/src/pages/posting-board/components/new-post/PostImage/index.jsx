import { useRef, useState } from "react";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import {
  IconBox,
  IconBtn,
  Label,
  Media,
  Navigations,
  NavLeft,
  NavRight,
  ActiveIndex,
  ImageUploadWrapper,
  Thumbnail,
  DocContainer,
  Loader,
  ContentWrapper,
  FileName,
  FileDetails,
} from "./styles";
import { VideoContent } from "@/pages/posting-board/styles";
import { Document, Page } from "react-pdf";
import PdfIcon from "@/components/Icons/PdfIcon";
import { PDFWrapper } from "@/pages/messages/components/Conversation/styles";
import { DriveFolderUpload } from "@mui/icons-material";

const isVideo = (url) => {
  const videoExtensions = [
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".wmv",
    ".m4v",
    ".3gp",
  ];
  return videoExtensions.some((ext) => url?.toLowerCase().endsWith(ext));
};

const isPDF = (url) =>
  typeof url === "string" && url.toLowerCase().endsWith(".pdf");

const PostImages = ({
  postImages,
  imagePreviews,
  handleFileChange,
  setImagePreviews,
  setPostImages,
}) => {
  const ref = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 kB";
    const kb = bytes / 1024;
    return `${Math.round(kb)} kB`;
  };

  const getFileName = () => {
    if (postImages[currentIndex].name) return postImages[currentIndex].name;
    if (typeof file === "string") {
      return postImages[currentIndex].split("/").pop() || "Document.pdf";
    }
    return postImages[currentIndex]?.name || "Document.pdf";
  };

  const getFileSize = () => {
    if (postImages[currentIndex] instanceof File) {
      return formatFileSize(postImages[currentIndex].size);
    }
    return "-- kB";
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % postImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + postImages.length) % postImages.length,
    );
  };

  const onImagePreviewDelete = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setPostImages((prev) => prev.filter((_, i) => i !== index));
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleFileUpload = () => ref.current?.click();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const fakeEvent = { target: { files } };
      handleFileChange(fakeEvent);
    }
  };

  return (
    <ImageUploadWrapper>
      {postImages && postImages.length > 0 ? (
        <Box position="relative" style={{ width: "fit-content" }}>
          <ActiveIndex>{`${currentIndex + 1}/${postImages.length}`}</ActiveIndex>

          {isVideo(postImages[currentIndex]?.name) ? (
            <VideoContent controls>
              <source src={imagePreviews[currentIndex]} type="video/mp4" />
            </VideoContent>
          ) : isPDF(postImages[currentIndex]?.name) ? (
            <PDFWrapper>
              <Thumbnail>
                {loading ||
                  (error && (
                    <Loader>
                      <Typography variant="body2">
                        {loading ? "Loading PDF..." : error}
                      </Typography>
                    </Loader>
                  ))}
                <DocContainer>
                  <Document
                    file={postImages[currentIndex]}
                    onLoadSuccess={handleLoadSuccess}
                    onLoadError={(error) => {
                      console.error("Error loading PDF:", error);
                      setError(error);
                      setLoading(false);
                    }}
                  >
                    <Page
                      pageNumber={1}
                      width={300}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                </DocContainer>
              </Thumbnail>

              <ContentWrapper>
                <PdfIcon />
                <Stack>
                  <FileName variant="body2">{getFileName()}</FileName>
                  <FileDetails variant="caption">
                    {numPages
                      ? `${numPages} page${numPages > 1 ? "s" : ""}`
                      : "Loading..."}{" "}
                    • PDF • {getFileSize()}
                  </FileDetails>
                </Stack>
              </ContentWrapper>
            </PDFWrapper>
          ) : (
            <Media component="img" image={imagePreviews[currentIndex]} />
          )}

          <IconBox>
            <Tooltip title="Remove this file">
              <IconBtn
                onClick={() => onImagePreviewDelete(currentIndex)}
                aria-label="Delete file"
              >
                <DeleteIcon />
              </IconBtn>
            </Tooltip>
            <Tooltip title="Upload more files">
              <label htmlFor="file-upload">
                <DriveFolderUpload />
                <input
                  ref={ref}
                  accept="image/*,video/*,application/pdf"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  multiple
                  type="file"
                  id="file-upload"
                />
              </label>
            </Tooltip>
          </IconBox>

          {postImages.length > 1 && (
            <Navigations>
              <NavLeft onClick={handlePrev}>
                <ChevronLeft />
              </NavLeft>
              <NavRight onClick={handleNext}>
                <ChevronRight />
              </NavRight>
            </Navigations>
          )}
        </Box>
      ) : (
        <Label
          onClick={handleFileUpload}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={ref}
            accept="image/*,video/*,application/pdf"
            hidden
            onChange={handleFileChange}
            multiple
            type="file"
            id="file-upload"
          />
        </Label>
      )}
    </ImageUploadWrapper>
  );
};

export default PostImages;
