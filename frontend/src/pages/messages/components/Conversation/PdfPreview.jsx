import { Stack, Typography } from "@mui/material";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import {
  ContentWrapper,
  DocContainer,
  FileDetails,
  FileName,
  Loader,
  PDFWrapper,
  Thumbnail,
} from "./styles";
import PdfIcon from "@/components/Icons/PdfIcon";

const PdfPreview = ({ file, fileName, onLoadSuccess, onClick }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    if (onLoadSuccess) {
      onLoadSuccess({ numPages });
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 kB";
    const kb = bytes / 1024;
    return `${Math.round(kb)} kB`;
  };

  const getFileName = () => {
    if (fileName) return fileName;
    if (typeof file === "string") {
      return file.split("/").pop() || "Document.pdf";
    }
    return file?.name || "Document.pdf";
  };

  const getFileSize = () => {
    if (file instanceof File) {
      return formatFileSize(file.size);
    }
    return "-- kB";
  };

  return (
    <PDFWrapper onClick={onClick}>
      <Thumbnail>
        {loading && (
          <Loader>
            <Typography variant="body2">Loading PDF...</Typography>
          </Loader>
        )}
        <DocContainer>
          <Document
            file={file}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={(error) => {
              console.error("Error loading PDF:", error);
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
  );
};

export default PdfPreview;
