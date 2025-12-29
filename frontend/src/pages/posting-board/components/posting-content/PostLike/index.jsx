import { useEffect, memo, useState } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Tooltip } from "@mui/material";
import { StyledButton } from "./style";
import useAddRemoveLike from "@/pages/posting-board/Hooks/useAddRemoveLike";
import useGetPostLikes from "@/pages/posting-board/Hooks/useGetPostLike";
import { useAuth } from "@/Context/AuthContext";
import LikeIcon from "@/components/Icons/LikeIcon";

const PostLike = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const { togglePostLike } = useAddRemoveLike();
  const { isLoading, likedUsers, getPostLikes } = useGetPostLikes();
  const { userId } = useAuth();
  const validLikedUsers = Array.isArray(likedUsers) ? likedUsers : [];

  const handleLike = async () => {
    const newLikeStatus = !isLike;
    setIsLike(newLikeStatus);

    try {
      await togglePostLike(post.id);
      getPostLikes(post.id);
    } catch (error) {
      setIsLike((prevLike) => !prevLike);
    }
  };

  useEffect(() => {
    setIsLike(post?.likedPost);
    getPostLikes(post.id);
  }, [post]);

  const likeC = validLikedUsers.length || "";
  const liked = validLikedUsers.some(
    (user) => user.id === parseInt(userId, 10),
  );

  return (
    <Tooltip
      title={
        isLoading ? (
          <CircularProgress size={16} />
        ) : validLikedUsers.length > 0 ? (
          validLikedUsers.map((user, index) => (
            <div key={index}>{user.id === userId ? "You" : user.name}</div>
          ))
        ) : (
          <div>No likes yet</div>
        )
      }
      placement="top"
    >
      <StyledButton
        onClick={handleLike}
        disabled={isLoading}
        isLike={liked}
        aria-label={`Like post (${likeC} likes)`}
      >
        <LikeIcon className={`like-icon ${liked ? "liked" : ""}`} />
        {isLoading ? <CircularProgress size={16} /> : likeC}
        {validLikedUsers.length > 1 ? " Likes" : " Like"}
      </StyledButton>
    </Tooltip>
  );
};

PostLike.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default memo(PostLike);
