import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "@/components/SearchBar";
import { LinearProgress } from "@mui/material";
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
  Filters,
  Header,
  SearchFilter,
  Tab,
  Tabs,
  Title,
  Wrapper,
} from "./styles";
import { Plus, PlusCircle } from "phosphor-react";
import useGetSkuMappingSkus from "../admin-dashboard/hooks/useGetSkuMapping";
import MenuIcon from "@/components/Icons/MenuIcon";
import { Close } from "@mui/icons-material";
import { FilterGroup } from "@/components/FilterGroup";
import AddSKU from "@/components/AddSKU";

const MySKUs = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { token, logout, userRole, userName, dealerName } = useAuth();
  const navigate = useNavigate();
  const [skuTypeFilter, setSkuTypeFilter] = React.useState("");
  const [createSKU, setCreateSKU] = React.useState(false);
  const [isManual, setIsManual] = useState(false);
  const [tabSwitch, setTabSwitch] = React.useState(false);

  const [skuMapping, setSkuMapping] = useState([]);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const [searchInput, setSearchInput] = React.useState("");
  const [dealerFilter, setDealerFilter] = React.useState([]);
  const [createSKURelation, setCreateSKURelation] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [filterView, setFilterView] = React.useState(false);
  const {
    data: skuMappingData,
    loading,
    loginAgain,
    fetchSkuMapping,
  } = useGetSkuMappingSkus();

  React.useEffect(() => {
    if (skuMappingData) {
      setSkuMapping(skuMappingData);
    }
  }, [skuMappingData]);

  React.useEffect(() => {
    if (token !== null && userRole == "user") {
      navigate("/dashboard/pricing");
    }
    if (userRole == "admin") {
      setTabValue(1);
    }
  }, [token, userRole, navigate]);

  // const {
  //   data: skuMapping,
  //   loading,
  //   loginAgain,
  //   fetchSkuMapping,
  // } = useGetSkuMappingSkus();

  // if (loginAgain) {
  //   logout();
  //   navigate("/login");
  // }

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

  const getActiveOptions = () => {
    let options = [];
    if (tabValue === 0) {
      options = skuMapping?.map((u) => ({ sku: u.sku, keywords: u.keywords }));
    } else {
      options = skuMapping
        ?.filter(
          (item) =>
            !item.isExtracted && item.sourceTable === "MasterPricelists",
        )
        .map((u) => ({ sku: u.sku, keywords: u.keywords }));
    }
    return options;
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
    if (newValue != 0) {
      setIsManual(false);
    }
    setTabValue(newValue);
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
        <Title>My SKUs</Title>
        <Tabs>
          <Tab active={tabValue === 0} onClick={() => handleTabChange(0)}>
            Price Sheet SKUs
          </Tab>
          <Tab active={tabValue === 1} onClick={() => handleTabChange(1)}>
            User Added SKUs
          </Tab>
        </Tabs>
      </Header>
      <AddSKU
        createSKU={createSKURelation}
        setCreateSKU={setCreateSKURelation}
        open={createSKURelation}
        formatDate={formatDate}
        type={"header"}
        AurbitrageSKUMeta={AurbitrageSKUMeta}
        userRole={userRole}
        dealerName={dealerName}
        editData={editData}
        updateChanges={updateChanges}
      />
      <Header>
        <SearchFilter>
          {(isManual || tabValue == 1) && (
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
          )}
          {userRole === "superadmin" && (
            <Filter onClick={toggleFilterView}>
              Filter {filterView ? <Close /> : <MenuIcon />}
            </Filter>
          )}
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            options={getActiveOptions()}
          />
          {filterView && (
            <Filters>
              <FilterGroup
                title="Dealer"
                options={dealers}
                filters={dealerFilter}
                onChange={setDealerFilter}
              />
            </Filters>
          )}
        </SearchFilter>
      </Header>

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
        isCustom={false}
        updateChanges={updateChanges}
      />
    </Wrapper>
  );
};

export default MySKUs;
