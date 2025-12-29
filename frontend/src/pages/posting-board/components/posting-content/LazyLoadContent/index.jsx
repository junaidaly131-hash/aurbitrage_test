import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/Context/AuthContext";
import PostingContent from "@/pages/posting-board/components/posting-content/index.jsx";
import { useLocation } from "react-router-dom";
import { FlexBox, Wrapper } from "./styles";
import LoadingState from "./LoadingState";

const LazyLoadingPostContent = ({ post, index }) => {
  const { dealerName } = useAuth();
  const postRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;
  const minLoaderTime = 2000;

  const needsUnwrapping =
    currentRoute === "/dashboard/posting-board/saved-posts" && post.post;

  const postData = needsUnwrapping ? post.post : post;

  const postId = postData?.id || post?.id || "loading";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true);

          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              setShowContent(true);
              setTimeout(() => {
                setIsTransitioning(false);
              }, 100);
            }, 300);
          }, minLoaderTime);
        }
      },
      {
        root: null,
        rootMargin: "300px 0px",
        threshold: 0.1,
      },
    );

    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => {
      if (postRef.current) {
        observer.unobserve(postRef.current);
      }
    };
  }, [hasLoaded]);

  return (
    <div
      ref={postRef}
      className="post-item"
      data-post-id={postId}
      style={{ position: "relative" }}
    >
      {(!hasLoaded || !isVisible || !showContent) && <LoadingState />}

      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          position: showContent ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: showContent ? 1 : -1,
        }}
      >
        <PostingContent
          post={post}
          userdealerName={dealerName}
          lazyLoad={!hasLoaded}
          isVisible={isVisible && showContent}
          currentRoute={currentRoute}
        />
      </div>
    </div>
  );
};

export default LazyLoadingPostContent;
