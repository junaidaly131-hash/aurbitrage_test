import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "@/components/SearchBar/SearchFilter";
import { LinearProgress } from "@mui/material";
import useDistinctAurbitrageSkus from "../../hooks/useDistinctAurbitrageSkus";
import useGetAurbitrageSKU from "../../hooks/useGetAurbitrageSKU";
import { useNavigate } from "react-router-dom";
import MapSkuTable from "../map-sku";
import AddSquare from "@/assets/images/add-square.svg";

import { useAuth } from "@/Context/AuthContext";
import {
  StyledDiv,
  StyledFetchinData,
  StyledButton,
  StyledFailed,
} from "../../styles";
import useGetSkuMappingSkus from "../../hooks/useGetSkuMapping";
import {
  Filter,
  Header,
  Left,
  Right,
  Tab,
  TitleTypography,
  Warning,
} from "./styles";
import MenuIcon from "@/components/Icons/MenuIcon";
import MySkuTable from "../map-sku/my-sku-table";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
      style={{ height: "84%", overflow: "hidden" }}
    >
      {value === index && children}
    </div>
  );
}

const ActiveSKUs = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { token, logout, userRole, userName } = useAuth();
  const navigate = useNavigate();
  const [skuTypeFilter, setSkuTypeFilter] = React.useState("Active");
  const [createSKU, setCreateSKU] = React.useState(false);
  const [isManual, setIsManual] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

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
    data: skuMapping,
    loading,
    loginAgain,
    fetchSkuMapping,
  } = useGetSkuMappingSkus();

  if (loginAgain) {
    logout();
    navigate("/login");
  }

  const { data: AurbitrageSKUMeta, fetchDistinctAurbitrageSkus } =
    useDistinctAurbitrageSkus();

  const {
    data: aurbitrageSKU,
    loading: aurbitrageSKULoading,
    fetchAurbitrageSKU,
  } = useGetAurbitrageSKU();

  const updateSKUData = () => {
    fetchSkuMapping();
    fetchDistinctAurbitrageSkus();
    fetchAurbitrageSKU();
  };
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const [searchInput, setSearchInput] = React.useState("");
  const [dealerFilter, setDealerFilter] = React.useState([]);
  const [createSKURelation, setCreateSKURelation] = React.useState(false);

  const getActiveOptions = () => {
    let options = [];
    if (tabValue === 0) {
      options = skuMapping?.map((u) => ({ sku: u.sku, keywords: u.keywords }));
    } else if (tabValue === 1) {
      options = aurbitrageSKU?.map((u) => ({
        sku: u.aurbitrageSku,
        keywords: u.keywords,
      }));
    }
    return options;
  };

  const handleTabChange = (newValue) => {
    if (newValue != 0) {
      setIsManual(false);
    }
    setTabValue(newValue);
  };

  if (loading === "loading" || aurbitrageSKULoading === "loading") {
    return (
      <StyledDiv>
        <StyledFetchinData>
          <h2> Fetching Data </h2>
          <LinearProgress />
        </StyledFetchinData>
      </StyledDiv>
    );
  }

  if (loading === "failed" || aurbitrageSKULoading === "failed") {
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
  return (
    <StyledDiv>
      <Header>
        <Left>
          <TitleTypography variant="title">Active SKU&apos;s</TitleTypography>
        </Left>
        <Right>
          <Tab isSelected={tabValue === 0} onClick={() => handleTabChange(0)}>
            Price Sheet SKU&apos;s
          </Tab>
          <Tab isSelected={tabValue === 1} onClick={() => handleTabChange(1)}>
            User Added SKU&apos;s
          </Tab>
        </Right>
      </Header>
      <Header>
        <Left>
          <Filter>
            Filter <MenuIcon />
          </Filter>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            options={getActiveOptions()}
            maxWidth="300px"
          />
        </Left>

        <Tab
          danger
          isSelected={skuTypeFilter === "Unmapped"}
          onClick={() => {
            setSkuTypeFilter(
              skuTypeFilter !== "Unmapped" ? "Unmapped" : "Active",
            );
          }}
        >
          <Warning size={24} />
          Unmapped Skus: {skuMapping.filter((s) => !s.aurbitrageSku).length}
        </Tab>
      </Header>

      <div className="dashboardHeader">
        {(isManual || tabValue == 1) && (
          <StyledButton
            onClick={() => {
              if (tabValue == 0) {
                setCreateSKU((prev) => !prev);
              }
              if (tabValue == 1) {
                setCreateSKURelation((prev) => !prev);
              }
            }}
          >
            New SKU
            <img
              loading="lazy"
              style={{ marginLeft: "10px" }}
              src={AddSquare}
              alt=""
            />
          </StyledButton>
        )}
      </div>

      <CustomTabPanel value={tabValue} index={0}>
        <MapSkuTable
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
          setIsCustom={setIsCustom}
          isCustom={isCustom}
          onEdit={onEdit}
        />
      </CustomTabPanel>
      {userRole == "superadmin" && (
        <>
          <CustomTabPanel value={tabValue} index={1}>
            <MySkuTable
              dealerFilter={dealerFilter}
              searchInput={searchInput}
              AurbitrageSKUMeta={AurbitrageSKUMeta}
              aurbitrageSKU={aurbitrageSKU}
              createSKURelation={createSKURelation}
              setCreateSKURelation={setCreateSKURelation}
            />
          </CustomTabPanel>
        </>
      )}
    </StyledDiv>
  );
};

export default ActiveSKUs;
