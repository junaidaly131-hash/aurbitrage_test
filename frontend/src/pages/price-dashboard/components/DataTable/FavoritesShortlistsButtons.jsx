import { useState, useEffect } from "react";
import ShortlistOutline from "@/assets/images/shortlist-icon.svg";
import ShortlistFilled from "@/assets/images/shortlist-filled.svg";
import { StyledFavorites, FavIcon, FavOutlinedIcon } from "./styles";

const FavoritesShortlistsButtons = ({
  item = {},
  handleRowClick = () => {},
}) => {
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShortlistClick = () => {
    const newShortlistStatus = !isShortlisted;
    setIsShortlisted(newShortlistStatus);
    handleRowClick("shortlist", item.aurbitrageSkuId);
  };

  const handleFavoriteClick = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    handleRowClick("favorite", item.aurbitrageSkuId);
  };

  useEffect(() => {
    setIsShortlisted(item.isShortlisted);
    setIsFavorite(item.isFavorite);
  }, [item]);

  return (
    <StyledFavorites>
      {isShortlisted ? (
        <img
          onClick={handleShortlistClick}
          width={20}
          src={ShortlistFilled}
          alt="shortlist-icon"
        />
      ) : (
        <img
          onClick={handleShortlistClick}
          width={20}
          src={ShortlistOutline}
          alt="shortlist-icon"
        />
      )}
      {isFavorite ? (
        <FavIcon onClick={handleFavoriteClick} />
      ) : (
        <FavOutlinedIcon onClick={handleFavoriteClick} />
      )}
    </StyledFavorites>
  );
};

export default FavoritesShortlistsButtons;
