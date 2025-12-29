import { useEffect, memo, useState } from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import useAddRemoveLike from "@/pages/posting-board/Hooks/useAddRemoveLike";
import useGetPostLikes from "@/pages/posting-board/Hooks/useGetPostLike";
import { useAuth } from "@/Context/AuthContext";
import LikeIcon from "@/components/Icons/LikeIcon";
import { IconBox } from "./styles";

const CommentLike = ({ comment }) => {
  const [isLike, setIsLike] = useState(false);
  const { togglePostLike } = useAddRemoveLike(true);
  const { isLoading, likedUsers, getPostLikes } = useGetPostLikes(true);
  const { userId } = useAuth();
  const validLikedUsers = Array.isArray(likedUsers) ? likedUsers : [];

  const handleLike = async () => {
    const newLikeStatus = !isLike;
    setIsLike(newLikeStatus);

    try {
      await togglePostLike(comment.id);
      getPostLikes(comment.id);
    } catch (error) {
      setIsLike((prevLike) => !prevLike);
    }
  };

  useEffect(() => {
    setIsLike(comment?.likedPost);
    getPostLikes(comment.id);
  }, [comment]);

  const likeC = validLikedUsers.length || "";
  const liked = validLikedUsers.some(
    (user) => user.id === parseInt(userId, 10),
  );

  return (
    <IconBox
      onClick={handleLike}
      aria-label={`Like comment (${likeC} likes)`}
      className={liked ? "active" : ""}
    >
      {/* <LikeIcon className={`like-icon ${liked ? "liked" : ""}`} />{" "} */}
      {isLoading ? (
        <CircularProgress size={14} color="secondary" />
      ) : (
        likeC
      )}{" "}
      {likeC > 1 ? " Likes" : " Like"}
    </IconBox>
  );
};

CommentLike.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default memo(CommentLike);
