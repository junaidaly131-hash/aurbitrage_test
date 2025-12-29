import { useState, useCallback, useEffect, useRef } from "react";
import { api } from "@/apis/api";

const DEBOUNCE_DELAY = 300; // 300ms delay

const useSearchMessages = (conversationId, chatType) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    messages: [],
    total: 0,
    totalPages: 0,
  });
  const abortControllerRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const limit = 20;

  // Cleanup function for abort controller and timer
  const cleanup = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  };

  const searchMessages = useCallback(
    async (term) => {
      if (!term || !conversationId) {
        setData({
          messages: [],
          total: 0,
          totalPages: 0,
        });
        return;
      }

      // Create a new AbortController for this request
      cleanup();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        setIsLoading(true);
        setError(null);

        // Split search term into words
        const searchWords = term.trim().toLowerCase().split(/\s+/);
        const searchPattern = searchWords.join("|");

        const response = await api.get(
          `/api/v1/message/search/${conversationId}?query=${encodeURIComponent(searchPattern)}&chatType=${chatType}&page=${page}&limit=${limit}`,
          controller.signal,
        );

        // Check if this request was aborted
        if (controller.signal.aborted) {
          return;
        }

        if (!response.data.messages?.length) {
          setData({
            messages: [],
            total: 0,
            totalPages: 0,
          });
          return;
        }

        setData({
          messages: response.data.messages,
          total: response.data.total || 0,
          totalPages: response.data.totalPages || 0,
        });
      } catch (err) {
        // Only set error if it's not an abort error
        if (!controller.signal.aborted) {
          setError(err.message);
          setData({
            messages: [],
            total: 0,
            totalPages: 0,
          });
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [conversationId, chatType, page],
  );

  // Debounced search effect
  useEffect(() => {
    cleanup(); // Clean up previous timer and request

    if (!searchTerm.trim()) {
      setData({
        messages: [],
        total: 0,
        totalPages: 0,
      });
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      searchMessages(searchTerm);
    }, DEBOUNCE_DELAY);

    return cleanup;
  }, [searchTerm, searchMessages]);

  // Reset search state when conversation changes
  useEffect(() => {
    setSearchTerm("");
    setPage(1);
    setError(null);
    setData({
      messages: [],
      total: 0,
      totalPages: 0,
    });
    cleanup();
  }, [conversationId]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (data && page < data.totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [data, page]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  return {
    searchTerm,
    handleSearch,
    searchResults: data.messages,
    isLoading,
    error,
    page,
    totalPages: data.totalPages,
    handleNextPage,
    handlePrevPage,
  };
};

export default useSearchMessages;
