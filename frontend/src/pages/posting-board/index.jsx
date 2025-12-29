import { useCallback, useEffect, useRef, useMemo, useState } from "react";
import {
  Chip,
  CircularProgress,
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  Tooltip,
} from "@mui/material";
import PostFilters from "@/pages/posting-board/components/PostFilters";
import { PostProfile } from "@/pages/posting-board/components/PostProfile";
import { usePostingBoardContext } from "@/Context/PostingBoardContext";
import FilterDropdown from "@/components/FilterDropdown";
import DateFilterDropdown from "@/components/DateFilterDropdown";
import { SearchBar } from "@/components/SearchBar";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  StyledGrid,
  Centered,
  ContentWrapper,
  PostingBoardWrapper,
  Wrapper,
  Header,
  Search,
  PostCount,
  SearchboxWrapper,
  FiltersWrapper,
  AddPostBtn,
  Filters,
  HeaderButtons,
  Filter,
  FiltersMobile,
} from "./style";
import dayjs from "dayjs";
import { readUnreadNotification } from "@/apis/notifications";
import { useAuth } from "@/Context/AuthContext";
import Add from "./components/new-post";
import { FunnelSimple, CalendarBlank, Funnel } from "phosphor-react";
import AddPostMobile from "./components/new-post/AddPostMobile";

const PostingBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const currentRoute = location.pathname;
  const scrollContainerRef = useRef(null);
  const { userId } = useAuth();

  const {
    posts: allPosts,
    savedPosts,
    myPosts,
    idFilter,
    setIdFilter,
    searchFilter,
    setSearchFilter,
    totalPost,
    setTotalPosts,
    isFetchingPosts,
    isFetchingMyPosts,
    isFetchingSavePosts,
    postsError,
    myPostsError,
    savePostsError,
    timeFilter,
    setTimeFilter,
    pagination,
    loadNextPage,
    hasMore,
    refetchMyPosts,
    refetchSavedPosts,
    postTypeFilter,
    dealerFilter,
    traderFilter,
    isDateFilterActive,
  } = usePostingBoardContext();

  const [filter, setFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [dealerFilters, setDealerFilters] = useState([]);
  const [tradeFilters, setTradeFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  const isInfiniteScrollEnabled = true;
  const routeConfig = useMemo(() => {
    const configs = {
      "/dashboard/posting-board/saved-posts": {
        posts: savedPosts || [],
        error: savePostsError,
        isLoading: isFetchingSavePosts,
        loadMoreFunction: refetchSavedPosts,
        showLoadMore: false,
      },
      "/dashboard/posting-board/my-posts": {
        posts: myPosts || [],
        error: myPostsError,
        isLoading: isFetchingMyPosts,
        loadMoreFunction: refetchMyPosts,
        showLoadMore: false,
      },
      default: {
        posts: allPosts || [],
        error: postsError,
        isLoading: isFetchingPosts,
        loadMoreFunction: loadNextPage,
        showLoadMore: isInfiniteScrollEnabled && hasMore,
      },
    };

    return configs[currentRoute] || configs.default;
  }, [
    currentRoute,
    savedPosts,
    myPosts,
    allPosts,
    savePostsError,
    myPostsError,
    postsError,
    isFetchingSavePosts,
    isFetchingMyPosts,
    isFetchingPosts,
    refetchSavedPosts,
    refetchMyPosts,
    loadNextPage,
    hasMore,
    isInfiniteScrollEnabled,
  ]);

  const { posts, error, isLoading, loadMoreFunction, showLoadMore } =
    routeConfig;

  useEffect(() => {
    if (Array.isArray(posts)) {
      setTotalPosts(pagination?.total || posts.length);
    }
  }, [posts, pagination, setTotalPosts]);

  useEffect(() => {
    const newId = searchParams.get("id");
    if (newId !== idFilter) {
      if (newId) {
        setIdFilter(newId);
      } else {
        setIdFilter(null);
      }
    }
  }, [searchParams, setIdFilter, idFilter]);

  useEffect(() => {
    const notificationId = searchParams.get("notification_id");
    if (notificationId && userId) {
      setTimeout(() => {
        readUnreadNotification(notificationId, "read")
          .then(() => {})
          .catch((error) => {
            console.error("Error marking notification as read:", error);
          });
      }, 1000);
    }
  }, [searchParams, userId]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [
    idFilter,
    searchFilter,
    timeFilter,
    postTypeFilter,
    dealerFilter,
    traderFilter,
  ]);

  const handleDateChange = useCallback(
    (date) => {
      if (date && (date.start || date.end)) {
        const start = date.start?.format("YYYY-MM-DD HH:mm:ss") || "";
        const end = date.end?.format("YYYY-MM-DD HH:mm:ss") || "";
        const dateRange = `${start}|${end}`;
        setTimeFilter(dateRange);
      } else {
        setTimeFilter("|");
      }
    },
    [setTimeFilter],
  );

  const handleLoadMore = () => {
    if (!isLoading && loadMoreFunction && isInfiniteScrollEnabled) {
      loadMoreFunction();
    }
  };

  const handleFilterPopup = () => {
    setFilter(!filter);
  };

  // Parse date filter for display
  const { firstDate, lastDate } = useMemo(() => {
    const timeFilterArray = timeFilter.split("|");
    const startDateFromFilter =
      timeFilterArray[0] && timeFilterArray[0] !== ""
        ? dayjs(timeFilterArray[0])
        : null;
    const endDateFromFilter =
      timeFilterArray[1] && timeFilterArray[1] !== ""
        ? dayjs(timeFilterArray[1])
        : null;

    return {
      firstDate: startDateFromFilter,
      lastDate: endDateFromFilter,
    };
  }, [timeFilter]);

  // Simplified: no client-side filtering, rely entirely on server-side filtering
  const getPostCountText = () => {
    const displayedPostCount = posts.length;
    const totalPostCount = pagination?.total || totalPost;

    if (isLoading && posts.length === 0) {
      return "Fetching posts...";
    }

    if (displayedPostCount === 0) {
      return "No posts found";
    }

    return `${displayedPostCount} of ${totalPostCount} Posts`;
  };

  return (
    <StyledGrid>
      <Wrapper>
        <AddPostBtn>
          <PostFilters
            handleDateChange={handleDateChange}
            firstDate={firstDate}
            lastDate={lastDate}
            isDateFilterActive={isDateFilterActive}
            idFilter={idFilter}
            setDateFilter={setTimeFilter}
          />
        </AddPostBtn>
        <ContentWrapper>
          <Header>
            <FiltersMobile>
              <HeaderButtons>
                <Filter variant="contained" onClick={handleFilterPopup}>
                  <Funnel /> Filter
                </Filter>
                <AddPostMobile />
              </HeaderButtons>
              {filter && (
                <ClickAwayListener onClickAway={handleFilterPopup}>
                  <Filters>
                    <PostFilters
                      handleDateChange={handleDateChange}
                      firstDate={firstDate}
                      lastDate={lastDate}
                      isDateFilterActive={isDateFilterActive}
                      idFilter={idFilter}
                      setDateFilter={setTimeFilter}
                    />
                  </Filters>
                </ClickAwayListener>
              )}
            </FiltersMobile>
            <SearchboxWrapper>
              <Tooltip 
                title="Filter" 
                arrow 
                placement="bottom"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'white',
                      color: '#101010',
                      fontSize: '12px',
                      '& .MuiTooltip-arrow': {
                        color: 'white',
                      },
                    },
                  },
                }}
              >
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  startIcon={<FunnelSimple size={20} weight="bold" />}
                  sx={(theme) => ({
                    color: showFilters ? theme.palette.secondary.gold : "#fff",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "500",
                    textTransform: "none",
                    padding: "4px",
                    minWidth: "40px",
                    height: "40px",
                    "&:hover": {
                      backgroundColor: theme.palette.background.overlay,
                      ...(showFilters && {
                        color: theme.palette.secondary.gold,
                      }),
                    },
                    "& .MuiButton-startIcon": {
                      margin: 0,
                    },
                  })}
                >
                </Button>
              </Tooltip>
              <Search>
                <SearchBar
                  searchInput={searchFilter}
                  setSearchInput={setSearchFilter}
                  width={"100%"}
                  label={"Search Posts"}
                />
              </Search>
              <AddPostBtn>
                <Add />
              </AddPostBtn>
            </SearchboxWrapper>
            {showFilters && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2, mt: 1, alignItems: "center" }}>
                <FilterDropdown
                  options={["All Dealers", "Dealer A", "Dealer B", "Dealer C"]}
                  value={dealerFilters}
                  placeholder="All Dealers"
                  onChange={setDealerFilters}
                  multiSelect
                />
                <FilterDropdown
                  options={["All Trades", "Trade A", "Trade B", "Trade C"]}
                  value={tradeFilters}
                  placeholder="All Trades"
                  onChange={setTradeFilters}
                  multiSelect
                />
                <FilterDropdown
                  options={["All Types", "Type A", "Type B", "Type C"]}
                  value={typeFilters}
                  placeholder="All Types"
                  onChange={setTypeFilters}
                  multiSelect
                />
                <DateFilterDropdown
                  value={dateRange}
                  placeholder="All days"
                  onChange={setDateRange}
                  startIcon={<CalendarBlank size={16} weight="bold" />}
                />
                {(dealerFilters.length || tradeFilters.length || typeFilters.length || dateRange[0] || dateRange[1]) && (
                  <Button
                    onClick={() => {
                      setDealerFilters([]);
                      setTradeFilters([]);
                      setTypeFilters([]);
                      setDateRange([null, null]);
                    }}
                    sx={{
                      color: "#E75153",
                      fontSize: "12px",
                      fontWeight: "500",
                      textTransform: "none",
                      padding: "4px 12px",
                      minWidth: "auto",
                      "&:hover": {
                        backgroundColor: "#E7515333",
                      },
                    }}
                  >
                    Clear all
                  </Button>
                )}
              </Box>
            )}


            <PostCount variant="body2">{getPostCountText()}</PostCount>
          </Header>

          {(idFilter || isDateFilterActive()) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                mb: 2,
                maxWidth: "100%",
                margin: "0 auto 16px auto",
              }}
            >
              {idFilter && (
                <Chip
                  label={"View All Posts"}
                  variant="outlined"
                  color="secondary"
                  onDelete={() => {
                    setSearchParams(searchParams.delete("id"));
                  }}
                />
              )}
              {isDateFilterActive() && (
                <Chip
                  label={"Clear Date Filter"}
                  variant="outlined"
                  sx={{
                    color: "#DBA42D",
                    borderColor: "#DBA42D",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(219, 164, 45, 0.1)",
                      borderColor: "#DBA42D",
                    },
                    "& .MuiChip-deleteIcon": {
                      color: "#DBA42D",
                      "&:hover": {
                        color: "#fff",
                      },
                    },
                  }}
                  onDelete={() => {
                    setTimeFilter("|");
                  }}
                />
              )}
            </Box>
          )}

          <PostingBoardWrapper ref={scrollContainerRef}>
            {isLoading && posts.length === 0 ? (
              <Centered>
                <CircularProgress />
              </Centered>
            ) : error && posts.length === 0 ? (
              <Centered>{error}</Centered>
            ) : posts.length === 0 ? (
              <Centered>No posts found</Centered>
            ) : (
              <PostProfile
                posts={posts}
                showLoadMore={showLoadMore}
                isLoading={isLoading}
                onLoadMore={handleLoadMore}
              />
            )}
          </PostingBoardWrapper>
        </ContentWrapper>
      </Wrapper>
    </StyledGrid>
  );
};


export default PostingBoard;
