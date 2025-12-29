import React, { useEffect, useState } from "react";
import { CircularProgress, Stack, Tooltip } from "@mui/material";
import { calculateSKUPriceValue } from "@/lib";
import useAssignSKUPrices from "../../hooks/useAssignSkuPrices";
import useAssignSkuNotes from "../../hooks/useAssignSkuNotes";
import useAssignSkuRelation from "../../hooks/useAssignSkuRelation";
import useUnMapSku from "../../hooks/useUnmapSku";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkuInput from "../SkuInput";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  faUpRightFromSquare,
  faUndo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  StyledTableCell,
  StyledTextField,
  StyledButtonsDiv,
  StyledSaveButtons,
} from "./styles";
const EditSKURow = (props) => {
  const {
    row,
    index,
    AurbitrageSKUMeta,
    getSKUprice,
    getOriginalSKUprice,
    formatDate,
    userRole,
    skuRealtionIdx,
    setSkuRelationIdx,
    handleRemoveSku,
    tabSwitch,
    setTabSwitch,
    setEditActive,
    displayAlert,
    updateRowByUniqueKey,
  } = props;

  useEffect(() => {
    if (tabSwitch) {
      setEditActive(false);
      setTabSwitch(false);
    }
  }, [tabSwitch]);
  const [aurbitrageSku, setAuritrageSku] = useState(row.aurbitrageSku);
  const [isSkuChange, setIsSkuChange] = useState(false);
  const [isPriceUpdated, setIsPriceUpdated] = useState(false);
  const [isNotesUpdated, setIsNotesUpdated] = useState(false);
  const [isBulkUpdated, setIsBulkUpdated] = useState(false);
  const [isShippingUpdated, setIsShippingUpdated] = useState(false);

  const {
    postSKUPricesData,
    loading: skuPriceLoading,
    error: skuPriceError,
  } = useAssignSKUPrices();
  const {
    loading: skuNotesLoading,
    error: skuNotesError,
    postData: postSkuNote,
  } = useAssignSkuNotes();
  const {
    loading: unMapkuLoading,
    error: unMapkuError,
    unMapSku,
  } = useUnMapSku();
  const {
    loading: skuRelationsLoading,
    error: skuRelationError,
    postData,
  } = useAssignSkuRelation();
  const handleAlert = (loadingState, errorState, successMessage) => {
    if (loadingState !== "loading" && loadingState !== "idle") {
      const alertObject = {
        show: true,
        error: errorState !== "",
        message: errorState || successMessage,
      };
      displayAlert(alertObject);
    }
  };
  useEffect(() => {
    handleAlert(skuPriceLoading, skuPriceError, "Price Assigned");
  }, [skuPriceError, skuPriceLoading, displayAlert]);
  useEffect(() => {
    handleAlert(skuNotesLoading, skuNotesError, "Note Assigned");
  }, [skuNotesError, skuNotesLoading, displayAlert]);
  useEffect(() => {
    handleAlert(skuRelationsLoading, skuRelationError, "Assigned SKU");
  }, [skuRelationsLoading, skuRelationError, displayAlert]);
  useEffect(() => {
    handleAlert(unMapkuLoading, unMapkuError, "Sku Unmapped");
  }, [unMapkuError, unMapkuLoading, displayAlert]);
  useEffect(() => {
    if (
      skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]?.Price
    ) {
      setIsPriceUpdated(true);
    }
    if (
      skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]?.notes
    ) {
      setIsNotesUpdated(true);
    }
    if (
      skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]
        ?.bulkDiscount
    ) {
      setIsBulkUpdated(true);
    }
    if (
      skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]
        ?.shippingNotes
    ) {
      setIsNotesUpdated(true);
    }
  }, []);
  //setting intial edit value to orginal value
  useEffect(() => {
    const priceEntry = {};
    priceEntry["bid"] = getOriginalSKUprice(row, "bid");
    priceEntry["ask"] = getOriginalSKUprice(row, "ask");
    const tempIdx = {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable] = {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable].Price =
      priceEntry;
    setSkuRelationIdx(tempIdx);
  }, []);
  const updateSkuPriceIdx = (row, value, key) => {
    //$ and % not required in order to not restrict user input
    if (
      !(
        /^\$?-?\d*(\.\d{0,2})?$/.test(value) || /^-?\d+(\.\d+)?%?$/.test(value)
      ) &&
      value !== ""
    ) {
      return;
    }
    const tempIdx = {};
    const priceEntry = {
      ...skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]
        ?.Price,
    };
    priceEntry[key] = value;
    if (key === "ask") {
      const complementPrice =
        priceEntry["bid"] || calculateSKUPriceValue(row.bidSign, row.bidNumber);
      priceEntry["bid"] = complementPrice;
    } else if (key === "bid") {
      const complementPrice =
        priceEntry["ask"] || calculateSKUPriceValue(row.askSign, row.askNumber);
      priceEntry["ask"] = complementPrice;
    }

    tempIdx[row.dealer + row.sku + row.date + row.sourceTable] =
      {
        ...skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable],
      } || {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable].Price =
      priceEntry;
    setSkuRelationIdx(tempIdx);
  };

  const isPriceValid = (value) => {
    //$ and % required
    return (
      /^\$-?\d*(\.\d{0,2})?$/.test(value) || /^-?\d+(\.\d+)?%$/.test(value)
    );
  };
  const isPriceError = (row, key) => {
    const error =
      key === "bid"
        ? skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]
            ?.Price?.bid &&
          !isPriceValid(
            skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]
              .Price.bid,
          )
        : skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]
            ?.Price?.ask &&
          !isPriceValid(
            skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]
              .Price.ask,
          );
    return error;
  };
  const updateSkuRelationIdx = (row, value) => {
    const tempIdx = {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable] =
      {
        ...skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable],
      } || {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable].sku =
      value?.label;
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable].aurbitrageSkuId =
      value?.value;

    setSkuRelationIdx(tempIdx);
  };

  const updateSkuNotesIdx = (row, value) => {
    const tempIdx = {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable] =
      {
        ...skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable],
      } || {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable].notes = value;
    if (value == "") {
      row.notes = "";
    }
    setSkuRelationIdx(tempIdx);
  };
  const updateSkuBulkIdx = (row, value) => {
    const tempIdx = {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable] =
      {
        ...skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable],
      } || {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable].bulkDiscount =
      value;
    if (value == "") {
      row.bulkDiscount = "";
    }
    setSkuRelationIdx(tempIdx);
  };
  const updateSkuShippingIdx = (row, value) => {
    const tempIdx = {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable] =
      {
        ...skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable],
      } || {};
    tempIdx[row.dealer + row.sku + row.date + row.sourceTable].shippingNotes =
      value;
    if (value == "") {
      row.shippingNotes = "";
    }
    setSkuRelationIdx(tempIdx);
  };
  const updateRow = (askPrice, bidPrice) => {
    const extractNumberAndFormat = (price, key) => {
      if (!price) return { value: null, format: "" };
      const regex = /([^\d]*)(\d+(\.\d+)?)([%$]*)/;
      const match = price.match(regex);
      return match
        ? { value: match[2], format: match[4] || match[1] }
        : { value: "0", format: "" };
    };
    const { value: askNumber, format: askFormat } = extractNumberAndFormat(
      askPrice,
      "ask",
    );
    const { value: bidNumber, format: bidFormat } = extractNumberAndFormat(
      bidPrice,
      "bid",
    );
    updateRowByUniqueKey(row.dealer, row.sku, row.section, row.sourceTable, {
      askNumber: askNumber,
      bidNumber: bidNumber,
      askFormat: askFormat,
      bidFormat: bidFormat,
    });
  };

  const assignSkuPrice = (row, price) => {
    const tempPrice = { ...price };
    if (!/[\$%]/.test(price.ask)) {
      tempPrice.ask = price.ask;
    }
    if (!/[\$%]/.test(price.bid)) {
      tempPrice.bid = price.bid;
    }
    updateRow(tempPrice.ask, tempPrice.bid);
    postSKUPricesData(
      row.sku,
      row.dealer,
      row.date,
      tempPrice.ask,
      tempPrice.bid,
      row.sourceTable,
    );
  };
  const assignSkuShippingNote = (row, notes) => {
    postSkuNote(
      row.sku,
      row.dealer,
      row.date,
      notes,
      "shipping",
      row.sourceTable,
    );
  };
  const assignSkuNotes = (row, notes) => {
    postSkuNote(row.sku, row.dealer, row.date, notes, "notes", row.sourceTable);
  };
  const assignSkuBulkNote = (row, notes) => {
    postSkuNote(row.sku, row.dealer, row.date, notes, "bulk", row.sourceTable);
  };
  const assignSkuRealtion = (row, sku, aurbitrageSkuId) => {
    if (aurbitrageSkuId == undefined) {
      unMapSku(row.sku, row.dealer, row.section);
    } else {
      postData(aurbitrageSkuId, row.sku, row.dealer, row.section);
    }
  };
  return (
    <React.Fragment>
      <StyledTableCell className="first">
        {row.sku}
        {row.dataSource && (
          <FontAwesomeIcon
            className="data-source-icon"
            icon={faUpRightFromSquare}
            onClick={() => window.open(row.dataSource, "_blank")}
          />
        )}
      </StyledTableCell>

      {userRole === "superadmin" && (
        <>
          <StyledTableCell className="center">{row?.section}</StyledTableCell>
          <StyledTableCell className="center">{row?.dealer}</StyledTableCell>
        </>
      )}

      <StyledTableCell className="width">
        <Stack>
          <StyledTextField
            width={"auto"}
            id={`bid-price-${index}`}
            value={getSKUprice(row, "bid")}
            variant="standard"
            onChange={(event) => {
              updateSkuPriceIdx(row, event.target.value, "bid");
              if (isPriceUpdated) {
                setIsPriceUpdated(!isPriceUpdated);
              }
            }}
            error={isPriceError(row, "bid")}
            helperText={isPriceError(row, "bid") && "Missing % or $"}
          />
          <Stack direction="row" alignItems="center" spacing={1} marginTop={3}>
            <span>Product Note</span>
            <StyledTextField
              width={"auto"}
              id={`notes-${index}`}
              value={
                skuRealtionIdx[
                  row.dealer + row.sku + row.date + row.sourceTable
                ]?.notes ||
                row.notes ||
                ""
              }
              variant="standard"
              onChange={(event) => {
                updateSkuNotesIdx(row, event.target.value);
                if (isNotesUpdated) {
                  setIsNotesUpdated(!isNotesUpdated);
                }
              }}
            />
          </Stack>
        </Stack>
      </StyledTableCell>
      <StyledTableCell className="width">
        <Stack>
          <StyledTextField
            width={"auto"}
            id={`ask-price-${index}`}
            value={getSKUprice(row, "ask")}
            variant="standard"
            onChange={(event) => {
              updateSkuPriceIdx(row, event.target.value, "ask");
              if (isPriceUpdated) {
                setIsPriceUpdated(!isPriceUpdated);
              }
            }}
            error={isPriceError(row, "ask")}
            helperText={isPriceError(row, "ask") && "Missing % or $"}
          />
          <Stack direction="row" alignItems="center" spacing={1} marginTop={3}>
            <span>Bulk Discount</span>
            <StyledTextField
              width={"auto"}
              id={`bulkDiscount-${index}`}
              value={
                skuRealtionIdx[
                  row.dealer + row.sku + row.date + row.sourceTable
                ]?.bulkDiscount ||
                row.bulkDiscount ||
                ""
              }
              variant="standard"
              onChange={(event) => {
                updateSkuBulkIdx(row, event.target.value);
                if (isBulkUpdated) {
                  setIsBulkUpdated(!isBulkUpdated);
                }
              }}
            />
          </Stack>
        </Stack>
      </StyledTableCell>

      <StyledTableCell>
        <Stack>
          <SkuInput
            index={index}
            value={
              skuRealtionIdx[row.dealer + row.sku + row.date + row.sourceTable]
                ?.sku ||
              row.aurbitrageSku ||
              ""
            }
            SkuOptions={AurbitrageSKUMeta?.AurbitrageSkus.map((item) => ({
              label: item.sku,
              value: item.aurbitrageSkuId,
              keyword: item.keywords,
            }))}
            skuDealer={row.dealer}
            onChange={(e, v) => {
              row.aurbitrageSku = v?.label;
              setIsSkuChange(true);
              updateSkuRelationIdx(row, v);
            }}
          />
          <Stack direction="row" alignItems="center" spacing={1} marginTop={3}>
            <span>Shipping Note</span>
            <StyledTextField
              width={"auto"}
              id={`shippingNotes-${index}`}
              value={
                skuRealtionIdx[
                  row.dealer + row.sku + row.date + row.sourceTable
                ]?.shippingNotes ||
                row.shippingNotes ||
                ""
              }
              variant="standard"
              onChange={(event) => {
                updateSkuShippingIdx(row, event.target.value);
                if (isShippingUpdated) {
                  setIsShippingUpdated(!isShippingUpdated);
                }
              }}
            />
          </Stack>
        </Stack>
      </StyledTableCell>

      <StyledTableCell className="dateCell">
        {formatDate(row.date)}
      </StyledTableCell>

      <StyledTableCell className="buttonsCell">
        <StyledButtonsDiv>
          {skuRealtionIdx[row.dealer + row.sku] && (
            <FontAwesomeIcon
              icon={faUndo}
              onClick={() => {
                setSkuRelationIdx((p) => {
                  const tempIdx = { ...p };
                  delete tempIdx[
                    row.dealer + row.sku + row.date + row.sourceTable
                  ];
                  return tempIdx;
                });
              }}
            />
          )}
          <Tooltip title="Save">
            <StyledSaveButtons
              disabled={
                skuRelationsLoading === "loading" ||
                skuPriceLoading == "loading" ||
                !skuRealtionIdx[
                  row.dealer + row.sku + row.date + row.sourceTable
                ] ||
                isPriceError(row, "ask") ||
                isPriceError(row, "bid")
              }
              onClick={() => {
                if (
                  skuRealtionIdx[
                    row.dealer + row.sku + row.date + row.sourceTable
                  ] &&
                  isSkuChange
                ) {
                  setAuritrageSku(row.aurbitrageSku);
                  assignSkuRealtion(
                    row,
                    skuRealtionIdx[
                      row.dealer + row.sku + row.date + row.sourceTable
                    ].sku,
                    skuRealtionIdx[
                      row.dealer + row.sku + row.date + row.sourceTable
                    ].aurbitrageSkuId,
                  );
                }
                if (
                  skuRealtionIdx[
                    row.dealer + row.sku + row.date + row.sourceTable
                  ]?.Price &&
                  !isPriceUpdated
                ) {
                  assignSkuPrice(
                    row,
                    skuRealtionIdx[
                      row.dealer + row.sku + row.date + row.sourceTable
                    ].Price,
                  );
                }
                if (
                  skuRealtionIdx[
                    row.dealer + row.sku + row.date + row.sourceTable
                  ].notes !== undefined &&
                  skuRealtionIdx[
                    row.dealer + row.sku + row.date + row.sourceTable
                  ].notes !== null &&
                  !isNotesUpdated
                ) {
                  assignSkuNotes(
                    row,
                    skuRealtionIdx[
                      row.dealer + row.sku + row.date + row.sourceTable
                    ].notes,
                  );
                }
                if (
                  skuRealtionIdx[
                    row.dealer + row.sku + row.date + row.sourceTable
                  ].bulkDiscount !== undefined &&
                  skuRealtionIdx[
                    row.dealer + row.sku + row.date + row.sourceTable
                  ].bulkDiscount !== null &&
                  !isBulkUpdated
                ) {
                  assignSkuBulkNote(
                    row,
                    skuRealtionIdx[
                      row.dealer + row.sku + row.date + row.sourceTable
                    ].bulkDiscount,
                  );
                }
                if (
                  skuRealtionIdx[
                    row.dealer + row.sku + row.date + row.sourceTable
                  ].shippingNotes !== undefined &&
                  skuRealtionIdx[
                    row.dealer + row.sku + row.date + row.sourceTable
                  ].shippingNotes !== null &&
                  !isShippingUpdated
                ) {
                  assignSkuShippingNote(
                    row,
                    skuRealtionIdx[
                      row.dealer + row.sku + row.date + row.sourceTable
                    ].shippingNotes,
                  );
                }
              }}
            >
              <SaveIcon className="saveIconColor" />
              {skuRealtionIdx[
                row.dealer + row.sku + row.date + row.sourceTable
              ] &&
                (skuRelationsLoading === "loading" ||
                  skuNotesLoading === "loading" ||
                  skuPriceLoading == "loading") && (
                  <CircularProgress
                    style={{
                      height: "1em",
                      width: "1em",
                    }}
                  />
                )}
            </StyledSaveButtons>
          </Tooltip>
          <Tooltip title="Delete">
            <FontAwesomeIcon
              size="xl"
              icon={faTrash}
              onClick={() => {
                const confirmDelete = window.confirm(
                  `Are you sure you want to delete \n"${row.sku}"`,
                );
                if (confirmDelete) {
                  handleRemoveSku(row.pricelistId);
                }
              }}
            />
          </Tooltip>

          <Tooltip title="Close">
            <CancelOutlinedIcon
              className="cancelIcon"
              onClick={() => {
                setEditActive((prev) => !prev);
                row.aurbitrageSku = aurbitrageSku;
              }}
            />
          </Tooltip>
        </StyledButtonsDiv>
      </StyledTableCell>
    </React.Fragment>
  );
};

export default EditSKURow;
