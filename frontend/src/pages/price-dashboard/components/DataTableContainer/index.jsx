import { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import DataTable from "../DataTable";
import { TableContainer, TableWrapper } from "./styles";
import { useLocation } from "react-router-dom";

const DataTableContainer = () => {
  const {
    pricingDataView,
    dataCount,
    skuCount,
    pricingDataLoading,
    saveTypeFilter,
    setSaveTypeFilter,
  } = useContext(PricingDashboardContext);
  const { pathname } = useLocation();
  const [message, setMessage] = useState(
    "We have not found any products that match your search.",
  );

  const filterNullPrices = (pricingData) => {
    return pricingData
      ?.map((category) => ({
        ...category,
        data: category.data
          .map((product) => ({
            ...product,
            ask: Array.isArray(product.ask)
              ? product.ask.filter((entry) => entry.price !== null)
              : [],
            bid: Array.isArray(product.bid)
              ? product.bid.filter((entry) => entry.price !== null)
              : [],
          }))
          .filter(
            (product) => product.ask.length > 0 || product.bid.length > 0,
          ),
      }))
      .filter((category) => category.data.length > 0);
  };

  useEffect(() => {
    if (pathname == "/dashboard/pricing/favorites") {
      setSaveTypeFilter("favorite");
      setMessage("No products have been added to the list");
    } else if (pathname == "/dashboard/pricing/shortlist") {
      setSaveTypeFilter("shortlist");
      setMessage("No products have been added to the list");
    } else if (pathname == "/dashboard/pricing" && saveTypeFilter !== "") {
      setSaveTypeFilter("");
      setMessage("We have not found any products that match your search.");
    }
  }, [pathname]);

  if (pricingDataLoading === "loading") {
    return (
      <TableContainer className="pricing-table-scroller">
        <CircularProgress color="inherit" />
      </TableContainer>
    );
  }
  if (dataCount === 0 || dataCount - skuCount == dataCount) {
    return (
      <>
        <TableContainer className="pricing-table-scroller">
          <p>{message}</p>
        </TableContainer>
      </>
    );
  }

  return (
    <TableWrapper className="pricing-table-scroller">
      <table>
        <tbody>
          {filterNullPrices(pricingDataView)?.map((category) => (
            <tr key={category.header}>
              <DataTable
                title={category.header}
                category={category.category}
                rowData={category.data}
                isSingleSection={pricingDataView.length === 1}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default DataTableContainer;
