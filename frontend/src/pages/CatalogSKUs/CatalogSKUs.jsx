import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "@/components/SearchBar";
import { LinearProgress } from "@mui/material";
import useDistinctAurbitrageSkus from "../admin-dashboard/hooks/useDistinctAurbitrageSkus";
import useGetAurbitrageSKU from "../admin-dashboard/hooks/useGetAurbitrageSKU";
import { useNavigate } from "react-router-dom";

import SKUCataloge from "../admin-dashboard/pages/sku-cataloge-table";
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
  Title,
  Wrapper,
  Left,
  Filters,
} from "./styles";
import MenuIcon from "@/components/Icons/MenuIcon";
import { PlusCircle } from "phosphor-react";
import { Close } from "@mui/icons-material";
import { FilterGroup } from "@/components/FilterGroup";
import AddCatalogSKU from "@/components/AddSKU/AddCatalogSKU";
import AppSnackbar from "@/components/commom/AppSnackBar";

const CatalogSKUs = () => {
  const { token, logout, userRole, userName, dealerName } = useAuth();
  const [filterView, setFilterView] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const [dealerFilter, setDealerFilter] = React.useState([]);
  const [createSKURelation, setCreateSKURelation] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [showAlert, setShowAlert] = useState({ show: false, error: false });

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

  const { data: AurbitrageSKUMeta } = useDistinctAurbitrageSkus();

  const { data: originalAurbitrageSKU, loading: aurbitrageSKULoading } =
    useGetAurbitrageSKU();

  const [aurbitrageSKU, setAurbitrageSKU] = React.useState([]);

  React.useEffect(() => {
    if (originalAurbitrageSKU) {
      setAurbitrageSKU(originalAurbitrageSKU);
    }
  }, [originalAurbitrageSKU]);

  const updateChanges = (data) => {
    const updatedSKUs = aurbitrageSKU.map((item) => {
      if (item.aurbitrageSku === data.aurbitrageSku) {
        return data;
      }
      return item;
    });

    setAurbitrageSKU(updatedSKUs);
  };

  const onEdit = (data) => {
    setEditData(data);
    setCreateSKURelation(true);
  };

  const toggleFilterView = () => {
    setFilterView((prev) => !prev);
  };

  const getActiveOptions = () => {
    let options = [];

    options = aurbitrageSKU?.map((u) => ({
      sku: u.aurbitrageSku,
      keywords: u.keywords,
    }));
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

  if (aurbitrageSKULoading === "loading") {
    return (
      <StyledDiv>
        <StyledFetchinData>
          <h2> Fetching Data </h2>
          <LinearProgress />
        </StyledFetchinData>
      </StyledDiv>
    );
  }

  if (aurbitrageSKULoading === "failed") {
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
        <Title>Catalog SKUs</Title>
      </Header>
      <AddCatalogSKU
        createSKU={createSKURelation}
        setCreateSKU={setCreateSKURelation}
        open={createSKURelation}
        formatDate={formatDate}
        type={"header"}
        AurbitrageSKUMeta={AurbitrageSKUMeta}
        userRole={userRole}
        dealerName={dealerName}
        editData={editData}
        setEditData={setEditData}
        updateChanges={updateChanges}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      <Header>
        <Left>
          <AddButton
            active
            onClick={() => {
              setCreateSKURelation((prev) => !prev);
            }}
          >
            <PlusCircle size={32} />
            <span>Add New SKU</span>
          </AddButton>
          <SearchFilter>
            <Filter onClick={toggleFilterView}>
              Filter {filterView ? <Close /> : <MenuIcon />}
            </Filter>
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
        </Left>
      </Header>

      <SKUCataloge
        dealerFilter={dealerFilter}
        searchInput={searchInput}
        AurbitrageSKUMeta={AurbitrageSKUMeta}
        aurbitrageSKU={aurbitrageSKU}
        createSKURelation={false}
        setCreateSKURelation={setCreateSKURelation}
        onEdit={onEdit}
        updateChanges={updateChanges}
      />
      <AppSnackbar
        open={showAlert.show}
        onClose={() => setShowAlert({ show: false, error: false })}
        message={
          showAlert.error
            ? showAlert.errorMessage
            : showAlert.message || "SKU Created Successfully"
        }
        severity={showAlert.error ? "error" : "success"}
      />
    </Wrapper>
  );
};

export default CatalogSKUs;
