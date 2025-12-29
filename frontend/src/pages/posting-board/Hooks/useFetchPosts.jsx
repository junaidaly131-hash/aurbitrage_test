import { useState, useCallback } from "react";

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    currentPage: 1,
    perPage: 10,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const apiEndpoint = "/api/v1/post/get";

  const fetchPosts = useCallback(
    async (params = {}, options = {}) => {
      const {
        preserveScroll = false,
        scrollContainerRef = null,
        keepPreviousData = false,
      } = options;
      let oldScrollTop = 0;

      setLoading(true);
      if (!keepPreviousData) setError(null);

      if (preserveScroll && scrollContainerRef?.current) {
        oldScrollTop = scrollContainerRef.current.scrollTop;
      }

      try {
        const requestParams = { ...params };
        const isLoadMore = requestParams.page > 1 && !requestParams.id;
        const isFilterChange =
          !isLoadMore && (!requestParams.page || requestParams.page === 1);

        if (isFilterChange) {
          requestParams.page = 1;
          setPagination((prev) => ({
            ...prev,
            currentPage: 1,
            hasNextPage: true,
          }));
        }

        if (!requestParams.limit) {
          requestParams.limit = pagination.perPage;
        }

        const queryString = new URLSearchParams(requestParams).toString();
        const fetchOptions = {
          method: "GET",
          signal: options.signal,
        };

        const response = await fetch(
          `${apiEndpoint}?${queryString}`,
          fetchOptions,
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching posts: ${response.status} ${response.statusText}`,
          );
        }

        const res = await response.json();

        if (res.success) {
          const newPostsData = res.data?.data || [];
          const newPagination = res.data?.pagination || null;

          setPosts((prevPosts) => {
            if (isLoadMore && !isFilterChange) {
              return [...prevPosts, ...newPostsData];
            } else {
              return newPostsData;
            }
          });

          if (newPagination) {
            setPagination(newPagination);
          } else {
            setPagination((prev) => ({
              ...prev,
              total: Array.isArray(res.data)
                ? res.data.length
                : res.data?.data?.length || 0,
              currentPage: 1,
              totalPages: 1,
              hasNextPage: false,
              hasPreviousPage: false,
            }));
          }
        } else {
          setError(res.data || "Failed to fetch posts");
          if (!keepPreviousData) {
            setPosts([]);
            setPagination((prev) => ({
              ...prev,
              total: 0,
              currentPage: 1,
              totalPages: 0,
              hasNextPage: false,
            }));
          }
        }

        setLoading(false);
        return { success: true, preserveScroll, oldScrollTop, isLoadMore };
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch Posts Error:", error);
          setError(error instanceof Error ? error.message : String(error));
          if (!keepPreviousData) {
            setPosts([]);
            setPagination((prev) => ({
              ...prev,
              total: 0,
              currentPage: 1,
              totalPages: 0,
              hasNextPage: false,
            }));
          }
          setLoading(false);
        }
        return { success: false, preserveScroll, isLoadMore: params.page > 1 };
      }
    },
    [pagination.perPage],
  );

  const loadNextPage = useCallback(
    (additionalFilters = {}) => {
      if (pagination.hasNextPage && !loading) {
        const nextPageParams = {
          ...additionalFilters,
          page: pagination.currentPage + 1,
          limit: pagination.perPage,
        };

        fetchPosts(nextPageParams, { keepPreviousData: true }).catch(
          console.error,
        );
      }
    },
    [
      fetchPosts,
      pagination.hasNextPage,
      pagination.currentPage,
      pagination.perPage,
      loading,
    ],
  );

  const refetch = useCallback(
    (params = {}, options = {}) => {
      const fetchParams = {
        limit: pagination.perPage,
        ...params,
        page: 1,
      };
      setPosts([]);
      return fetchPosts(fetchParams, {
        ...options,
        preserveScroll: options.preserveScroll ?? false,
      });
    },
    [fetchPosts, pagination.perPage],
  );

  return {
    posts,
    loading,
    error,
    refetch,
    pagination,
    loadNextPage,
    hasMore: pagination.hasNextPage,
    setPosts,
    setPagination,
  };
};

export default useFetchPosts;
