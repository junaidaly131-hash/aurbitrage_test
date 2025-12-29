import CommentItem from "./CommentItem";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  SetSelectedChatId,
  SetSelectedConversation,
  UpdateSidebarType,
} from "@/redux/slices/app";
import { StyledCard } from "./styles";

export default function Comment({
  comment,
  removeComment,
  appendReply,
  post,
  scrollToView,
  setReplyTo,
  replyTo,
  setEditComment,
  editComment,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCommentReply = (user) => {
    dispatch(SetSelectedChatId(user.id));
    dispatch(
      SetSelectedConversation({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        dealer: user.dealer.dealerName,
        chatType: "direct",
      }),
    );
    dispatch(UpdateSidebarType("CHAT"));

    navigate("/dashboard/messages");
  };

  return (
    <StyledCard>
      <CommentItem
        comment={comment}
        removeComment={removeComment}
        appendReply={appendReply}
        setReplyTo={setReplyTo}
        post={post}
        handleCommentReply={handleCommentReply}
        scrollToView={scrollToView}
        replyTo={replyTo}
        setEditComment={setEditComment}
        editComment={editComment}
      />
    </StyledCard>
  );
}
