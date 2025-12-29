import { CardContent, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { usePostingBoardContext } from "@/Context/PostingBoardContext";
import useCreateSavePost from "@/pages/posting-board/Hooks/useCreateSavePost";
import useUnSavePost from "@/pages/posting-board/Hooks/useUnsavePost";
import { useSpotPrices } from "@/Context/SpotPricesContext";
import { useScreenshot } from "use-react-screenshot";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  SetSelectedChatId,
  SetSelectedConversation,
  UpdateSidebarType,
} from "@/redux/slices/app";
import useSendMessage from "@/pages/messages/hooks/useSendMessage";
import ConfirmationModal from "@/pages/posting-board/components/Post/ConfirmationPopup";
import PostHeader from "./PostHeader";
import PostDeal from "./post-deal";
import PostContent from "./PostContent";
import {
  DescBox,
  Description,
  PostCard,
  PostScreen,
  PostStatus,
  StyledChip,
  Title,
} from "./style";
import CommentsSection from "../Post/PostCommentSection";
import useFetchComments from "../../Hooks/useFetchComments";
import PostReactions from "./PostReactions";
import DealIcon from "@/components/Icons/DealIcon";
import toast from "react-hot-toast";

const PostingContent = ({
  post,
  userdealerName,
  lazyLoad = false,
  isVisible = true,
  currentRoute: passedRoute,
}) => {
  const {
    sendMessage,
    loading: postShareLoading,
    error: postShareError,
    success: postShareSuccess,
  } = useSendMessage();
  const { comments: fetchedComments, fetchComments } = useFetchComments();
  const { triggerPostFetch, fetchSavedPosts, fetchMyPosts, handlePostSave } =
    usePostingBoardContext();
  const { userId, userRole } = useAuth();
  const [shot, takeScreenshot] = useScreenshot();
  const { spotPrices } = useSpotPrices();

  const [openModal, setOpenModal] = useState(false);
  const [modalPostType, setModalPostType] = useState("");
  const [comments, setComments] = useState([]);
  const [reactionsLoaded, setReactionsLoaded] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const ref = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentRoute = passedRoute || location.pathname;

  let processedPost = post;

  if (currentRoute === "/dashboard/posting-board/saved-posts" && post?.post) {
    processedPost = post.post;
  }

  useEffect(() => {
    setIsLiked(post.savedPost);
  }, [post.savedPost]);

  useEffect(() => {
    if (
      processedPost?.id &&
      isVisible &&
      !commentsLoaded &&
      (currentRoute.includes("/id=") || !lazyLoad)
    ) {
      fetchComments(processedPost?.id);
      setCommentsLoaded(true);
    }
  }, [
    processedPost,
    fetchComments,
    isVisible,
    commentsLoaded,
    currentRoute,
    lazyLoad,
  ]);

  useEffect(() => {
    if (fetchedComments?.length > 0) {
      setComments(fetchedComments);
    }
  }, [fetchedComments]);

  useEffect(() => {
    if (isVisible && !reactionsLoaded) {
      setReactionsLoaded(true);
    }
  }, [isVisible, reactionsLoaded]);

  const getPostScreenshot = () => {
    return takeScreenshot(ref.current, {
      allowTaint: false,
      useCORS: true,
    });
  };

  const handlePostShare = async () => {
    const screenshotTemp = await getPostScreenshot();
    const { user, userId, id } = processedPost;
    let message = `<p style="font-weight:bold;font-size:1.5em">${processedPost.postHeader}</p> 
                  ${processedPost.postContent}
                  <a href=/dashboard/posting-board?id=${id}> Go to Post </a>
                  `;

    dispatch(SetSelectedChatId(userId));
    dispatch(
      SetSelectedConversation({
        id: userId,
        name: `${user.firstName} ${user.lastName}`,
        dealer: user.dealer.dealerName,
        chatType: "direct",
      }),
    );
    dispatch(UpdateSidebarType("CHAT"));

    const byteString = atob(screenshotTemp.split(",")[1]);
    const mimeString = screenshotTemp.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    const file = new File([blob], `Screenshot-${Date.now()}.png`, {
      type: mimeString,
    });

    await sendMessage(userId, "direct", message, file, "", "img");
    while (postShareLoading) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (postShareSuccess) {
      navigate("/dashboard/messages");
    } else if (postShareError) {
      toast.error("Failed to share post", {
        position: "top-right",
      });
    }
  };

  const handleMessageIconClick = () => {
    const { user, userId, id } = processedPost;
    dispatch(SetSelectedChatId(userId));
    dispatch(
      SetSelectedConversation({
        id: userId,
        name: `${user.firstName} ${user.lastName}`,
        dealer: user.dealer.dealerName,
        chatType: "direct",
      }),
    );
    dispatch(UpdateSidebarType("CHAT"));

    navigate("/dashboard/messages");
  };

  const handleOpenModal = (postType) => {
    setModalPostType(postType);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const postLike = () => {
    handlePostSave(processedPost.id);
  };

  const { isLoading: unSaving, unSavePost } = useUnSavePost(postLike);
  const { createSavePost, loading: saving, error } = useCreateSavePost();

  const handleSavePost = async () => {
    await createSavePost(processedPost.id, postLike);
  };

  const handleUnSavePost = async () => {
    await unSavePost(processedPost.id);
  };
  const handleConfirm = () => {
    handleCloseModal();
  };

  const soldComment = (
    <CardContent>
      <Typography variant="body1" color="text.secondary">
        SOLD privately
      </Typography>
    </CardContent>
  );
  const findSpotPrice = (metal, spotType) => {
    const metalPrice = spotPrices.find((item) => item.metals === metal);
    if (metalPrice) {
      let sType = "";
      if (spotType === "Ask") {
        sType = `${metal}: Ask - ${"$" + parseFloat(metalPrice.ask.replace(/,/g, "")).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      } else if (spotType === "Bid") {
        sType = `${metal}: Bid - ${"$" + parseFloat(metalPrice.bid.replace(/,/g, "")).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }

      return <StyledChip key={metal} label={sType} align="Center" />;
    }
    return null;
  };

  const commentsLength = comments.reduce((acc, comment) => {
    return acc + 1 + (comment.children ? comment.children.length : 0);
  }, 0);

  if (!processedPost?.user) {
    return null;
  }

  return (
    <PostCard style={{ backgroundColor: processedPost.textBackground }}>
      <PostScreen ref={ref}>
        {processedPost.PostDeals &&
        processedPost.PostDeals[0] &&
        processedPost.PostDeals[0].isClosed ? (
          <PostStatus>
            <DealIcon />
            {processedPost.PostDeals[0].isPublic ? (
              <>
                Sold to {processedPost.PostDeals[0].dealTaker.firstName}{" "}
                {processedPost.PostDeals[0].dealTaker.lastName} at{" "}
                {processedPost.PostDeals[0].dealTaker.dealer.dealerName}
              </>
            ) : (
              processedPost.PostDeals[0].dealTaker && soldComment
            )}
          </PostStatus>
        ) : null}
        <PostHeader
          post={processedPost}
          handleMessageIconClick={handleMessageIconClick}
          triggerPostFetch={triggerPostFetch}
          fetchSavedPosts={fetchSavedPosts}
          fetchMyPosts={fetchMyPosts}
          currentRoute={currentRoute}
          userId={userId}
          userRole={userRole}
        />
        {processedPost?.postHeader && processedPost.postHeader.trim() !== "" ? (
          <Title>{processedPost.postHeader}</Title>
        ) : null}
        {processedPost?.postContent &&
        processedPost?.postContent.trim() !== "" ? (
          <DescBox>
            <Description
              dangerouslySetInnerHTML={{ __html: processedPost?.postContent }}
            ></Description>
          </DescBox>
        ) : null}
        {post?.PostAssets?.length && !processedPost.textBackground ? (
          <PostContent post={processedPost} />
        ) : null}

        <PostReactions
          post={processedPost}
          comments={commentsLength}
          handlePostShare={handlePostShare}
          handleSavePost={handleSavePost}
          handleUnSavePost={handleUnSavePost}
          isLoading={unSaving || saving === "loading"}
          postShareLoading={postShareLoading}
          parentRef={ref}
          loadData={reactionsLoaded}
          isLiked={isLiked}
        />
      </PostScreen>
      <PostScreen className="pt-0">
        <PostDeal
          post={processedPost}
          userId={userId}
          handleOpenModal={handleOpenModal}
          findSpotPrice={findSpotPrice}
        />
        {(commentsLoaded || !lazyLoad) && (
          <CommentsSection postId={processedPost?.id} post={processedPost} />
        )}
      </PostScreen>

      <ConfirmationModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        postType={modalPostType}
        postId={processedPost.id}
        dealerName={userdealerName}
        postDealerName={processedPost.user.dealer.dealerName}
        refetchPosts={triggerPostFetch}
        spotType={processedPost.PostDeals[0]?.spotType}
        findSpotPrice={findSpotPrice}
        metals={processedPost.PostDeals[0]?.metal}
      />
    </PostCard>
  );
};

export default PostingContent;
