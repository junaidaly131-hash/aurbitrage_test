import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ArrowRightTiltIcon from "../Icons/ArrowRightTiltIcon";
import {
  ButtonContainer,
  CoverImage,
  DelButton,
  GalleryContainer,
  GoButton,
  GridImagesContainer,
  GridWrapper,
  Heading,
  ImageSlider,
  Left,
  NoButton,
  PopupContent,
  Right,
  StyledPopup,
  Wrapper,
  YesButton,
} from "./styles";
import { useEffect, useState } from "react";
import img3 from "../../assets/images/dealer-gallery/img3.png";
import img4 from "../../assets/images/dealer-gallery/img4.png";
import img5 from "../../assets/images/dealer-gallery/img5.png";
import { useNavigate, useParams } from "react-router-dom";
import GalleryDeleteIcon from "../Icons/GalleryDeleteIcon";
import useGetDealer from "@/pages/Dealer/Hooks/useGetDealer";
import CircleArrowLeftIcon from "../Icons/CircleArrowLeftIcon";
import CircleArrowRightIcon from "../Icons/CircleArrowRightIcon";

export const DealerGallery = () => {
  const { id } = useParams();
  const { data, loading, getUser, error } = useGetDealer();

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [getUser, id]);

  useEffect(() => {}, []);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(-1);
  };

  const images = data?.coverImages || [];

  const toggleIndex = (value) => () => {
    if (value === "next")
      setIndex(index === 0 ? images?.length - 1 : index - 1);
    else setIndex(index === images?.length - 1 ? 0 : index + 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <GalleryContainer>
      <Wrapper>
        <GoButton onClick={handleButtonClick}>
          <ArrowRightTiltIcon />
          Go Back
        </GoButton>
        <ImageSlider>
          <CoverImage src={images[index]} />
          <Left onClick={toggleIndex("prev")}>
            <CircleArrowLeftIcon />
          </Left>
          <Right onClick={toggleIndex("next")}>
            <CircleArrowRightIcon />
          </Right>
        </ImageSlider>
      </Wrapper>

      <GridWrapper>
        {images.map((img, idx) => (
          <GridImagesContainer
            key={idx}
            style={{ backgroundImage: `url(${img})` }}
            onClick={() => setIndex(idx)}
          >
            <StyledPopup open={open} onClose={handleClose}>
              <PopupContent>
                <Heading>Delete Image</Heading>
                Are you sure you want to delete this image ?
              </PopupContent>
              <ButtonContainer>
                <NoButton onClick={handleClose}>No, Cancel</NoButton>
                <YesButton>Yes, Delete</YesButton>
              </ButtonContainer>
            </StyledPopup>
          </GridImagesContainer>
        ))}
      </GridWrapper>
    </GalleryContainer>
  );
};
