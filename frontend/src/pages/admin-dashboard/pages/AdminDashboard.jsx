import React from "react";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "@/components/SearchBar";
import { FilterGroup } from "@/components/FilterGroup";
import { LinearProgress, Tabs, Tab } from "@mui/material";
import DateRangePicker from "@/components/DateRangePicker";

import useGetSkuMappingSkus from "../hooks/useGetSkuMapping";
import useDistinctAurbitrageSkus from "../hooks/useDistinctAurbitrageSkus";
import useGetAurbitrageSKU from "@/pages/admin-dashboard/hooks/useGetAurbitrageSKU";
import { useAuth } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import MapSkuTable from "../pages/map-sku";

import SKUCataloge from "../pages/sku-cataloge-table";
import ApproveUsers from "./UserManagment/UserManagment";
import LoginButton from "@/components/LoginButton";

const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "98%",
  color: theme.typography.color.primary,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 4),
  textAlign: "center",
  overflowY: "scroll",
  "& .dashboardHeader": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: 10,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },

  "& .label": {
    height: "32px",
    display: "flex",
    padding: "0 12px",
    backgroundColor: "#C0C0C0",
    borderRadius: "5px",
    fontWeight: 600,
    alignItems: "center",
  },
}));

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

function a11yProps(index) {
  return {
    id: `admin-tab-${index}`,
    "aria-controls": `admin-tabpanel-${index}`,
  };
}

const AdminDashboard = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { token, logout, userRole, userName, dealerName } = useAuth();
  const navigate = useNavigate();

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
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

  if (loading === "loading" || aurbitrageSKULoading === "loading") {
    return (
      <StyledDiv>
        <div style={{ width: "70vw", margin: "30vh auto" }}>
          <h2> Fetching Data </h2>
          <LinearProgress />
        </div>
      </StyledDiv>
    );
  }

  if (loading === "failed" || aurbitrageSKULoading === "failed") {
    return (
      <StyledDiv>
        <div style={{ width: "100%", margin: "30vh auto" }}>
          <h2>
            <FontAwesomeIcon size="xl" icon={faTriangleExclamation} />
            &nbsp; Oops, failed to fetch data!
          </h2>
        </div>
      </StyledDiv>
    );
  }
  return (
    <StyledDiv>
      <div className="dashboardHeader">
        <h2 style={{ fontSize: "2em", margin: "5px" }}>Admin Dashboard</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <div className="label">
            <div style={{ fontSize: "0.8em", cursor: "pointer" }}>
              Unmapped Skus: {skuMapping.filter((s) => !s.aurbitrageSku).length}
            </div>
          </div>
          <DateRangePicker
            onChange={(date) => {
              setStartDate(date?.start);
              setEndDate(date?.end);
            }}
          />
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            options={getActiveOptions()}
          />
          <FilterGroup
            options={AurbitrageSKUMeta.Dealers}
            filters={dealerFilter}
            title="Dealer"
            onChange={setDealerFilter}
          />
          <LoginButton />
        </div>
      </div>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Admin tabs"
        sx={{
          color: "#fff",
        }}
        centered
      >
        <Tab
          label="Active SKUs"
          sx={{
            color: "#fff",
          }}
          {...a11yProps(0)}
        />
        {userRole === "superadmin" && (
          <>
            <Tab
              label="SKU Cataloge"
              {...a11yProps(1)}
              sx={{
                color: "#fff",
              }}
            />
          </>
        )}

        <Tab
          label="User Management"
          {...a11yProps(1)}
          sx={{
            color: "#fff",
          }}
        />
      </Tabs>
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
          dealerName={dealerName}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <SKUCataloge
          dealerFilter={dealerFilter}
          searchInput={searchInput}
          AurbitrageSKUMeta={AurbitrageSKUMeta}
          aurbitrageSKU={aurbitrageSKU}
        />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <ApproveUsers />
      </CustomTabPanel>
    </StyledDiv>
  );
};

export default AdminDashboard;
