import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "@/components/SearchBar";
import { LinearProgress } from "@mui/material";
import useGetSkuMappingSkus from "../admin-dashboard/hooks/useGetSkuMapping";
import useDistinctAurbitrageSkus from "../admin-dashboard/hooks/useDistinctAurbitrageSkus";
import { useNavigate } from "react-router-dom";
import MySkuTable from "../admin-dashboard/pages/map-sku/my-sku-table";
import { useAuth } from "@/Context/AuthContext";
import {
  StyledDiv,
  StyledFetchinData,
  StyledFailed,
} from "../admin-dashboard/styles";
import {
  AddButton,
  Filter,
  Header,
  SearchFilter,
  Tab,
  Tabs,
  Title,
  Wrapper,
  Left,
  Right,
  Warning,
  Filters,
} from "./styles";
import MenuIcon from "@/components/Icons/MenuIcon";
import { PlusCircle } from "phosphor-react";
import { FilterGroup } from "@/components/FilterGroup";
import { Close } from "@mui/icons-material";
import APISKUs from "./components/APISKUs";
import AddSKU from "@/components/AddSKU";

const ActiveSKUs = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { token, logout, userRole, userName, dealerName } = useAuth();
  const navigate = useNavigate();
  const [skuTypeFilter, setSkuTypeFilter] = React.useState("Active");
  const [createSKU, setCreateSKU] = React.useState(false);
  const [isManual, setIsManual] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [tabSwitch, setTabSwitch] = React.useState(false);

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [filterView, setFilterView] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const [dealerFilter, setDealerFilter] = React.useState([]);
  const [createSKURelation, setCreateSKURelation] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [apiSkus, setApiSkus] = useState([]);

  React.useEffect(() => {
    if (token !== null && userRole == "user") {
      navigate("/dashboard/pricing");
    } else if (
      token !== null &&
      (userRole == "admin" || userRole == "superAdmin")
    ) {
      navigate("/dashboard/settings");
    }
  }, [token, userRole, navigate]);

  const {
    data: skuMappingData,
    loading,
    loginAgain,
    fetchSkuMapping,
  } = useGetSkuMappingSkus();

  const [skuMapping, setSkuMapping] = useState([]);

  React.useEffect(() => {
    if (skuMappingData) {
      setSkuMapping(skuMappingData);
    }
  }, [skuMappingData]);

  if (loginAgain) {
    logout();
    navigate("/login");
  }

  const { data: AurbitrageSKUMeta, fetchDistinctAurbitrageSkus } =
    useDistinctAurbitrageSkus();

  const updateSKUData = () => {
    fetchSkuMapping();
    fetchDistinctAurbitrageSkus();
  };

  const onEdit = (row) => {
    setEditData(row);
    setCreateSKURelation(true);
  };

  const updateChanges = (data) => {
    if (data.deleted) {
      // Remove the item by filtering it out
      const updatedSkuMapping = skuMapping.filter(
        (item) => item.pricelistId !== data.pricelistId,
      );
      console.log("Sku removed");
      setSkuMapping(updatedSkuMapping);
    } else {
      // Normal update
      const index = skuMapping.findIndex(
        (item) => item.pricelistId === data.pricelistId,
      );

      if (index !== -1) {
        const updatedSkuMapping = [...skuMapping];
        updatedSkuMapping[index] = { ...updatedSkuMapping[index], ...data };

        setSkuMapping(updatedSkuMapping);
      } else {
        const normalizedRow = {
          pricelistId: data.pricelistId ?? Date.now(), // Use API returned pricelistId or fallback to temporary ID
          date: new Date().toISOString(),
          dealer: data.dealerName ?? "",
          dealerId: data.dealerId ?? null,
          dealerName: data.dealerName ?? "",
          sku: data.aurbitrageSku ?? "",
          aurbitrageSku: data.aurbitrageSku ?? "",
          aurbitrageSkuId: data.aurbitrageSkuId ?? null,
          bidFormat: data.bidFormat ?? null,
          bidNumber: data.bidNumber ?? null,
          bidPriceDisplayAs: data.bidPriceDisplayAs ?? null,
          bidPriceFormat: data.bidPriceFormat ?? null,
          bidSign: data.bidSign ?? null,
          askFormat: data.askFormat ?? null,
          askNumber: data.askNumber ?? null,
          askPriceDisplayAs: data.askPriceDisplayAs ?? null,
          askPriceFormat: data.askPriceFormat ?? null,
          askSign: data.askSign ?? null,
          bulkDiscount: data.bulkDiscount ?? "",
          shippingNotes: data.shippingNotes ?? "",
          notes: data.notes ?? "",
          section: data.section ?? "",
          isExtracted: false,
          // extra fields from your "real" data shape
          category: data.category ?? null,
          subCategory: data.subCategory ?? null,
          metal: data.metal ?? null,
          year: data.year ?? null,
          mint: data.mint ?? null,
          designation: data.designation ?? null,
          gradingService: data.gradingService ?? null,
          labelType: data.labelType ?? null,
          labelSignature: data.labelSignature ?? null,
          coreColor: data.coreColor ?? null,
          equivalentOz: data.equivalentOz ?? null,
          type: data.type ?? null,
          sourceTable: data.sourceTable ?? "MasterPricelists",
          dataSource: data.dataSource ?? null,
          receiverDealerId: data.receiverDealerId ?? null,
          receiverDealerName: data.receiverDealerName ?? null,
          keywords: data.keywords ?? null,
        };

        setSkuMapping((prev) => [...prev, normalizedRow]);
      }
    }
  };

  const filterSKUType = (item) => {
    return (
      skuTypeFilter.length === 0 ||
      (skuTypeFilter.includes("Active") && item.aurbitrageSkuId) ||
      (skuTypeFilter.includes("Unmapped") && !item.aurbitrageSkuId)
    );
  };

  const getActiveOptions = () => {
    let options = [];
    if (tabValue === 0 || tabValue === 2) {
      options = skuMapping.filter(filterSKUType);
      if (tabValue === 0) {
        options = options.filter(
          (u) => u.isExtracted && u.sourceTable === "MasterPricelists",
        );
      } else if (tabValue === 2) {
        options = options.filter(
          (u) => u.sourceTable === "DealerMasterPricelists",
        );
      }
      options = options?.map((u) => ({ sku: u.sku, keywords: u.keywords }));
    } else if (tabValue === 1) {
      options = skuMapping
        ?.filter((u) => !u.isExtracted && u.sourceTable === "MasterPricelists")
        .map((u) => ({
          sku: u.aurbitrageSku,
          keywords: u.keywords,
        }));
    } else if (tabValue === 3) {
      options = apiSkus.filter(filterSKUType).map((u) => ({
        sku: u.sku,
      }));
    }
    return options;
  };

  const getFilteredSKUCount = () => {
    let filteredData = [];

    // Get base data based on tab
    if (tabValue === 0 || tabValue === 2) {
      if (tabValue === 0) {
        filteredData = skuMapping.filter(
          (u) => u.isExtracted && u.sourceTable === "MasterPricelists",
        );
      } else if (tabValue === 2) {
        filteredData = skuMapping.filter(
          (u) => u.sourceTable === "DealerMasterPricelists",
        );
      }
    } else if (tabValue === 1) {
      filteredData = skuMapping.filter(
        (u) => !u.isExtracted && u.sourceTable === "MasterPricelists",
      );
    } else if (tabValue === 3) {
      filteredData = apiSkus.filter(filterSKUType);
    }

    // Apply additional filters
    if (dealerFilter.length > 0) {
      filteredData = filteredData.filter((item) =>
        dealerFilter.includes(item.dealerName || item.dealer),
      );
    }
    if (skuTypeFilter.length > 0) {
      filteredData = filteredData.filter(filterSKUType);
    }

    if (searchInput) {
      const searchLower = searchInput.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          (item.sku && item.sku.toLowerCase().includes(searchLower)) ||
          (item.aurbitrageSku &&
            item.aurbitrageSku.aurbitrageSku &&
            item.aurbitrageSku.aurbitrageSku
              .toLowerCase()
              .includes(searchLower)) ||
          (item.keywords && item.keywords.toLowerCase().includes(searchLower)),
      );
    }
    return filteredData.length;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${month}-${day}-${year} ${hours}:${minutes}`;
  };

  const handleTabChange = (newValue) => {
    setIsManual(newValue === 1);
    setIsCustom(newValue === 2);
    setTabValue(newValue);
    setSkuTypeFilter("Active");
  };

  const toggleFilterView = () => {
    setFilterView((prev) => !prev);
  };

  if (loading === "loading") {
    return (
      <StyledDiv>
        <StyledFetchinData>
          <h2> Fetching Data </h2>
          <LinearProgress />
        </StyledFetchinData>
      </StyledDiv>
    );
  }

  if (loading === "failed") {
    return (
      <StyledDiv>
        <StyledFailed>
          <h2>
            <FontAwesomeIcon size="xl" icon={faTriangleExclamation} />
            &nbsp; Oops, Failed to fetch data!
          </h2>
        </StyledFailed>
      </StyledDiv>
    );
  }
  const dealers = AurbitrageSKUMeta.Dealers;
  return (
    <Wrapper>
      <Header>
        <Title>Active SKUs</Title>
        <Tabs>
          <Tab isSelected={tabValue === 0} onClick={() => handleTabChange(0)}>
            Price Sheet SKUs
          </Tab>
          <Tab isSelected={tabValue === 1} onClick={() => handleTabChange(1)}>
            User Added SKUs
          </Tab>
          <Tab isSelected={tabValue === 2} onClick={() => handleTabChange(2)}>
            Custom SKUs
          </Tab>
          <Tab isSelected={tabValue === 3} onClick={() => handleTabChange(3)}>
            API SKUs
          </Tab>
        </Tabs>
      </Header>
      {createSKURelation && (
        <AddSKU
          createSKU={createSKURelation}
          setCreateSKU={setCreateSKURelation}
          formatDate={formatDate}
          type={"header"}
          AurbitrageSKUMeta={AurbitrageSKUMeta}
          userRole={userRole}
          dealerName={dealerName}
          editData={editData}
          updateChanges={updateChanges}
        />
      )}
      <Header>
        <Left>
          <SearchFilter>
            <Filter onClick={toggleFilterView}>
              Filter {filterView ? <Close /> : <MenuIcon />}
            </Filter>
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              options={getActiveOptions()}
            />
          </SearchFilter>
        </Left>
        <Right>
          {filterView ? (
            <Filters>
              <FilterGroup
                title="Dealer"
                options={dealers}
                filters={dealerFilter}
                onChange={setDealerFilter}
              />
              <FilterGroup
                title="Sku Type"
                options={["Active", "Unmapped"]}
                filters={skuTypeFilter}
                onChange={setSkuTypeFilter}
              />
            </Filters>
          ) : tabValue == 1 ? (
            <AddButton
              active
              onClick={() => {
                setEditData(null);
                if (tabValue == 0) {
                  setCreateSKU((prev) => !prev);
                }
                if (tabValue == 1) {
                  setCreateSKURelation((prev) => !prev);
                }
              }}
            >
              <PlusCircle size={32} />
              <span>Add New SKU</span>
            </AddButton>
          ) : (
            <Tab>Total SKUs : {getFilteredSKUCount()}</Tab>
          )}
        </Right>
      </Header>
      {tabValue === 3 ? (
        <APISKUs
          setApiSkus={setApiSkus}
          searchInput={searchInput}
          dealerFilter={dealerFilter}
          updateApiSkus={setApiSkus}
          skuTypeFilter={skuTypeFilter}
        />
      ) : (
        <MySkuTable
          startDate={startDate}
          endDate={endDate}
          updateSKUData={updateSKUData}
          unmappedSKUs={skuMapping}
          AurbitrageSKUMeta={AurbitrageSKUMeta}
          dealerFilter={dealerFilter}
          searchInput={searchInput}
          userName={userName}
          userRole={userRole}
          skuTypeFilter={skuTypeFilter}
          setSkuTypeFilter={setSkuTypeFilter}
          createSKU={createSKU}
          setCreateSKU={setCreateSKU}
          setIsManual={setIsManual}
          isManual={isManual}
          tabSwitch={tabSwitch}
          setTabSwitch={setTabSwitch}
          onEdit={onEdit}
          tabValue={tabValue}
          isCustom={isCustom}
        />
      )}
    </Wrapper>
  );
};

export default ActiveSKUs;
