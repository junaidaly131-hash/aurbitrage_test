import CommentIcon from "@/components/Icons/CommentIcon";
import MessagesIcon from "@/components/Icons/MessagesIcon";
import HeartIcon from "@/components/Icons/HeartIcon";
import { Divider, IconBox, ReactionsBox, Sharing, Wrapper } from "./styles";
import { useDispatch } from "react-redux";
import {
  SetSelectedChatId,
  SetSelectedConversation,
  UpdateSidebarType,
} from "@/redux/slices/app";
import PostLike from "../PostLike";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import PostShare from "../PostShare";
import SaveIcon from "@/components/Icons/SaveIcon";
import SavedIcon from "@/components/Icons/SavedIcon";

const PostReactions = ({
  comments = 0,
  post,
  handleSavePost,
  handleUnSavePost,
  isLoading,
  parentRef,
  isLiked,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = location?.pathname;
  const { user } = post;

  const handleCommentReply = () => {
    dispatch(SetSelectedChatId(post?.userId));
    dispatch(
      SetSelectedConversation({
        id: post?.userId,
        name: `${user?.firstName} ${user?.lastName}`,
        dealer: user?.dealer.dealerName,
        chatType: "direct",
      }),
    );
    dispatch(UpdateSidebarType("CHAT"));

    navigate("/dashboard/messages");
  };

  const isFaved =
    currentRoute === "/dashboard/posting-board/saved-posts" || isLiked;

  return (
    <Wrapper>
      <ReactionsBox>
        <PostLike post={post} />
        <Divider />
        <IconBox>
          <CommentIcon className={`${comments > 1 ? "more-comments" : ""}`} />
          {comments > 0 ? comments : ""}
          {comments > 1 ? " Comments" : " Comment"}
        </IconBox>
        <Divider />
        <IconBox onClick={handleCommentReply}>
          <MessagesIcon /> Message
        </IconBox>
      </ReactionsBox>
      <Sharing>
        {post?.PostSettings[0]?.allowMessage && (
          <PostShare post={post} parentRef={parentRef} />
        )}
        <IconBox onClick={isFaved ? handleUnSavePost : handleSavePost}>
          <SavedIcon className={`${isFaved ? "faved" : ""}`} filled={isFaved} />
          {isLoading ? <CircularProgress size={16} /> : null}
        </IconBox>
      </Sharing>
    </Wrapper>
  );
};

export default PostReactions;
