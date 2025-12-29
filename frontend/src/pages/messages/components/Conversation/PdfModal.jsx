import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Typography, IconButton } from "@mui/material";
import { ZoomIn, ZoomOut } from "@mui/icons-material";
import {
  StyledModal,
  StyledPdfBox,
  PdfRowElements,
  PdfModalButton,
} from "./styles";

const PdfModal = ({
  openPdfModal,
  handleClosePdfModal,
  handlePrevPage,
  handleNextPage,
  currentPage,
  numPages,
  setNumPages,
  file,
}) => {
  const [scale, setScale] = useState(1.2);
  const handleDownload = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  return (
    <StyledModal open={openPdfModal} onClose={handleClosePdfModal}>
      <StyledPdfBox>
        <PdfRowElements gap={2}>
          <PdfModalButton
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            variant="contained"
          >
            Prev
          </PdfModalButton>
          <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>
            Page {currentPage} of {numPages}
          </Typography>
          <PdfModalButton
            onClick={handleNextPage}
            disabled={currentPage === numPages}
            variant="contained"
          >
            Next
          </PdfModalButton>
        </PdfRowElements>

        <PdfRowElements>
          <PdfModalButton
            onClick={handleDownload}
            variant="contained"
            className="download"
          >
            Download PDF
          </PdfModalButton>
        </PdfRowElements>

        <PdfRowElements gap={1}>
          <IconButton
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            sx={{ color: "white" }}
          >
            <ZoomOut />
          </IconButton>
          <Typography variant="body1" sx={{ color: "white" }}>
            Zoom: {Math.round(scale * 100 - 20)}%
          </Typography>
          <IconButton
            onClick={handleZoomIn}
            disabled={scale >= 3}
            sx={{ color: "white" }}
          >
            <ZoomIn />
          </IconButton>
        </PdfRowElements>

        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
        >
          <Page
            key={`page_${currentPage}`}
            pageNumber={currentPage}
            width={830}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </StyledPdfBox>
    </StyledModal>
  );
};

export default PdfModal;
