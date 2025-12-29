import { useState, useEffect, useRef } from "react";
import { Button, Avatar, Box } from "@mui/material";
import useUpdateComment from "../../Hooks/useUpdateComment";
import useDeleteComment from "../../Hooks/useDeleteComment";
import {
  EditBox,
  CommentCard,
  UserName,
  DealerName,
  Header,
  CommentText,
  CommentDate,
  CommentActions,
  IconBox,
  Content,
  Timeline,
  RepliesHeading,
  CommentUser,
  ProfileInfo,
  Profile,
  DealerInfo,
} from "./styles";
import dayjs from "dayjs";
import CommentIcon from "@/components/Icons/CommentIcon";
import CommentLike from "./CommentLike";
import { useAuth } from "@/Context/AuthContext";
import EditIcon from "@/components/Icons/EditIcon";
import { useSearchParams } from "react-router-dom";
import CommentDisplay from "./CommentDisplay";
import { Trash } from "phosphor-react";

const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject the CSS
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = spinnerStyle;
  document.head.appendChild(style);
}

export default function CommentItem({
  comment,
  removeComment,
  appendReply,
  post,
  handleCommentReply,
  scrollToView,
  setReplyTo,
  className = "",
  replyTo,
  hasTimeline,
  setEditComment,
  editComment,
}) {
  const ref = useRef();
  const { userId, userRole } = useAuth();
  const [edit, setEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const [commentview, setCommentView] = useState("");
  const { loading, updateComment } = useUpdateComment();
  const { isLoading: deleteLoading, deleteComment } = useDeleteComment();
  const [commentUser, setCommentUser] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  let [searchParams] = useSearchParams();
  const commentIdFromUrl = searchParams.get("comment_id");
  const isHighlighted = commentIdFromUrl === comment.id.toString();

  useEffect(() => {
    if (commentIdFromUrl === comment.id.toString() && ref?.current) {
      setTimeout(() => ref.current.scrollIntoView({ behavior: "smooth" }), 200);
    }
    if (
      !showReplies &&
      comment.children?.some((i) => i.id === parseInt(commentIdFromUrl)) &&
      ref?.current
    ) {
      setShowReplies(true);
      setTimeout(() => ref.current.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, [commentIdFromUrl, comment.id, ref, showReplies, comment?.children]);

  const formatCommentDate = (commentDate) => {
    const date = dayjs(commentDate);
    const diffInDays = dayjs().startOf("day").diff(date.startOf("day"), "day");
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInDays === 0) {
      return `Today at ${date.format("hh:mm A")}`;
    } else if (diffInDays === 1) {
      return `Yesterday at ${date.format("hh:mm A")}`;
    } else if (diffInWeeks < 1) {
      return `${diffInDays} days ago`;
    } else if (diffInWeeks === 1) {
      return "1 week ago";
    } else {
      return `${diffInWeeks} weeks ago`;
    }
  };

  useEffect(() => {
    setUpdatedComment(comment.body);
    setCommentUser(comment.user);
  }, [comment]);
  useEffect(() => {
    setCommentView(comment.body);
  }, [comment]);

  const handleUpdateComment = () => {
    if (updatedComment.trim()) {
      updateComment(comment.id, updatedComment.trim(), handleModifiedComment);
    }
  };
  const handleReply = () => {
    setReplyTo(comment);
  };
  const handleModifiedComment = () => {
    setCommentView(updatedComment.trim());
    setEdit(false);
  };

  const handleDeleteComment = async () => {
    const isOwnComment = loggedInUserComment;
    const confirmMessage = isOwnComment
      ? "Are you sure you want to delete your comment?"
      : "Are you sure you want to delete this comment as a super admin? This action cannot be undone.";

    if (window.confirm(confirmMessage)) {
      try {
        await deleteComment(comment.id);
        removeComment(comment.id);
        // Success feedback could be added here if needed
        console.log("Comment deleted successfully");
      } catch (error) {
        console.error("Delete comment error:", error);
        alert(`Failed to delete comment: ${error.message}`);
      }
    }
  };

  if (edit) {
    return (
      <EditBox>
        <input
          value={updatedComment}
          onChange={(e) => setUpdatedComment(e.target.value)}
          className="inputStyleEdit"
          type="text"
          placeholder="Edit your comment.."
        />
        <Button
          disabled={loading}
          onClick={handleUpdateComment}
          className="editButtonStyle"
        >
          Edit
        </Button>
      </EditBox>
    );
  }
  const commentReplies =
    (Array.isArray(comment.children) && comment.children.length) || 0;
  const children = commentReplies ? comment.children : [];

  const loggedInUserComment = parseInt(userId) === comment.userId;
  const isSuperAdmin = userRole === "superadmin";
  const canDeleteComment = loggedInUserComment || isSuperAdmin;

  return (
    <>
      <CommentCard
        className={className}
        key={`comment-${comment.id}`}
        ref={ref}
        style={
          isHighlighted
            ? {
                backgroundColor: "rgba(218, 164, 45, 0.1)",
                border: "2px solid rgba(218, 164, 45, 0.3)",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }
            : {}
        }
      >
        <Header>
          {(showReplies || hasTimeline) && <Timeline className={className} />}

          <Content className={className}>
            <ProfileInfo>
              <Profile
                src={commentUser?.profileImage || undefined}
                alt="Avatar"
              ></Profile>
              <DealerInfo>
                <UserName variant="caption">
                  {commentUser?.firstName} {commentUser?.lastName} |{" "}
                  <span>{commentUser?.dealer?.dealerName}</span>
                </UserName>
                <CommentDate>
                  {formatCommentDate(comment?.updatedAt || comment.createdAt)}{" "}
                  {replyTo?.id === comment.id ||
                    (editComment?.id === comment.id && (
                      <CommentDate component="span">
                        {editComment
                          ? "Editing comment"
                          : `Replying to ${commentUser?.firstName}`}
                      </CommentDate>
                    ))}
                </CommentDate>
              </DealerInfo>
            </ProfileInfo>
            <CommentText key={`comment-body-${comment.id}`}>
              <CommentDisplay commentBody={commentview} />
            </CommentText>

            <CommentActions>
              {loggedInUserComment && (
                <IconBox
                  onClick={() => {
                    setEditComment(comment);
                  }}
                >
                  {/* <EditIcon />  */}
                  Edit
                </IconBox>
              )}
              {canDeleteComment && (
                <IconBox
                  onClick={deleteLoading ? undefined : handleDeleteComment}
                  disabled={deleteLoading}
                  style={{
                    color:
                      isSuperAdmin && !loggedInUserComment
                        ? "#ff6b35"
                        : "#ff4444",
                    cursor: deleteLoading ? "not-allowed" : "pointer",
                  }}
                  title={
                    deleteLoading
                      ? "Deleting..."
                      : isSuperAdmin && !loggedInUserComment
                        ? "Super Admin Delete"
                        : "Delete Comment"
                  }
                >
                  {deleteLoading ? (
                    <>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          border: "2px solid #ccc",
                          borderTop: "2px solid #ff4444",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      {/* <Trash size={16} /> */}
                      {isSuperAdmin && !loggedInUserComment
                        ? "Admin Delete"
                        : "Delete"}
                    </>
                  )}
                </IconBox>
              )}
              <CommentLike comment={comment} />
              {handleCommentReply && (
                <IconBox onClick={handleReply}>
                  {/* <CommentIcon />  */}
                  Reply
                </IconBox>
              )}
            </CommentActions>
          </Content>
        </Header>
      </CommentCard>
      <Content className="childComment">
        {showReplies ? (
          <>
            {children.map((child, index) => (
              <CommentItem
                className="childComment"
                key={child.id}
                comment={child}
                removeComment={removeComment}
                appendReply={appendReply}
                post={post}
                setReplyTo={setReplyTo}
                scrollToView={scrollToView}
                replyTo={replyTo}
                hasTimeline={index < children.length - 1}
                editComment={editComment}
                setEditComment={setEditComment}
              />
            ))}
            <RepliesHeading onClick={() => setShowReplies(!showReplies)}>
              Hide
            </RepliesHeading>
          </>
        ) : commentReplies > 0 ? (
          <RepliesHeading onClick={() => setShowReplies(!showReplies)}>
            {commentReplies} {commentReplies > 1 ? "Replies" : "Reply"}{" "}
          </RepliesHeading>
        ) : (
          ""
        )}
      </Content>
    </>
  );
}
