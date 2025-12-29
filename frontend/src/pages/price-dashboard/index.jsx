/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useContext } from "react";
import { Grid } from "@mui/material";
import DataTableContainer from "./components/DataTableContainer";
import DashboardActions from "./components/DashboardActions";
import DisclaimerModal from "./components/DisclaimerModal";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import { TableWrapper, Wrapper } from "./styles";

const PriceDashboard = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    const disclaimerAcknowledged =
      sessionStorage.getItem("disclaimerAcknowledged") === "true";

    if (!disclaimerAcknowledged) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("disclaimerAcknowledged", "true");
    setOpen(false);
  };

  const ref = useRef();
  const [height, setHeight] = useState(56);
  useEffect(() => {
    const element = ref.current;

    const updateHeight = () => {
      if (element) {
        const newHeight = element.getBoundingClientRect().height;
        setHeight(newHeight);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    if (element) {
      resizeObserver.observe(element);
      updateHeight();
    }

    return () => {
      if (element) resizeObserver.unobserve(element);
    };
  }, []);

  return (
    <>
      <Wrapper container ref={anchorRef} header={height}>
        <DisclaimerModal
          open={open}
          anchorEl={anchorRef.current}
          onClose={handleClose}
        />
        <DashboardActions ref={ref} />
        <Grid item xs={12}>
          <TableWrapper header={height}>
            <DataTableContainer />
          </TableWrapper>
        </Grid>
      </Wrapper>
    </>
  );
};

export default PriceDashboard;
