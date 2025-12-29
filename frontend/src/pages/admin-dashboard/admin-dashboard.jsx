import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "@/components/SearchBar";
import { FilterGroup } from "@/components/FilterGroup";
import { LinearProgress } from "@mui/material";
import DateRangePicker from "@/components/DateRangePicker";
import useGetSkuMappingSkus from "./hooks/useGetSkuMapping";
import useDistinctAurbitrageSkus from "./hooks/useDistinctAurbitrageSkus";
import useGetAurbitrageSKU from "./hooks/useGetAurbitrageSKU";
import { useNavigate } from "react-router-dom";
import MapSkuTable from "./pages/map-sku";
import AddSquare from "@/assets/images/add-square.svg";

import SKUCataloge from "./pages/sku-cataloge-table";
import UserManagment from "./pages/UserManagment/UserManagment";
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
} from "./styles";
import ApiSkuTable from "./pages/api-sku/ApiSkuTable";

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

const AdminDashboard = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { token, logout, userRole, userName } = useAuth();
  const navigate = useNavigate();
  const [skuTypeFilter, setSkuTypeFilter] = React.useState("");
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

  // Handle route-based tab selection
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/settings/user-management")) {
      setTabValue(2); // User Management tab
    } else if (currentPath.includes("/settings/active-skus")) {
      setTabValue(0); // Active SKUs tab
    } else if (currentPath.includes("/settings/catalog")) {
      setTabValue(1); // SKU Catalog tab
    }
  }, []);

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

  const [apiSkus, setApiSkus] = useState([]);

  const getActiveOptions = () => {
    let options = [];
    if (tabValue === 0) {
      options = skuMapping?.map((u) => ({ sku: u.sku, keywords: u.keywords }));
    } else if (tabValue === 1) {
      options = aurbitrageSKU?.map((u) => ({
        sku: u.aurbitrageSku,
        keywords: u.keywords,
      }));
    } else if (tabValue === 3) {
      options = apiSkus?.map((u) => ({
        sku: u.sku,
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
      <StyledHeader>
        <StyledHeading>Admin Dashboard</StyledHeading>
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
      </StyledHeader>

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
            <OptionButton
              isSelected={tabValue === 3}
              onClick={() => handleTabChange(3)}
              variant="outlined"
            >
              API SKUs
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
            <UserManagment />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={3}>
            <ApiSkuTable
              setApiSkus={setApiSkus}
              searchInput={searchInput}
              dealerFilter={dealerFilter}
            />
          </CustomTabPanel>
        </>
      )}
      {userRole == "admin" && (
        <CustomTabPanel value={tabValue} index={1}>
          <UserManagment />
        </CustomTabPanel>
      )}
    </StyledDiv>
  );
};

export default AdminDashboard;
