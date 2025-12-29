/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PAGE_VIEW_OPTIONS } from "@/constants/pricing-dashboard";
import useGetPricelist from "@/pages/price-dashboard/hooks/priceList";
import useFetchSideBarData from "@/pages/price-dashboard/hooks/useGetSideBarData";
import useFetchPricingDashboardData from "@/pages/price-dashboard/hooks/pricingDashboardData";
import { createContext, useState, useEffect } from "react";
import { useSpotPrices } from "./SpotPricesContext";
import useGetStoneXPrices from "@/pages/price-dashboard/hooks/useGetStoneXPrices";
import useGetDillionGagePrices from "@/pages/price-dashboard/hooks/useGetDillionGagePrices";
import useGetUpstatePrices from "@/pages/price-dashboard/hooks/useGetUpstatePrices";
import { formatDate } from "@/lib";
import { timeAgo } from "@/pages/price-dashboard/components/DataTable/utils";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";
const PricingDashboardContext = createContext();

const PricingDashboardProvider = ({ children }) => {
  const {
    data: PricingData,
    loading: pricingLoading,
    fetchData: fetchPricingData,
  } = useGetPricelist();

  const {
    sideBarData,
    loading: sideBarDataLoading,
    error: sideBarDataError,
    fetchSideBarData,
  } = useFetchSideBarData();
  const {
    pricingData: pricingDashBoardData,
    loading: pricingDataLoading,
    error,
    fetchPricingDashboardData,
  } = useFetchPricingDashboardData();

  const {
    data: stoneXPricingData,
    loading: stoneXPricingLoading,
    GetStoneXPrices,
  } = useGetStoneXPrices();

  const {
    data: dillionGagePricingData,
    loading: dillionGagePricingLoading,
    GetDillionGagePrices,
  } = useGetDillionGagePrices();

  const {
    data: upstatePricingData,
    loading: upstatePricingLoading,
    GetUpstatePrices,
  } = useGetUpstatePrices();
  const { spotPrices } = useSpotPrices();
  const { storageType } = useAuth();

  const [pricingDataView, setpricingDataView] = useState([]);
  const [allPricingData, setAllPricingData] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [isStoneXIntegrated, setIsStoneXIntegrated] = useState(
    storageType?.getItem("isStoneXIntegrated") == "true",
  );
  const [isDillionGageIntegrated, setIsDillionGageIntegrated] = useState(
    storageType?.getItem("isDillionGageIntegrated") == "true",
  );
  const [isUpstateIntegrated, setIsUpstateIntegrated] = useState(
    storageType?.getItem("isUpstateIntegrated") == "true",
  );

  const [Category, setCategory] = useState("Category");
  const [sideBarCategories, setSideBarCategories] = useState([]);

  const [displayPrice, setDisplayPrice] = useState("default");
  const [dealers, setDealers] = useState([]);
  const [metalFilter, setMetalFilter] = useState([]);
  const [refineryFilter, setRefineryFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState([]);
  const [selectedNode, setSelectedNode] = useState("");
  const [isSideBarData, setIsSideBarData] = useState(false);
  const [numTopPicks, setNumTopPicks] = useState(1);

  const [allYears, setAllYears] = useState([]);
  const [allRefineries, setAllRefineries] = useState([]);
  const [allMetals, setAllMetals] = useState([]);

  const [dataCount, setDataCount] = useState(-1);
  const [skuCount, setSkuCount] = useState(-1);
  const [view, setView] = useState(PAGE_VIEW_OPTIONS[0]);
  const [pageView, setPageView] = useState(PAGE_VIEW_OPTIONS[0]);
  //Query Params attrs
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [mintFilter, setMintFilter] = useState("");
  const [skuType, setSkuType] = useState("");

  const [dealerFilter, setDealerFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [saveTypeFilter, setSaveTypeFilter] = useState("");
  const [aurbitrageSkuFilter, setAurbitrageSkuFilter] = useState("");
  const [suggestionPrompt, setSuggestionPrompt] = useState(false);
  const [suggestionType, setSuggestionType] = useState("");
  const [searchMetadata, setSearchMetadata] = useState(null);
  const locationHook = useLocation();

  useEffect(() => {
    fetchSideBarData().catch(console.error);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skuParam = params.get("sku");
    if (skuParam) {
      setAurbitrageSkuFilter(decodeURIComponent(skuParam));
    }
  }, [locationHook.key]);

  useEffect(() => {
    if (!sideBarDataLoading) {
      setSideBarCategories(sideBarData);
    }
  }, [sideBarDataLoading]);
  useEffect(() => {
    if (pricingLoading === "success") {
      setDealers(PricingData.Dealer);
      setAllMetals(PricingData.Metals);
      setAllYears(PricingData.Years);
      setAllRefineries(PricingData.Mints);
      setSearchOptions(PricingData.SkuData);
    }
  }, [PricingData, pricingLoading]);
  useEffect(() => {
    if (pricingDataLoading == "success") {
      setDataCount(pricingDashBoardData.skuCount);
      setSearchMetadata(pricingDashBoardData.searchMetadata || null);
      console.log("Search Metadata:", pricingDashBoardData.searchMetadata);
      if (searchFilter !== "") {
        setAllPricingData(pricingDashBoardData.pricingData);
      } else {
        setpricingDataView(pricingDashBoardData.pricingData);
        setSkuCount(pricingDashBoardData.skuCount);
      }
    }
  }, [pricingDataLoading]);

  useEffect(() => {
    GetStoneXPrices();
    const abortController = new AbortController();
    const signal = abortController.signal;
    setpricingDataView([]);
    triggerPricingDataFetch(signal);
  }, [isStoneXIntegrated]);

  useEffect(() => {
    if (pricingDataLoading == "success" && stoneXPricingLoading == "success") {
      matchPrices();
    }
  }, [pricingDataLoading, stoneXPricingLoading, isStoneXIntegrated]);

  useEffect(() => {
    GetDillionGagePrices();
    const abortController = new AbortController();
    const signal = abortController.signal;
    setpricingDataView([]);
    triggerPricingDataFetch(signal);
  }, [isDillionGageIntegrated]);
  useEffect(() => {
    if (
      pricingDataLoading == "success" &&
      dillionGagePricingLoading == "success" &&
      pricingDataView.length > 0
    ) {
      matchDillionGagePrices();
    }
  }, [
    pricingDataLoading,
    dillionGagePricingLoading,
    pricingDataView,
    isDillionGageIntegrated,
  ]);

  useEffect(() => {
    GetUpstatePrices();
    const abortController = new AbortController();
    const signal = abortController.signal;
    setpricingDataView([]);
    triggerPricingDataFetch(signal);
  }, [isUpstateIntegrated]);
  useEffect(() => {
    if (
      pricingDataLoading == "success" &&
      upstatePricingLoading == "success" &&
      pricingDataView.length > 0
    ) {
      matchUpstatePrices();
    }
  }, [
    pricingDataLoading,
    upstatePricingLoading,
    pricingDataView,
    isUpstateIntegrated,
  ]);

  function matchDillionGagePrices() {
    if (!isDillionGageIntegrated) return;
    const dillonGagePriceList = pricingDataView
      .map((category) => ({
        ...category,
        data: category.data
          .map((product) => ({
            ...product,
            ask: Array.isArray(product.ask)
              ? product.ask.filter((entry) => entry.dealer === "Dillon Gage")
              : [],
            bid: Array.isArray(product.bid)
              ? product.bid.filter((entry) => entry.dealer === "Dillon Gage")
              : [],
          }))
          .filter(
            (product) => product.ask.length > 0 || product.bid.length > 0,
          ),
      }))
      .filter((category) => category.data.length > 0);
    dillionGagePricingData.forEach((dillonGageItem) => {
      dillonGagePriceList.forEach((priceItem) => {
        priceItem.data.forEach((item) => {
          if (dillonGageItem.aurbitrageSkuId === item.aurbitrageSkuId) {
            const equivalentOz = item.equivalentOz;
            const metal = item.metal;
            const metalSpotPrice = spotPrices.find(
              (item) => item.metals.toLowerCase() === metal.toLowerCase(),
            );

            const calculatePrices = ({ apiPrice, meltPrice }) => {
              const priceDifference = Math.abs(meltPrice - apiPrice);
              const priceThreshold = apiPrice * 0.25;
              let dollarPrice, percentage, fixedPrice;

              if (priceDifference <= priceThreshold) {
                // Fixed price case
                fixedPrice = Number(apiPrice);
                dollarPrice = (fixedPrice - meltPrice).toFixed(2);
                percentage = ((dollarPrice / meltPrice) * 100).toFixed(2);
              } else {
                // Dollar price case
                dollarPrice = Number(apiPrice);
                fixedPrice = (dollarPrice + meltPrice).toFixed(2);
                percentage = ((dollarPrice / meltPrice) * 100).toFixed(2);
              }
              return { dollarPrice, percentage, fixedPrice };
            };
            const setPrice = (priceObj, prices, dillonGageItem) => {
              const displayType = priceObj.displayPriceAs.toLowerCase();

              if (displayType === "dollar") {
                priceObj.price = Number(prices.dollarPrice);
              } else if (displayType === "percentage") {
                priceObj.price = Number(prices.percentage);
              } else if (displayType === "fixed") {
                priceObj.price = Number(prices.fixedPrice);
              }
              priceObj.isDillionGagePrice = true;
              priceObj.sourceTable = "API";
            };
            if (
              dillonGageItem.tier1Price.ask != 0 &&
              dillonGageItem.isActiveSell == "Y"
            ) {
              const meltPrice = equivalentOz * metalSpotPrice?.ask;
              const apiPrice = dillonGageItem.tier1Price.ask;
              const prices = calculatePrices({ apiPrice, meltPrice });
              setPrice(item.ask[0], prices, dillonGageItem);
            }
            if (
              dillonGageItem.tier1Price.bid != 0 &&
              dillonGageItem.isActiveBuy == "Y"
            ) {
              const meltPrice = equivalentOz * metalSpotPrice?.bid;
              const apiPrice = dillonGageItem.tier1Price.bid;
              const prices = calculatePrices({ apiPrice, meltPrice });
              if (item.bid[0]) {
                setPrice(item.bid[0], prices, dillonGageItem);
              }
            }
          }
        });
      });
    });
  }

  function matchUpstatePrices() {
    if (!isUpstateIntegrated) return;
    if (!upstatePricingData || !Array.isArray(upstatePricingData)) {
      console.error("upstatePricingData is not an array or is undefined.");
      return;
    }
    const upstatePriceList = pricingDataView
      .map((category) => ({
        ...category,
        data: category.data
          .map((product) => ({
            ...product,
            ask: Array.isArray(product.ask)
              ? product.ask.filter(
                  (entry) =>
                    entry.dealer === "Upstate Coin & Gold" &&
                    entry.section === "api",
                )
              : [],
            bid: Array.isArray(product.bid)
              ? product.bid.filter(
                  (entry) =>
                    entry.dealer === "Upstate Coin & Gold" &&
                    entry.section === "api",
                )
              : [],
          }))
          .filter(
            (product) => product.ask.length > 0 || product.bid.length > 0,
          ),
      }))
      .filter((category) => category.data.length > 0);
    let mappedCount = 0;
    upstatePricingData.forEach((upstateItem) => {
      upstatePriceList.forEach((priceItem) => {
        priceItem.data.forEach((item) => {
          if (upstateItem.aurbitrageSkuId === item.aurbitrageSkuId) {
            mappedCount += 1;
            const setPrice = (priceObj, price, upstateItem) => {
              priceObj.price = Number(price);
              priceObj.priceFormat = "All-in";
              priceObj.format = "$";
              priceObj.isUpstatePrice = true;
              priceObj.bulkDiscount = null;
              priceObj.shippingNote = null;
              priceObj.notes = null;
              priceObj.sourceTable = "API";

              // Set stock information based on quantities
              if (upstateItem.sellQuantity > 0) {
                priceObj.notes =
                  upstateItem.sellQuantity >= 10 ? "In Stock" : "Limited Stock";
              } else {
                priceObj.notes = "SOLD OUT";
              }
            };

            // Handle ask prices (sell prices)
            if (upstateItem.askPrice != null && upstateItem.askPrice > 0) {
              const apiPrice = upstateItem.askPrice;
              if (item.ask[0]) {
                setPrice(item.ask[0], apiPrice, upstateItem);
              }
            }

            // Handle bid prices (buy prices)
            if (upstateItem.bidPrice != null && upstateItem.bidPrice > 0) {
              const apiPrice = upstateItem.bidPrice;
              if (item.bid[0]) {
                setPrice(item.bid[0], apiPrice, upstateItem);
              }
            }
          }
        });
      });
    });
    let unMappedCount = skuCount - mappedCount;
    setSkuCount((prev) => prev - unMappedCount);
  }

  function matchPrices() {
    if (!isStoneXIntegrated) return;
    if (!stoneXPricingData || !Array.isArray(stoneXPricingData)) {
      console.error("stoneXPricingData is not an array or is undefined.");
      return;
    }
    const stoneXPriceList = pricingDashBoardData.pricingData
      .map((category) => ({
        ...category,
        data: category.data
          .map((product) => ({
            ...product,
            ask: product.ask.filter(
              (entry) => entry.dealer.toLowerCase() === "stonex",
            ),
            bid: product.bid.filter(
              (entry) => entry.dealer.toLowerCase() === "stonex",
            ),
          }))
          .filter(
            (product) => product.ask.length > 0 || product.bid.length > 0,
          ),
      }))
      .filter((category) => category.data.length > 0);

    stoneXPricingData.forEach((stoneXItem) => {
      stoneXPriceList.forEach((priceItem, index) => {
        priceItem.data.map((item) => {
          if (stoneXItem.aurbitrageSkuId === item.aurbitrageSkuId) {
            const equivalentOz = item.equivalentOz;
            const metal = item.metal;
            const metalSpotPrice = spotPrices.find(
              (item) => item.metals.toLowerCase() === metal.toLowerCase(),
            );
            const calculatePrices = ({ apiPrice, meltPrice }) => {
              const priceDifference = Math.abs(meltPrice - apiPrice);
              const priceThreshold = apiPrice * 0.25;
              let dollarPrice, percentage, fixedPrice;

              if (priceDifference <= priceThreshold) {
                // Fixed price case
                fixedPrice = apiPrice;
                dollarPrice = (fixedPrice - meltPrice).toFixed(2);
                percentage = ((dollarPrice / meltPrice) * 100).toFixed(2);
              } else {
                // Dollar price case
                dollarPrice = apiPrice;
                fixedPrice = (dollarPrice + meltPrice).toFixed(2);
                percentage = ((dollarPrice / meltPrice) * 100).toFixed(2);
              }
              return { dollarPrice, percentage, fixedPrice };
            };
            const setPrice = (priceObj, prices, stoneXItem) => {
              const displayType = priceObj.displayPriceAs.toLowerCase();
              if (displayType === "dollar") {
                priceObj.price = String(prices.dollarPrice);
              } else if (displayType === "percentage") {
                priceObj.price = String(prices.percentage);
              } else if (displayType === "fixed") {
                priceObj.price = String(prices.fixedPrice);
              }
              const baseURL = "https://wholesale.stonexbullion.com/en/?search=";
              const encodedName = encodeURIComponent(stoneXItem.name);

              priceObj.isApiPrice = true;
              priceObj.sourceTable = "API";
              priceObj.dataSource = `${baseURL}${encodedName}`;
              priceObj.date = timeAgo(stoneXItem.fetchedDate);
              priceObj.bulkDiscount = null;
              priceObj.shippingNote =
                stoneXItem?.shipping_start_date &&
                `Starts ${formatDate(stoneXItem.shipping_start_date)}`;
              priceObj.notes = null;
              const stock = Object.entries(stoneXItem.stock).filter(
                (i) => i[1] === "in_stock",
              );
              if (stock.length > 0) {
                const sortedStock = stock.sort((a, b) => {
                  return (
                    parseInt(b[0].replace("over_", "")) -
                    parseInt(a[0].replace("over_", ""))
                  );
                });
                priceObj.notes =
                  sortedStock[0][0] === "over_0"
                    ? "Limited stock"
                    : `Stock ${sortedStock[0][0].replace("_", " ")}`;
              } else {
                priceObj.notes = "SOLD OUT";
              }
            };

            if (stoneXItem.netto_price.usd != null) {
              const meltPrice = equivalentOz * metalSpotPrice?.ask;
              const apiPrice = stoneXItem.netto_price.usd;
              const prices = calculatePrices({ apiPrice, meltPrice });
              if (item.ask[0]) {
                setPrice(item.ask[0], prices, stoneXItem);
              }
            }
            if (stoneXItem.buy_price.usd != null) {
              const meltPrice = equivalentOz * metalSpotPrice?.bid;
              const apiPrice = stoneXItem.buy_price.usd;
              const prices = calculatePrices({ apiPrice, meltPrice });
              if (item.bid[0]) {
                setPrice(item.bid[0], prices, stoneXItem);
              }
            }
          }
        });
      });
    });
  }
  //This UseEffect will only execute when data is returned using search filter
  useEffect(() => {
    if (allPricingData && allPricingData.length > 0 && searchFilter !== "") {
      let totalDealerScore = 0;
      let totalMintScore = 0;
      let totalMetalScore = 0;
      let filteredData = [];
      let count = 0;

      allPricingData.forEach((pricingData) => {
        const primarySearchResults = [];
        const secondarySearchResults = [];
        pricingData.data.forEach((d) => {
          if (d.skuSimilarityScore >= 0.1 || d.keywordSimilarityScore >= 0.5) {
            primarySearchResults.push(d);
          } else {
            secondarySearchResults.push(d);
          }
        });

        if (primarySearchResults.length > 0) {
          filteredData.push({ ...pricingData, data: primarySearchResults });
          count += primarySearchResults.length;
        }
        secondarySearchResults.forEach((d) => {
          if (d.dealerSimilarityScore >= 0.1)
            totalDealerScore += d.dealerSimilarityScore || 0;
          if (d.mintSimilarityScore > 0.1)
            totalMintScore += d.mintSimilarityScore || 0;
          if (d.metalSimilarityScore > 0.1)
            totalMetalScore += d.metalSimilarityScore || 0;
        });
      });

      const sortByTotalSkuSimilarityScore = (pricingData) => {
        return pricingData.sort((a, b) => {
          a.data.sort(
            (x, y) => (y.skuSimilarityScore || 0) - (x.skuSimilarityScore || 0),
          );
          b.data.sort(
            (x, y) => (y.skuSimilarityScore || 0) - (x.skuSimilarityScore || 0),
          );

          const maxScoreA = a.data.length
            ? a.data[0].skuSimilarityScore || 0
            : 0;
          const maxScoreB = b.data.length
            ? b.data[0].skuSimilarityScore || 0
            : 0;

          return maxScoreB - maxScoreA;
        });
      };

      let sortedFilteredData = sortByTotalSkuSimilarityScore(filteredData);

      setpricingDataView(sortedFilteredData);
      setSkuCount(count);
      if (count != dataCount) {
        setSuggestionPrompt(true);
      }

      let suggestionTypes = [];
      if (totalDealerScore > 0) suggestionTypes.push("Dealers");
      if (totalMintScore > 0) suggestionTypes.push("Mints/Refineries");
      if (totalMetalScore > 0) suggestionTypes.push("Metals");
      let suggestionString = suggestionTypes.join(", ");
      if (suggestionTypes.length > 1) {
        suggestionString = suggestionString.replace(/, ([^,]*)$/, " and $1");
      }
      setSuggestionType(suggestionString);
    } else if (searchFilter !== "") {
      setSkuCount(0);
    }
  }, [allPricingData, searchFilter]);

  useEffect(() => {
    if (categoryFilter != "" || subCategoryFilter != "" || mintFilter != "") {
      setIsSideBarData(true);
    }
    const abortController = new AbortController();
    const signal = abortController.signal;
    setpricingDataView([]);
    setDataCount(-1);
    triggerPricingDataFetch(signal);

    return () => {
      abortController.abort();
    };
  }, [
    dealerFilter,
    refineryFilter,
    metalFilter,
    subCategoryFilter,
    categoryFilter,
    mintFilter,
    yearFilter,
    searchFilter,
    view,
    saveTypeFilter,
    aurbitrageSkuFilter,
  ]);
  const handleNoClick = () => {
    setSuggestionPrompt(false);
  };
  const handleYesClick = () => {
    setSuggestionPrompt(false);
    if (pricingDataView.length == 0) {
      setpricingDataView(allPricingData);
      setSkuCount(dataCount);
    } else {
      const sortedData = allPricingData.map((category) => {
        const sortedItems = category.data
          .map((item) => ({
            ...item,
            totalSimilarityScore:
              (item.metalSimilarityScore || 0) +
              (item.mintSimilarityScore || 0) +
              (item.dealerSimilarityScore || 0),
          }))
          .sort((a, b) => b.totalSimilarityScore - a.totalSimilarityScore);
        return {
          ...category,
          data: sortedItems,
        };
      });
      setpricingDataView(sortedData);
      setSkuCount(
        sortedData.reduce((count, category) => count + category.data.length, 0),
      );
    }
  };
  function checkSpecialIdx(item) {
    return (
      item?.aurbitrageSku?.toLowerCase().includes("bar") ||
      item?.aurbitrageSku?.toLowerCase().includes("round") ||
      item?.subCategory?.toLowerCase().includes("round") ||
      item?.subCategory?.toLowerCase().includes("bar") ||
      item?.category?.toLowerCase().includes("round") ||
      item?.category?.toLowerCase().includes("bar")
    );
  }
  const triggerPricingDataFetch = (signal = null) => {
    const queryParams = {};
    if (aurbitrageSkuFilter !== "") {
      queryParams.aurbitrageSku = aurbitrageSkuFilter;
      // Clear other search-related filters when using exact SKU
      queryParams.search = "";
    } else if (searchFilter !== "") {
      queryParams.search = searchFilter;
    }

    if (dealerFilter.length > 0) {
      queryParams.dealerName = dealerFilter.join(",");
    }
    if (refineryFilter.length > 0) {
      queryParams.refinery = refineryFilter.join(",");
    }
    if (metalFilter.length > 0) {
      queryParams.metals = metalFilter.join(",");
    }
    if (yearFilter.length > 0) {
      queryParams.year = yearFilter.join(",");
    }
    if (searchFilter != "") {
      setSuggestionPrompt(false);
      queryParams.search = searchFilter;
    }
    if (categoryFilter != "") {
      queryParams.category = categoryFilter;
    }
    if (subCategoryFilter != "") {
      queryParams.subCategory = subCategoryFilter;
    }
    if (mintFilter != "") {
      queryParams.mint = mintFilter;
    }
    if (skuType != "") {
      queryParams.type = skuType;
    }
    if (view != "") {
      queryParams.pageView = view;
    }
    if (saveTypeFilter != "") {
      queryParams.saveType = saveTypeFilter;
    }
    if (aurbitrageSkuFilter != "") {
      queryParams.aurbitrageSku = aurbitrageSkuFilter;
    }
    fetchPricingDashboardData(queryParams, signal);
  };

  return (
    <PricingDashboardContext.Provider
      value={{
        pricingDataView,
        PricingData,
        setpricingDataView,
        Category,
        setCategory,
        displayPrice,
        setDisplayPrice,
        dealers,
        dealerFilter,
        setDealerFilter,
        selectedNode,
        setSelectedNode,
        metalFilter,
        setMetalFilter,
        refineryFilter,
        setRefineryFilter,
        yearFilter,
        setYearFilter,
        allYears,
        setAllYears,
        allRefineries,
        setAllRefineries,
        allMetals,
        setAllMetals,
        isSideBarData,
        setIsSideBarData,
        numTopPicks,
        setNumTopPicks,
        checkSpecialIdx,
        dataCount,
        setDataCount,
        view,
        setView,
        pricingLoading,
        fetchPricingData,
        sideBarCategories,
        setCategoryFilter,
        setSubCategoryFilter,
        setMintFilter,
        categoryFilter,
        subCategoryFilter,
        mintFilter,
        setSearchFilter,
        searchFilter,
        setSkuType,
        pricingDataLoading,
        searchOptions,
        spotPrices,
        saveTypeFilter,
        setSaveTypeFilter,
        aurbitrageSkuFilter,
        setAurbitrageSkuFilter,
        skuCount,
        setSkuCount,
        handleYesClick,
        handleNoClick,
        suggestionPrompt,
        setSuggestionPrompt,
        suggestionType,
        searchMetadata,
        setSearchMetadata,
        triggerPricingDataFetch,
        isStoneXIntegrated,
        setIsStoneXIntegrated,
        isDillionGageIntegrated,
        setIsDillionGageIntegrated,
        isUpstateIntegrated,
        setIsUpstateIntegrated,
      }}
    >
      {children}
    </PricingDashboardContext.Provider>
  );
};
export { PricingDashboardContext, PricingDashboardProvider };
