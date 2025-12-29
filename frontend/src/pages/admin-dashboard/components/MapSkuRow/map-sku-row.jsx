import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditSKURow from "../EditSkuRow/edit-sku-row";
import { calculateSKUPriceValue } from "@/lib";
import { StyledTableCell, StyledButton, StyledDivider } from "./styles";
import AttributeTooltip from "./attribute-tool-tip";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Link, Tooltip, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SKUCell = ({ row, showAggregates }) => {
  const entries = showAggregates
    ? [row, ...(row.aggregateEntries?.length > 0 ? row.aggregateEntries : [])]
    : [row];

  return (
    <StyledTableCell className="left">
      <Stack spacing={0}>
        {entries.map((entry, index) => (
          <Stack key={`${entry.sku}-${index}`} spacing={0}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="flex-start"
              height="45px"
            >
              {entry.sku}
              <Tooltip leaveDelay={200} title="Data source">
                <Link href={entry?.dataSource} className="text-white">
                  <OpenInNewRoundedIcon className="data-source-icon" />
                </Link>
              </Tooltip>
            </Stack>
            {showAggregates && <StyledDivider />}
          </Stack>
        ))}
      </Stack>
    </StyledTableCell>
  );
};

const SectionCell = ({ row, showAggregates }) => {
  const entries = showAggregates
    ? [row, ...(row.aggregateEntries?.length > 0 ? row.aggregateEntries : [])]
    : [row];

  return (
    <StyledTableCell className="center">
      <Stack spacing={0}>
        {entries.map((entry, index) => (
          <Stack key={`${entry.section}-${index}`} spacing={0}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              height="45px"
            >
              {entry?.section}
            </Stack>
            {showAggregates && <StyledDivider />}
          </Stack>
        ))}
      </Stack>
    </StyledTableCell>
  );
};

