import { Box, CircularProgress, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState, useEffect } from "react";
import {
  ImageWrapper,
  Media,
  ModalImage,
  NextButton,
  PrevButton,
  SliderNavigation,
  StyledBox,
  StyledImage,
  StyledModal,
  Thumbnail,
  ThumbnailImage,
  ThumbnailIndex,
  Thumbnails,
} from "./style";
import { VideoContent } from "../../styles";
import { PictureAsPdf } from "@mui/icons-material";
import { Document, Page, pdfjs } from "react-pdf";
import PdfModal from "@/pages/messages/components/Conversation/PdfModal";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MediaCard = ({ post = false }) => {
  const isVideo = (url) =>
    [".mp4", ".mov", ".avi", ".mkv", ".wmv", ".m4v", ".3gp"].some(
      (ext) => typeof url === "string" && url.toLowerCase().endsWith(ext),
    );

  const isPDF = (url) =>
    typeof url === "string" && url.toLowerCase().endsWith(".pdf");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openPdfModal, setOpenPdfModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalAssets = post?.PostAssets?.length;
  const displayIndex = totalAssets ? (currentIndex % totalAssets) + 1 : 1;

  const handleIndex = (i) => {
    if (i !== null || i !== "undefined") {
      setCurrentIndex(i);
    }
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.PostAssets.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + post.PostAssets.length) % post.PostAssets.length,
    );
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < numPages ? prevPage + 1 : prevPage,
    );
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrev();
    }
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const handleOpenModal = () => {
    setOpenModal(true);
    window.addEventListener("keydown", handleKeyDown);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    window.removeEventListener("keydown", handleKeyDown);
  };
  const handleOpenPdfModal = () => setOpenPdfModal(true);
  const handleClosePdfModal = () => setOpenPdfModal(false);

  useEffect(() => {
    if (!post?.PostAssets?.length) return;

    setLoading(true);
    const currentAsset = post.PostAssets[currentIndex];

    if (isVideo(currentAsset?.imageUrl) || isPDF(currentAsset?.imageUrl)) {
      setLoading(false);
      return;
    }

    const assetUrl = getAssetUrl(currentAsset);
    if (!assetUrl) {
      setLoading(false);
      return;
    }

    const img = new Image();
    img.src = assetUrl;

    const handleLoad = () => setLoading(false);
    const handleError = () => {
      setLoading(false);
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [currentIndex, post?.PostAssets]);

  if (!post?.PostAssets || post?.PostAssets?.length === 0) {
    return null;
  }
  const getAssetUrl = (asset) => {
    if (asset?.imageUrl) return asset.imageUrl;
    if (asset instanceof File) return URL.createObjectURL(asset);
    return asset;
  };

  const images = post.PostAssets.filter(
    (a) => !isVideo(a.imageUrl) && !isPDF(a.imageUrl),
  );
  const others = post.PostAssets.filter(
    (a) => isVideo(a.imageUrl) || isPDF(a.imageUrl),
  );

  const renderImageGrid = () => {
    const count = images.length;
    const displayed = images.slice(0, 4);
    const extraCount = count - 4;

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            count === 1 ? "1fr" : count === 2 ? "1fr 1fr" : "1fr 1fr",
          gridTemplateRows: count === 3 ? "repeat(2, 1fr)" : "auto",
          gap: "6px",
          height: "450px",
        }}
      >
        {displayed.map((asset, i) => {
          const url = getAssetUrl(asset);

          if (count === 3 && i === 0) {
            return (
              <Box
                key={i}
                sx={{
                  gridRow: "1 / span 2",
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => handleOpenModal(i)}
              >
                <StyledImage src={url} alt={`image-${i}`} />
              </Box>
            );
          }

          if (count > 4 && i === 3) {
            return (
              <Box
                key={i}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => handleOpenModal(i)}
              >
                <StyledImage src={url} alt={`image-${i}`} />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography color="#fff" variant="h4">
                    +{extraCount} more
                  </Typography>
                </Box>
              </Box>
            );
          }

          return (
            <Box
              key={i}
              sx={{
                position: "relative",
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => handleOpenModal(i)}
            >
              <StyledImage src={url} alt={`image-${i}`} />
            </Box>
          );
        })}
      </Box>
    );
  };

  const currentAsset = post?.PostAssets[currentIndex];

  return (
    <StyledBox>
      {loading ? (
        <Box className="circularBar">
          <CircularProgress />
        </Box>
      ) : isVideo(currentAsset?.imageUrl) ? (
        <VideoContent controls>
          <source src={currentAsset?.imageUrl} type="video/mp4" />
        </VideoContent>
      ) : isPDF(currentAsset?.imageUrl) ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            objectFit: "contain",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "600px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={handleOpenPdfModal}
          >
            <Document
              file={getAssetUrl(currentAsset)}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={(error) =>
                console.error("Error loading PDF:", error)
              }
            >
              <Page pageNumber={1} scale={0.4} />
            </Document>
          </Box>
        </Box>
      ) : (
        <>{renderImageGrid()}</>
      )}

      <StyledModal open={openModal} onClose={handleCloseModal}>
        <ImageWrapper>
          {totalAssets > 1 && (
            <PrevButton onClick={handlePrev}>
              <ChevronLeft />
            </PrevButton>
          )}

          <ModalImage
            src={getAssetUrl(currentAsset)}
            alt="popup image"
            tabIndex={-1}
          />

          {totalAssets > 1 && (
            <NextButton onClick={handleNext}>
              <ChevronRight />
            </NextButton>
          )}
        </ImageWrapper>
      </StyledModal>
      <PdfModal
        openPdfModal={openPdfModal}
        handleClosePdfModal={handleClosePdfModal}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        numPages={numPages}
        setNumPages={setNumPages}
        file={getAssetUrl(currentAsset)}
      />
    </StyledBox>
  );
};

export default MediaCard;
