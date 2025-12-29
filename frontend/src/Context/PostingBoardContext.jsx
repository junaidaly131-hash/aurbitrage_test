import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import useFetchPosts from "@/pages/posting-board/Hooks/useFetchPosts";
import useFetchMyPosts from "@/pages/posting-board/Hooks/useFetchMyPosts";
import useFetchSavePosts from "@/pages/posting-board/Hooks/useFetchSavePosts";
import useFetchPostsMetaData from "@/pages/posting-board/Hooks/useFetchPostsMetaData";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const PostingBoardContext = createContext();

export const PostingBoardProvider = ({ children }) => {
  const location = useLocation();

  // Filter states
  const [idFilter, setIdFilter] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [totalPost, setTotalPosts] = useState(0);
  const [postTypeFilter, setPostTypeFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("|"); // Default: no date filter
  const [dealerFilter, setDealerFilter] = useState([]);
  const [traderFilter, setTraderFilter] = useState([]);
  const [postsDealers, setPostsDealers] = useState([]);
  const [postsUsers, setPostsUsers] = useState([]);

  const [proPosts, setProPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [savePosts, setSavePosts] = useState([]);

  const {
    posts: fetchedPosts,
    loading: isFetchingPosts,
    error: postsError,
    refetch: triggerPostFetch,
    pagination,
    loadNextPage: originalLoadNextPage,
    hasMore,
  } = useFetchPosts();

  const {
    posts: fetchedMyPosts,
    loading: isFetchingMyPosts,
    error: myPostsError,
    refetch: fetchMyPosts,
  } = useFetchMyPosts();

  const {
    posts: fetchedSavePosts,
    loading: isFetchingSavePosts,
    error: savePostsError,
    refetch: fetchSavedPosts,
  } = useFetchSavePosts();

  const { metaData: meta } = useFetchPostsMetaData();

  useEffect(() => {
    if (fetchedPosts) {
      setProPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  useEffect(() => {
    if (fetchedMyPosts) {
      setMyPosts(fetchedMyPosts);
    }
  }, [fetchedMyPosts]);

  useEffect(() => {
    if (fetchedSavePosts) {
      setSavePosts(fetchedSavePosts);
    }
  }, [fetchedSavePosts]);

  useEffect(() => {
    if (meta?.dealers) {
      setPostsDealers(meta.dealers);
    }
    if (meta?.traders) {
      setPostsUsers(meta.traders);
    }
  }, [meta]);

  const handlePostSave = useCallback(
    (postId) => {
      let currentPost = null;
      let isCurrentlySaved = false;

      const findInPosts = (posts) => {
        return posts.find((post) => parseInt(post.id) === parseInt(postId));
      };

      currentPost =
        findInPosts(proPosts) || findInPosts(myPosts) || findInPosts(savePosts);

      if (currentPost) {
        isCurrentlySaved = currentPost.savedPost;
      }

      setProPosts((prevPosts) =>
        prevPosts.map((post) =>
          parseInt(post.id) === parseInt(postId)
            ? { ...post, savedPost: !post.savedPost }
            : post,
        ),
      );

      setMyPosts((prevPosts) =>
        prevPosts.map((post) =>
          parseInt(post.id) === parseInt(postId)
            ? { ...post, savedPost: !post.savedPost }
            : post,
        ),
      );

      if (!isCurrentlySaved) {
        setSavePosts((prevPosts) => {
          const postToAdd = findInPosts(proPosts) || findInPosts(myPosts);
          if (postToAdd) {
            return [...prevPosts, { ...postToAdd, savedPost: true }];
          }
          return prevPosts;
        });
      } else {
        setSavePosts((prevPosts) =>
          prevPosts.filter((post) => parseInt(post.id) !== parseInt(postId)),
        );
      }
    },
    [proPosts, myPosts, savePosts],
  );
  const isDateFilterActive = useCallback(() => {
    if (idFilter) {
      return false;
    }

    const timeFilterArray = timeFilter.split("|");
    const hasStartDate = timeFilterArray[0] && timeFilterArray[0] !== "";
    const hasEndDate = timeFilterArray[1] && timeFilterArray[1] !== "";
    return hasStartDate || hasEndDate;
  }, [timeFilter, idFilter]);

  const buildQuery = useCallback(() => {
    const query = {};

    if (idFilter) {
      query.id = idFilter;
    }

    if (searchFilter) {
      query.search = searchFilter;
    }

    if (postTypeFilter && postTypeFilter.length > 0) {
      query.postType = postTypeFilter.join(",");
    }

    if (dealerFilter && dealerFilter.length > 0) {
      query.dealerId = dealerFilter.map((dealer) => dealer.id).join(",");
    }

    if (traderFilter && traderFilter.length > 0) {
      query.traderIds = traderFilter.map((trader) => trader.id).join(",");
    }

    if (timeFilter && timeFilter !== "|" && !idFilter) {
      query.timeFilter = timeFilter;
    }

    if (!query.page) {
      query.page = 1;
    }
    if (!query.limit) {
      query.limit = 10;
    }

    return query;
  }, [
    idFilter,
    searchFilter,
    postTypeFilter,
    dealerFilter,
    traderFilter,
    timeFilter,
  ]);

  useEffect(() => {
    if (
      location.pathname === "/dashboard/posting-board" ||
      location.pathname === "/dashboard/posting-board/"
    ) {
      const query = buildQuery();
      triggerPostFetch(query);
    }
  }, [
    idFilter,
    searchFilter,
    postTypeFilter,
    dealerFilter,
    traderFilter,
    timeFilter,
    location.pathname,
    triggerPostFetch,
    buildQuery,
  ]);

  const refetchPosts = useCallback(() => {
    const query = buildQuery();
    triggerPostFetch(query);
    fetchMyPosts();
    fetchSavedPosts();
  }, [triggerPostFetch, fetchMyPosts, fetchSavedPosts, buildQuery]);

  // Create a wrapper for loadNextPage that includes all current filters
  const loadNextPage = useCallback(() => {
    if (pagination.hasNextPage && !isFetchingPosts) {
      const currentFilters = buildQuery();
      delete currentFilters.page;
      delete currentFilters.limit;

      return originalLoadNextPage(currentFilters);
    }
  }, [
    originalLoadNextPage,
    pagination.hasNextPage,
    isFetchingPosts,
    buildQuery,
  ]);

  return (
    <PostingBoardContext.Provider
      value={{
        posts: proPosts,
        myPosts: myPosts,
        savedPosts: savePosts,
        isFetchingPosts,
        isFetchingMyPosts,
        isFetchingSavePosts,
        postsError,
        myPostsError,
        savePostsError,
        triggerPostFetch,
        fetchMyPosts,
        fetchSavedPosts,
        idFilter,
        setIdFilter,
        searchFilter,
        setSearchFilter,
        totalPost,
        setTotalPosts,
        postTypeFilter,
        setPostTypeFilter,
        timeFilter,
        setTimeFilter,
        dealerFilter,
        setDealerFilter,
        traderFilter,
        setTraderFilter,
        meta,
        postsDealers,
        setPostsDealers,
        postsUsers,
        setPostsUsers,
        refetchPosts,
        pagination,
        loadNextPage,
        hasMore,
        setProPosts,
        setMyPosts,
        setSavePosts,
        handlePostSave,
        isDateFilterActive,
      }}
    >
      {children}
    </PostingBoardContext.Provider>
  );
};

export const usePostingBoardContext = () => useContext(PostingBoardContext);
