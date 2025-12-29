import MediaCard from "@/pages/posting-board/components/PostFile";
import { PostImage, StyledGrid } from "./style";
const PostContent = ({ post, isPreview = false }) => {
  return (
    <StyledGrid>
      {post?.PostAssets?.length > 0 && (
        <PostImage>
          <MediaCard post={post} isPreview={isPreview} />
        </PostImage>
      )}
    </StyledGrid>
  );
};

export default PostContent;
