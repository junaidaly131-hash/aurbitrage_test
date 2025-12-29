import { memo, useRef, useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import { PostingBoardProfileWrapper } from "./styles";
import { Box, CircularProgress } from "@mui/material";
import LazyLoadingPostContent from "@/pages/posting-board/components/posting-content/LazyLoadContent/index.jsx";

const areEqual = (prevProps, nextProps) => {
  if (prevProps.posts !== nextProps.posts) {
    if (prevProps.posts.length !== nextProps.posts.length) {
      return false;
    }
    for (let i = 0; i < prevProps.posts.length; i++) {
      const prevPost = prevProps.posts[i];
      const nextPost = nextProps.posts[i];

      if (
        prevPost.id !== nextPost.id ||
        prevPost.savedPost !== nextPost.savedPost ||
        JSON.stringify(prevPost) !== JSON.stringify(nextPost)
      ) {
        return false;
      }
    }
  }
  if (
    prevProps.showLoadMore !== nextProps.showLoadMore ||
    prevProps.isLoading !== nextProps.isLoading
  ) {
    return false;
  }
  return true;
};

export const PostProfile = memo(
  ({
    posts,
    showLoadMore = false,
    isLoading = false,
    onLoadMore = () => {},
  }) => {
    const { dealerName } = useAuth();
    const wrapperRef = useRef(null);
    const loadingRef = useRef(null);
    const loadingTimerRef = useRef(null);
    const isLoadingRequested = useRef(false);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const bottomAnchorRef = useRef(null);
    const fifthLastPostRef = useRef(null);
    const fifthLastObserver = useRef(null);

    useEffect(() => {
      if (isLoading && posts.length === 0) return;

      if (posts.length !== loadedPosts.length || posts !== loadedPosts) {
        const scrollContainer =
          document.scrollingElement || document.documentElement;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
        const bottomAnchorPosition = bottomAnchorRef.current
          ? bottomAnchorRef.current.getBoundingClientRect().top
          : null;

        setLoadedPosts(posts);

        requestAnimationFrame(() => {
          if (isAtBottom) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          } else if (bottomAnchorPosition !== null) {
            const newPosition =
              bottomAnchorRef.current.getBoundingClientRect().top;
            const adjustment = newPosition - bottomAnchorPosition;
            scrollContainer.scrollTop += adjustment;
          }
        });
      }
    }, [posts, isLoading, loadedPosts]);

    useEffect(() => {
      if (!isLoading) {
        isLoadingRequested.current = false;
      }
    }, [isLoading]);

    useEffect(() => {
      if (!showLoadMore) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (
            entry.isIntersecting &&
            !isLoading &&
            !isLoadingRequested.current
          ) {
            isLoadingRequested.current = true;
            if (loadingTimerRef.current) {
              clearTimeout(loadingTimerRef.current);
            }
            loadingTimerRef.current = setTimeout(() => {
              onLoadMore();
            }, 100);
          }
        },
        {
          root: null,
          rootMargin: "300px 0px",
          threshold: 0.1,
        },
      );

      if (loadingRef.current) {
        observer.observe(loadingRef.current);
      }

      return () => {
        if (loadingRef.current) {
          observer.unobserve(loadingRef.current);
        }
        if (loadingTimerRef.current) {
          clearTimeout(loadingTimerRef.current);
        }
      };
    }, [onLoadMore, isLoading, showLoadMore]);

    useEffect(() => {
      if (!showLoadMore || isLoading || loadedPosts.length < 6) {
        if (fifthLastObserver.current) {
          fifthLastObserver.current.disconnect();
        }
        return;
      }

      const fifthLastIndex = Math.max(0, loadedPosts.length - 5);

      setTimeout(() => {
        const postElements = wrapperRef.current?.querySelectorAll(".post-item");
        if (!postElements || postElements.length <= fifthLastIndex) return;

        if (fifthLastObserver.current) {
          fifthLastObserver.current.disconnect();
        }

        fifthLastPostRef.current = postElements[fifthLastIndex];

        fifthLastObserver.current = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (
              entry.isIntersecting &&
              !isLoading &&
              !isLoadingRequested.current
            ) {
              isLoadingRequested.current = true;
              if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
              }
              loadingTimerRef.current = setTimeout(() => {
                onLoadMore();
              }, 100);
            }
          },
          {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
          },
        );

        fifthLastObserver.current.observe(fifthLastPostRef.current);
      }, 100);

      return () => {
        if (fifthLastObserver.current) {
          fifthLastObserver.current.disconnect();
        }
      };
    }, [loadedPosts, showLoadMore, isLoading, onLoadMore]);

    return (
      <PostingBoardProfileWrapper ref={wrapperRef}>
        {loadedPosts.map((post, index) => (
          <LazyLoadingPostContent
            key={post.id || index}
            post={post}
            index={index}
          />
        ))}

        <div
          ref={bottomAnchorRef}
          style={{ height: 0, margin: 0, padding: 0 }}
        />

        {showLoadMore && (
          <Box
            ref={loadingRef}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "20px 0",
              minHeight: "60px",
              position: "relative",
            }}
          >
            {isLoading ? (
              <CircularProgress size={30} />
            ) : (
              <Box sx={{ height: "20px" }} />
            )}
          </Box>
        )}
      </PostingBoardProfileWrapper>
    );
  },
  areEqual,
);

PostProfile.displayName = "PostProfile";
