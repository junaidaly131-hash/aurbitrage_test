import { useState } from "react";
import {
  Content,
  Left,
  Right,
  SeeAll,
  StyledDialog,
  CoverImage,
} from "./styles";
import ArrowLeftTiltIcon from "@/components/Icons/ArrowLeftTiltIcon";
import { useMediaQuery } from "@mui/system";
import { useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export const ImagesPopper = ({ assets }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const toggleIndex = (value) => () => {
    if (value === "prev") {
      if (index > 0) {
        setIndex(index - 1);
      }
    } else {
      if (index < assets.length - 1) {
        setIndex(index + 1);
      }
    }
  };
  const img = assets && assets[index];
  return (
    <>
      <SeeAll onClick={handleClickOpen}>
        See All Pictures
        <ArrowLeftTiltIcon />
      </SeeAll>
      <StyledDialog open={open} onClose={handleClose} fullScreen={fullScreen}>
        <Content>
          {img && <CoverImage src={img} />}
          <Left onClick={toggleIndex("prev")}>
            <ChevronLeft />
          </Left>
          <Right onClick={toggleIndex("next")}>
            <ChevronRight />
          </Right>
        </Content>
      </StyledDialog>
    </>
  );
};
