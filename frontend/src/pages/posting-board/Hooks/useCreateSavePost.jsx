import { useState } from "react";
import axios from "axios";

const useCreateSavePost = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("idle");

  const createSavePost = async (
    postId,
    refetchPosts,
    refetchMyPosts,
    refetchSaved,
  ) => {
    try {
      setLoading("loading");
      const apiEndpoint = `/api/v1/post/save-post/${postId}`;
      const response = await axios.post(apiEndpoint);

      // Check the response status and data
      if (response.status === 200 && response.data.success) {
        setLoading("success");
        refetchPosts?.(postId);
        refetchSaved?.(postId);
        refetchMyPosts?.(postId);
        setError("");
      } else {
        setError(response.data.message || "Failed to save post");
        setLoading("failed");
      }
    } catch (error) {
      setError("Post Already Saved");
      setLoading("failed");
    }
  };

  return { createSavePost, loading, error };
};

export default useCreateSavePost;
