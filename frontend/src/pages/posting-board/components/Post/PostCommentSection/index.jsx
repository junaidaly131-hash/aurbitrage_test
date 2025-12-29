import { useState, useEffect, useRef } from "react";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Fade,
} from "@mui/material";
import useAddPostComment from "../../../Hooks/useAddPostComment";
import useFetchComments from "../../../Hooks/useFetchComments";
import Comment from "../Comment";
import {
  ActionButtons,
  CommentBox,
  CommentInfo,
  CommentReply,
  ContentWrapper,
  EmojiPickerWrapper,
  Heading,
  InputBox,
  Loader,
  Progress,
  ReplyTo,
  SendButton,
  StyledCard,
  StyledInput,
  ViewMore,
} from "./styles";
import MessagesIcon from "@/components/Icons/MessagesIcon";
import Close from "@mui/icons-material/Close";
import useCommentEdit from "@/pages/posting-board/Hooks/useCommentEdit";
import Picker from "@emoji-mart/react";
import { Smiley } from "phosphor-react";
import { useSearchParams } from "react-router-dom";
import EnhancedTaggingInput from "../EnhancedTaggingInput";

const CommentsSection = ({ postId, post, previewAllowComments }) => {
  const {
    comments: fetchedComments,
    loading: loadingComments,
    fetchComments,
  } = useFetchComments();

  const commentParentRef = useRef();
  const inputRef = useRef();
  let [searchParams] = useSearchParams();
  const commentId = searchParams.get("comment_id");
  const id = searchParams.get("id");

  const { isLoading, addPostComment, success } = useAddPostComment();
  const { postUpdating, updateComment } = useCommentEdit();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [openPicker, setShowEmojiPicker] = useState(false);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [taggedDealers, setTaggedDealers] = useState([]);

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
  }, [postId, fetchComments]);

  useEffect(() => {
    setComments(fetchedComments);
  }, [fetchedComments]);

  const handleAddComment = () => {
    if (!commentsAllowed) {
      console.warn("Comments are disabled for this post");
      return;
    }

    if (newComment.trim()) {
      const params = {
        body: newComment,
        postId: postId,
        taggedUsers: taggedUsers,
        taggedDealers: taggedDealers,
      };
      if (replyTo?.id) {
        params.parentId = replyTo.id;
      }
      if (editComment?.id) {
        updateComment({ ...editComment, body: newComment }, setComments);
        setEditComment(null);
      } else {
        addPostComment(params, replyTo?.id ? appendReply : setComments);
      }
      setNewComment("");
      setTaggedUsers([]);
      setTaggedDealers([]);
    }
  };

  const removeComment = (id) => {
    setComments((p) => {
      return p.flatMap((c) => {
        if (c.id !== id) {
          const tempComment = { ...c };
          tempComment.children = tempComment.children.filter(
            (reply) => reply.id !== id,
          );
          return tempComment;
        }
        return [];
      });
    });
  };

  const appendReply = (reply) => {
    setComments((p) =>
      p.map((c) => {
        if (c.id === reply.parentId) {
          const tempComment = { ...c };
          if (!tempComment.children.some((child) => child.id === reply.id)) {
            tempComment.children.unshift(reply);
          }
          return tempComment;
        }
        return c;
      }),
    );
  };

  const onEmojiClick = (emoji) => {
    setNewComment((prevComment) => prevComment + emoji.native);
  };

  const handleReplyTo = (comment) => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
    setReplyTo(comment);
    setEditComment(null);
    setTaggedUsers([]);
    setTaggedDealers([]);
  };

  const handleCommentEdit = (comment) => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
    setEditComment(comment);
    setNewComment(comment?.body);
    setReplyTo(null);
    setTaggedUsers([]);
    setTaggedDealers([]);
  };

  useEffect(() => {
    if (commentId && id && parseInt(id) === postId) {
      setShowMore(true);
    }
  }, [commentId, id, loadingComments, postId, comments]);

  const scrollToView = (target) => {
    const { current } = commentParentRef;

    if (current && target) {
      const { offsetTop, offsetHeight } = target;
      const { top, bottom } = target.getBoundingClientRect();
      const parent = current.getBoundingClientRect();
      const isInView = top >= parent.top && bottom <= parent.bottom;

      if (!isInView) {
        current.scrollTo({
          top: offsetTop + offsetHeight - 240 - current.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  const closeEmojiPicker = () => {
    if (openPicker) {
      setShowEmojiPicker(false);
    }
  };
  const openEmojiPicker = () => {
    setShowEmojiPicker(true);
  };

  const determineCommentsAllowed = () => {
    if (previewAllowComments) return true;

    const rawValue = post?.PostSettings?.[0]?.allowComment;

    if (rawValue === undefined || rawValue === null) return false;

    if (typeof rawValue === "string") {
      return rawValue.toLowerCase() === "true" || rawValue === "1";
    }

    return Boolean(rawValue);
  };

  const commentsAllowed = determineCommentsAllowed();

  if (loadingComments) {
    return (
      <Loader>
        <Progress />
      </Loader>
    );
  }

  const viewMore = comments.length > 1 ? comments.length - 1 : false;
  return (
    <StyledCard>
      <ContentWrapper>
        {(() => {
          return commentsAllowed ? (
            <></>
          ) : (
            <Heading style={{ color: "#888", fontStyle: "italic" }}>
              Comments are disabled for this post
            </Heading>
          );
        })()}

        {Array.isArray(comments) && comments.length > 0 && (
          <CommentInfo ref={commentParentRef}>
            {comments
              .slice(0, showMore ? comments.length : 1)
              .map((comment) => (
                <Comment
                  key={`comment-${comment.id}`}
                  comment={comment}
                  removeComment={removeComment}
                  appendReply={appendReply}
                  post={post}
                  scrollToView={scrollToView}
                  setReplyTo={handleReplyTo}
                  setEditComment={handleCommentEdit}
                  editComment={editComment}
                  replyTo={replyTo}
                  loadingComments={loadingComments}
                />
              ))}
          </CommentInfo>
        )}
        {viewMore && (
          <ViewMore onClick={() => setShowMore(!showMore)}>
            <MessagesIcon /> View {showMore ? "Less" : `${viewMore} More`}{" "}
            Comments
          </ViewMore>
        )}
        {(() => {
          return commentsAllowed;
        })() && (
          <CommentReply>
            {replyTo?.id || editComment ? (
              <ReplyTo>
                {editComment
                  ? "Editing comment"
                  : `Reply to ${replyTo.user.firstName} `}
                <Close
                  onClick={() => {
                    setReplyTo(null);
                    setEditComment(null);
                    setTaggedUsers([]);
                    setTaggedDealers([]);
                  }}
                />
              </ReplyTo>
            ) : (
              ""
            )}
            <CommentBox>
              <InputBox>
                <EnhancedTaggingInput
                  ref={inputRef}
                  disabled={!commentsAllowed}
                  value={newComment}
                  onChange={(value) => setNewComment(value)}
                  onTaggedUsersChange={setTaggedUsers}
                  onTaggedDealersChange={setTaggedDealers}
                  placeholder="Type your comment. Use @ to tag"
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      padding: "5px 60px 5px",
                    },
                  }}
                />
              </InputBox>
              <ActionButtons>
                <IconButton onClick={openEmojiPicker}>
                  <Smiley color="white" />
                </IconButton>
                <SendButton
                  disabled={
                    isLoading ||
                    postUpdating ||
                    !commentsAllowed ||
                    previewAllowComments
                  }
                  variant="contained"
                  onClick={handleAddComment}
                >
                  {editComment?.id ? "Update" : "Comment"}
                  {(isLoading || postUpdating) && (
                    <CircularProgress className="circularBar" />
                  )}
                </SendButton>
              </ActionButtons>
              <EmojiPickerWrapper openPicker={openPicker}>
                <Picker
                  theme="dark"
                  onEmojiSelect={onEmojiClick}
                  onClickOutside={closeEmojiPicker}
                />
              </EmojiPickerWrapper>
            </CommentBox>
            <Fade in={success} timeout={300}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#4CAF50",
                  fontSize: "14px",
                  fontWeight: "500",
                  marginTop: "8px",
                  justifyContent: "center",
                }}
              >
                ✓ Comment posted
              </div>
            </Fade>
          </CommentReply>
        )}
      </ContentWrapper>
    </StyledCard>
  );
};

export default CommentsSection;
