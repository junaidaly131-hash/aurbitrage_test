import { useState, useRef, useEffect } from "react";
import { Box, Avatar, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import CallIconOutline from "@/assets/images/call-icon-outline.png";
import ContactCardIcon from "@/assets/icons/contact-card.svg";
import EmailIcon from "@/assets/images/email 1.svg";
import Copy from "@/assets/images/copy.svg";
import PostActions from "@/pages/posting-board/components/PostActions";
import {
  ActionCard,
  Contact,
  ContactCard,
  ContactCardContainer,
  ContactHeading,
  ContactWrapper,
  DateCard,
  DealerInfo,
  DealerName,
  MediaCard,
  Profile,
  ProfileWrapper,
  StyledBox,
  StyledButton,
  UpdatedAt,
  Wrapper,
} from "./style";
import toast from "react-hot-toast";
import { formatPhoneNumber } from "@/lib";
import { useNavigate } from "react-router-dom";

function isSystemUser(user) {
  return user?.lastName === "System";
}

const PostHeader = ({
  post,
  triggerPostFetch,
  fetchSavedPosts,
  fetchMyPosts,
  userId,
  userRole, // Add userRole prop
  isPreview = false,
}) => {
  const [tooltip, setTooltip] = useState(false);
  const containerRef = useRef(null);

  const handleMouseLeave = (e) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setTooltip(false);
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    toast("Text Copied!", {
      position: "top-center",
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle clicking on a row
    const handleRowClick = (event) => {
      // Find the closest tr element that has data-sku
      const row = event.target.closest("tr.sku-row");

      // Check if we found a row and if the click wasn't on a tooltip
      if (row && !event.target.closest('[data-no-navigate="true"]')) {
        const sku = row.getAttribute("data-sku");
        if (sku) {
          // Use React Router to navigate
          navigate(`/dashboard/pricing?sku=${sku}`);
        }
      }
    };

    // Add event listener to the document
    document.addEventListener("click", handleRowClick);

    // Clean up
    return () => {
      document.removeEventListener("click", handleRowClick);
    };
  }, [navigate]);
  const isPostUpdated = !dayjs(post?.postTime).isSame(dayjs(post?.updatedAt));

  return (
    <Wrapper>
      <StyledBox>
        <MediaCard>
          <ProfileWrapper>
            <Profile
              src={post.user.profileImage || undefined}
              alt="Avatar"
              className="avatar"
            />

            <DealerInfo>
              {((post?.PostSettings &&
                post.PostSettings.length > 0 &&
                !post.PostSettings[0].hideUsername) ||
                isPreview) &&
                (isSystemUser(post.user) ? (
                  <DealerName variant="body1">
                    {post?.user?.dealer?.dealerName}
                  </DealerName>
                ) : (
                  <DealerName variant="body1">
                    {post?.user?.firstName} {post?.user?.lastName} |{" "}
                    {isSystemUser(post?.user) ? (
                      <span>{post?.user?.dealer?.dealerName}</span>
                    ) : (
                      <span>{post?.user?.dealer?.dealerName}</span>
                    )}
                  </DealerName>
                ))}
              <DateCard>
                {`${dayjs(isPostUpdated ? post?.updatedAt : post?.postTime).format("MMMM DD, YYYY, hh:mm A")} ${isPostUpdated ? <span>(Resived)</span> : ""}`}
                {/* {!isSystemUser(post?.user) && isPostUpdated && (
                  <UpdatedAt>
                    Post was revised on{" "}
                    {dayjs(post?.updatedAt).format("MMMM DD, YYYY, hh:mm A")}
                  </UpdatedAt>
                )}
                {isSystemUser(post?.user) &&
                  post?.postHeader === "SKU Updates" &&
                  isPostUpdated && (
                    <UpdatedAt>
                      SKUs last updated on{" "}
                      {dayjs(post?.updatedAt).format("MMMM DD, YYYY, hh:mm A")}
                    </UpdatedAt>
                  )} */}
              </DateCard>
            </DealerInfo>
          </ProfileWrapper>

          {!isSystemUser(post?.user) && (
            <ContactCardContainer
              ref={containerRef}
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                loading="lazy"
                src={ContactCardIcon}
                alt="call-icon"
                className="icon"
              />
              {tooltip && (
                <ContactCard>
                  <ContactWrapper>
                    <ContactHeading variant="subtitle1">
                      Contact Card
                    </ContactHeading>
                    {post?.user?.phoneNo && (
                      <Contact
                        onMouseOver={() => setTooltip(true)}
                        className="contactPhoneNo"
                      >
                        <img
                          loading="lazy"
                          src={CallIconOutline}
                          alt="call-icon"
                          className="icon"
                        />
                        <Typography variant="caption">
                          {formatPhoneNumber(post?.user?.phoneNo)}
                        </Typography>
                        <Box className="flexCenter">
                          <img
                            onClick={() =>
                              handleCopy(
                                post?.user?.phoneNo || "xxxx-xxxx-xxxx",
                              )
                            }
                            className="icon "
                            src={Copy}
                            alt=""
                          />
                        </Box>
                      </Contact>
                    )}
                    {((post?.PostSettings?.length > 0 &&
                      post?.PostSettings[0]?.showEmail &&
                      post?.user?.email) ||
                      isPreview) && (
                      <Contact onMouseOver={() => setTooltip(true)}>
                        <img
                          src={EmailIcon}
                          alt="email-icon"
                          className=" email"
                        />
                        <Typography variant="caption">
                          {post?.user?.email}
                        </Typography>
                        <Box className="flexCenter">
                          <img
                            onClick={() => handleCopy(post?.user?.email)}
                            className="icon"
                            src={Copy}
                            alt=""
                          />
                        </Box>
                      </Contact>
                    )}
                  </ContactWrapper>
                </ContactCard>
              )}
            </ContactCardContainer>
          )}
        </MediaCard>

        <ActionCard>
          {post?.postType ? (
            <StyledButton hidden="md" post={post}>
              {post?.postType === "Automated"
                ? "Automated"
                : post?.postType === "Sell"
                  ? "Looking to Sell"
                  : post?.postType === "Buy"
                    ? "Looking to Buy"
                    : post?.postType === "Bulletin"
                      ? "General"
                      : post?.postType === "Question"
                        ? "Have a Question"
                        : ""}
            </StyledButton>
          ) : null}
          {/* Show action button for post owner or superadmin */}
          {!isPreview &&
            (post.userId == userId ||
              (userRole === "superadmin" && isSystemUser(post?.user))) && (
              <IconButton
                sx={{ "&.MuiIconButton-root": { padding: "0px" } }}
                aria-label="post options"
              >
                <PostActions
                  post={post}
                  userId={userId}
                  userRole={userRole}
                  refetchPosts={triggerPostFetch}
                  refetchSaved={fetchSavedPosts}
                  refetchMyPosts={fetchMyPosts}
                  isSystemPost={isSystemUser(post?.user)}
                />
              </IconButton>
            )}
        </ActionCard>
      </StyledBox>
      <StyledBox hidden="md">
        <StyledButton post={post}>
          {post?.postType === "Automated"
            ? "Automated"
            : post?.postType === "Sell"
              ? "Looking to Sell"
              : post?.postType === "Buy"
                ? "Looking to Buy"
                : post?.postType === "Bulletin"
                  ? "General"
                  : post?.postType === "Question"
                    ? "Have a Question"
                    : ""}
        </StyledButton>
      </StyledBox>
    </Wrapper>
  );
};
export default PostHeader;
