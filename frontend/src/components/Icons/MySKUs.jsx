import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "@/components/SearchBar";
import { FilterGroup } from "@/components/FilterGroup";
import { LinearProgress } from "@mui/material";
import DateRangePicker from "@/components/DateRangePicker";
import useGetSkuMappingSkus from "../admin-dashboard/hooks/useGetSkuMapping";
import useDistinctAurbitrageSkus from "../admin-dashboard/hooks/useDistinctAurbitrageSkus";
import useGetAurbitrageSKU from "../admin-dashboard/hooks/useGetAurbitrageSKU";
import { useNavigate } from "react-router-dom";
import MySkuTable from "../admin-dashboard/pages/map-sku/my-sku-table";
import AddSquare from "@/assets/images/add-square.svg";

import SKUCataloge from "../admin-dashboard/pages/sku-cataloge-table";
import ApproveUsers from "../admin-dashboard/pages/approveUser/approveUser";
import { useAuth } from "@/Context/AuthContext";
import {
  StyledDiv,
  StyledHeader,
  StyledHeading,
  StyledFetchinData,
  StyledButton,
  StyledBox,
  StyledFailed,
  OptionButton,
} from "../admin-dashboard/styles";
import { Filter, Header, Tab, Tabs, Title, Wrapper } from "./styles";

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

const MySKUs = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { token, logout, userRole, userName } = useAuth();
  const navigate = useNavigate();
  const [skuTypeFilter, setSkuTypeFilter] = React.useState("");
  const [createSKU, setCreateSKU] = React.useState(false);
  const [isManual, setIsManual] = useState(false);
  const [tabSwitch, setTabSwitch] = React.useState(false);

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
    <Wrapper>
      <Header>
        <Title>My SKUs</Title>
        <Tabs>
          <Tab active={tabValue === 0} onClick={() => handleTabChange(0)}>
            Active SKUs
          </Tab>
          <Tab active={tabValue === 1} onClick={() => handleTabChange(1)}>
            SKU Catalog
          </Tab>
        </Tabs>
      </Header>
      <Header>
        <Filter>Filter </Filter>
        {tabValue != 2 && (
          <>
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              options={getActiveOptions()}
            />
            {userRole == "superadmin" && (
              <DateRangePicker
                onChange={(date) => {
                  setStartDate(date?.start);
                  setEndDate(date?.end);
                }}
              />
            )}
            {userRole == "superadmin" && (
              <FilterGroup
                options={AurbitrageSKUMeta.Dealers}
                filters={dealerFilter}
                title="Dealers"
                onChange={setDealerFilter}
              />
            )}
          </>
        )}
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

        <OptionButton
          isSelected={tabValue === 0}
          onClick={() => handleTabChange(0)}
          variant="outlined"
        >
          Active SKUs
        </OptionButton>
        {userRole === "superadmin" ? (
          <>
            <OptionButton
              isSelected={tabValue === 1}
              onClick={() => handleTabChange(1)}
              variant="outlined"
            >
              SKU Catalog
            </OptionButton>
            <OptionButton
              isSelected={tabValue === 2}
              onClick={() => handleTabChange(2)}
              variant="outlined"
            >
              User Management
            </OptionButton>
          </>
        ) : (
          <OptionButton
            isSelected={tabValue === 1}
            onClick={() => handleTabChange(1)}
            variant="outlined"
          >
            User Management
          </OptionButton>
        )}

        <StyledBox variant="outlined">
          Unmapped Skus: {skuMapping.filter((s) => !s.aurbitrageSku).length}
        </StyledBox>
      </div>

      <CustomTabPanel value={tabValue} index={0}>
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
        />
      </CustomTabPanel>
      {userRole == "superadmin" && (
        <>
          <CustomTabPanel value={tabValue} index={1}>
            <SKUCataloge
              dealerFilter={dealerFilter}
              searchInput={searchInput}
              AurbitrageSKUMeta={AurbitrageSKUMeta}
              aurbitrageSKU={aurbitrageSKU}
              createSKURelation={createSKURelation}
              setCreateSKURelation={setCreateSKURelation}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            <ApproveUsers />
          </CustomTabPanel>
        </>
      )}
      {userRole == "admin" && (
        <CustomTabPanel value={tabValue} index={1}>
          <ApproveUsers />
        </CustomTabPanel>
      )}
    </Wrapper>
  );
};

export default MySKUs;
