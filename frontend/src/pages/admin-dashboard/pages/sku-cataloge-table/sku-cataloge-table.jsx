import React from "react";
import VirtualizedTable from "@/components/VirtualizedTable";
import { TableRow, TableCell, Stack } from "@mui/material";
import CreateAurbitrageSKURow from "./CreateAurbitrageSku/create-aurbitrage-sku";
import SKUCatalogeRow from "./SkuCatalogRow/sku-cataloge-row";
import Fuse from "fuse.js";
import { Row, StyledStack, StyledTableCell } from "./styles";
import CreateAurbitrageSKU from "./CreateAurbitrageSku/create-aurbitrage-sku";
const SKUCataloge = (props) => {
  const {
    dealerFilter,
    searchInput,
    aurbitrageSKU,
    AurbitrageSKUMeta,
    createSKURelation,
    setCreateSKURelation,
    onEdit,
    updateChanges,
  } = props;

  const [view, setView] = React.useState([]);
  const [showActive, setShowActive] = React.useState(false);

  const fuse = React.useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      keys: ["aurbitrageSku", "keywords"],
      threshold: 0.3,
      tokenize: true,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 10000,
    };
    const keysArray = aurbitrageSKU;
    return new Fuse(keysArray, fuseOptions);
  }, [aurbitrageSKU]);

  const viewFilter = React.useCallback(
    (item) => {
      return (
        (dealerFilter.length == 0 || dealerFilter.includes(item.dealer)) &&
        (!showActive || item.Active)
      );
    },
    [dealerFilter, showActive],
  );
  React.useEffect(() => {
    const activeSkus =
      searchInput !== ""
        ? fuse.search(searchInput).map((result) => result.item)
        : aurbitrageSKU;
    setView(activeSkus.filter(viewFilter));
  }, [fuse, viewFilter, searchInput, aurbitrageSKU]);

  return (
    <StyledStack direction="column">
      <VirtualizedTable
        style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
        data={view}
        fixedHeaderContent={() => (
          <>
            <Row className="TableRow">
              <StyledTableCell className="FirstCell">
                Aurbitrage SKU
              </StyledTableCell>
              <StyledTableCell className="PriceCell">
                Price Display
              </StyledTableCell>
              <StyledTableCell>Metal</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Sub Category</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell
                createSKURelation={createSKURelation}
                className="LastCell"
              >
                Mint
              </StyledTableCell>

              {createSKURelation && (
                <StyledTableCell>Equivalent Oz</StyledTableCell>
              )}

              <StyledTableCell></StyledTableCell>
            </Row>
            {createSKURelation && (
              <CreateAurbitrageSKU
                type={"header"}
                aurbitrageSKUMeta={AurbitrageSKUMeta}
                createSKURelation={createSKURelation}
                setCreateSKURelation={setCreateSKURelation}
              />
            )}
          </>
        )}
        itemContent={(index, row) => {
          return (
            <SKUCatalogeRow
              row={row}
              index={index}
              createSKURelation={createSKURelation}
              aurbitrageSKUMeta={AurbitrageSKUMeta}
              onEdit={onEdit}
              updateChanges={updateChanges}
            />
          );
        }}
      />
    </StyledStack>
  );
};

export default SKUCataloge;