const DealerCell = ({ row, showAggregates, isReceiverDealer }) => {
  const entries = showAggregates
    ? [row, ...(row.aggregateEntries?.length > 0 ? row.aggregateEntries : [])]
    : [row];

  return (
    <StyledTableCell className="center">
      <Stack spacing={0}>
        {entries.map((entry, index) => (
          <Stack key={`${entry.dealer}-${index}`} spacing={0}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              height="45px"
            >
              {isReceiverDealer ? entry?.receiverDealerName : entry?.dealer}
            </Stack>
            {showAggregates && <StyledDivider />}
          </Stack>
        ))}
      </Stack>
    </StyledTableCell>
  );
};
const NotesCell = ({ row, showAggregates }) => {
  const entries = showAggregates
    ? [row, ...(row.aggregateEntries?.length > 0 ? row.aggregateEntries : [])]
    : [row];

  return (
    <StyledTableCell className="center">
      <Stack spacing={0}>
        {entries.map((entry, index) => (
          <Stack key={`${entry.dealer}-${index}`} spacing={0}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              height="45px"
            >
              {entry?.notes || "--"}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </StyledTableCell>
  );
};

const PriceCell = ({ row, priceType, getSKUprice, showAggregates }) => {
  const entries = showAggregates
    ? [row, ...(row.aggregateEntries?.length > 0 ? row.aggregateEntries : [])]
    : [row];

  return (
    <StyledTableCell className="center">
      <Stack spacing={0}>
        {entries.map((entry, index) => (
          <Stack key={`${entry.sku}-${priceType}-${index}`} spacing={0}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              height="45px"
            >
              {getSKUprice(entry, priceType)}
            </Stack>
            {showAggregates && <StyledDivider />}
          </Stack>
        ))}
      </Stack>
    </StyledTableCell>
  );
};

const AurbitrageSKUCell = ({ row, showAggregates }) => {
  const entries = showAggregates
    ? [row, ...(row.aggregateEntries?.length > 0 ? row.aggregateEntries : [])]
    : [row];

  return (
    <StyledTableCell className="center">
      <Stack spacing={0}>
        {entries.map((entry, index) => (
          <Stack key={`${entry.aurbitrageSku}-${index}`} spacing={0}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              height="45px"
            >
              <li>
                {entry.aurbitrageSku}
                {entry.aurbitrageSku && <AttributeTooltip row={entry} />}
              </li>
            </Stack>
            {showAggregates && <StyledDivider />}
          </Stack>
        ))}
      </Stack>
    </StyledTableCell>
  );
};

const DateCell = ({ row, formatDate, showAggregates }) => {
  const entries = showAggregates
    ? [row, ...(row.aggregateEntries?.length > 0 ? row.aggregateEntries : [])]
    : [row];

  return (
    <StyledTableCell className="right">
      <Stack spacing={0}>
        {entries.map((entry, index) => (
          <Stack key={`${entry.date}-${index}`} spacing={0}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
              height="45px"
            >
              {formatDate(entry.date)}
            </Stack>
            {showAggregates && <StyledDivider />}
          </Stack>
        ))}
      </Stack>
    </StyledTableCell>
  );
};

const EditCell = ({ row, onEdit, showAggregates }) => {
  const entries = showAggregates
    ? [row, ...(row.aggregateEntries?.length > 0 ? row.aggregateEntries : [])]
    : [row];

  return (
    <StyledTableCell>
      <Stack spacing={0}>
        {entries.map((entry, index) => (
          <Stack key={`${entry.sku}-edit-${index}`} spacing={0}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              height="45px"
            >
              <FontAwesomeIcon
                size="xl"
                className="edit-icon"
                icon={faEdit}
                onClick={() => {
                  onEdit(entry);
                }}
              />
            </Stack>
            {showAggregates && <StyledDivider />}
          </Stack>
        ))}
      </Stack>
    </StyledTableCell>
  );
};

const AggregateToggleCell = ({ row, showAggregates, onToggleAggregates }) => {
  if (!row.aggregateEntries?.length) return <StyledTableCell />;

  return (
    <StyledTableCell>
      <StyledButton
        variant="outlined"
        size="small"
        onClick={onToggleAggregates}
        startIcon={showAggregates ? <VisibilityOffIcon /> : <VisibilityIcon />}
        sx={{
          marginLeft: "10px",
        }}
      >
        {row.aggregateEntries.length}
      </StyledButton>
    </StyledTableCell>
  );
};

const MapSKURow = (props) => {
  const {
    row,
    index,
    AurbitrageSKUMeta,
    formatDate,
    userRole,
    skuRealtionIdx,
    setSkuRelationIdx,
    handleRemoveSku,
    setTabSwitch,
    tabSwitch,
    displayAlert,
    updateRowByUniqueKey,
    onEdit,
    isCustom,
  } = props;

  const [editState, setEditState] = React.useState({});
  const [showAggregates, setShowAggregates] = React.useState({});

  useEffect(() => {
    if (tabSwitch) {
      setEditState({});
    }
  }, [tabSwitch]);

  const getRowKey = (row) => `${row.sku}-${row.dealer}-${row.section}`;

  const handleEditClick = (rowKey) => {
    setEditState((prevState) => ({
      ...prevState,
      [rowKey]: !prevState[rowKey],
    }));
  };

  const handleToggleAggregates = (rowKey) => {
    setShowAggregates((prevState) => ({
      ...prevState,
      [rowKey]: !prevState[rowKey],
    }));
  };

  const getSKUprice = (row, key) => {
    const format = key === "bid" ? row.bidFormat : row.askFormat;
    // Get the index value from skuRelationIdx
    const priceKey = `${row.dealer}${row.sku}${row.date}${row.sourceTable}`;
    const indexValue =
      key === "ask"
        ? skuRealtionIdx[priceKey]?.Price?.ask
        : skuRealtionIdx[priceKey]?.Price?.bid;
    if (skuRealtionIdx[priceKey]?.Price) {
      if (indexValue != undefined) {
        return indexValue;
      } else {
        return "";
      }
    }
    const originalPrice =
      key === "ask"
        ? calculateSKUPriceValue(row.askSign, row.askNumber)
        : calculateSKUPriceValue(row.bidSign, row.bidNumber);
    return (
      (format === "$" ? "$" : "") +
      (originalPrice || originalPrice === 0 ? originalPrice : "") +
      (format === "%" ? "%" : "")
    );
  };

  const getOriginalSKUprice = (row, key) => {
    const format = key === "bid" ? row.bidFormat : row.askFormat;
    // Calculate the original price
    const originalPrice =
      key === "ask"
        ? calculateSKUPriceValue(row.askSign, row.askNumber)
        : calculateSKUPriceValue(row.bidSign, row.bidNumber);
    return (
      (format === "$" ? "$" : "") +
      (originalPrice || originalPrice === 0 ? originalPrice : "") +
      (format === "%" ? "%" : "")
    );
  };

  const rowKey = getRowKey(row);
  const currentShowAggregates = showAggregates[rowKey] || false;

  return !editState[rowKey] ? (
    <>
      <SKUCell row={row} showAggregates={currentShowAggregates} />

      {userRole === "superadmin" && (
        <>
          <SectionCell row={row} showAggregates={currentShowAggregates} />
          <DealerCell row={row} showAggregates={currentShowAggregates} />
        </>
      )}

      <PriceCell
        row={row}
        priceType="bid"
        getSKUprice={getSKUprice}
        showAggregates={currentShowAggregates}
      />

      <PriceCell
        row={row}
        priceType="ask"
        getSKUprice={getSKUprice}
        showAggregates={currentShowAggregates}
      />

      <AurbitrageSKUCell row={row} showAggregates={currentShowAggregates} />

      {userRole === "superadmin" && isCustom && (
        <DealerCell
          row={row}
          showAggregates={currentShowAggregates}
          isReceiverDealer={true}
        />
      )}

      <DateCell
        row={row}
        formatDate={formatDate}
        showAggregates={currentShowAggregates}
      />

      <EditCell
        row={row}
        onEdit={onEdit}
        showAggregates={currentShowAggregates}
      />

      {userRole === "superadmin" && isCustom && (
        <AggregateToggleCell
          row={row}
          showAggregates={currentShowAggregates}
          onToggleAggregates={() => handleToggleAggregates(rowKey)}
        />
      )}
    </>
  ) : (
    <EditSKURow
      row={row}
      index={index}
      AurbitrageSKUMeta={AurbitrageSKUMeta}
      getSKUprice={getSKUprice}
      getOriginalSKUprice={getOriginalSKUprice}
      formatDate={formatDate}
      userRole={userRole}
      skuRealtionIdx={skuRealtionIdx}
      setSkuRelationIdx={setSkuRelationIdx}
      handleRemoveSku={handleRemoveSku}
      tabSwitch={tabSwitch}
      setTabSwitch={setTabSwitch}
      setEditActive={() => handleEditClick(rowKey)}
      displayAlert={displayAlert}
      updateRowByUniqueKey={updateRowByUniqueKey}
    />
  );
};

export {
  SKUCell,
  SectionCell,
  DealerCell,
  PriceCell,
  AurbitrageSKUCell,
  DateCell,
  EditCell,
  AggregateToggleCell,
  NotesCell,
};

export default MapSKURow;
