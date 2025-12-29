import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Stack,
  Tooltip,
  MenuItem,
} from "@mui/material";
import Fuse from "fuse.js";
import useGetDealersForSku from "../../hooks/useGetDealersForSku";
import useGetDealerSku from "../../hooks/useGetDealerSkus";
import SkuInput from "../../components/SkuInput";
import useCreateSkuPrice from "../../hooks/useCreateSkuPrice";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  StyledTableRow,
  StyledTableCell,
  StyledBox,
  StyledTextField,
} from "./style";
const CreateSKU = ({
  index,
  formatDate,
  AurbitrageSKUMeta,
  createSKU,
  userRole,
  setCreateSKU,
}) => {
  const { dealers } = useGetDealersForSku();
  const { dealerSkus } = useGetDealerSku();
  const { createSkuPrice, loading, error } = useCreateSkuPrice();
  const [bidPrice, setBidPrice] = useState("");
  const [askPrice, setAskPrice] = useState("");
  const [sku, setSku] = useState("");
  const [aurbitrageSku, setAurbitrageSku] = useState("");
  const [aurbitrageSkuId, setAurbitrageSkuId] = useState(0);

  const [notes, setNotes] = useState("");
  const [bulkDiscount, setBulkDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [section, setSection] = useState("");
  const [priceDisplay, setPriceDisplay] = useState(null);

  const [dealer, setDealer] = useState(null);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState({ show: false, error: false });
  const [inputValue, setInputValue] = useState("");

  const regex = /^-?\$[0-9]+(\.[0-9]*)?$|^-?[0-9]+(\.[0-9]*)?%$/;
  useEffect(() => {
    if (userRole === "admin") {
      setDealer(dealers[0]);
    } else {
      setDealer(null);
    }
  }, [userRole, dealers]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };
  const handlePriceChange = (setter) => (event) => {
    const inputValue = event.target.value;
    setter(inputValue);
    if (!regex.test(inputValue) && inputValue !== "") {
      setErrors((e) => ({ ...e, price: "Invalid. Check $,%" }));
    } else {
      setErrors((e) => ({ ...e, price: null }));
    }
  };

  const isValidPrice = (value) => regex.test(value);

  const fuse = React.useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      threshold: 0.3,
      tokenize: true,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 10000,
      keys: ["dealerSku"],
    };
    return new Fuse(dealerSkus, fuseOptions);
  }, [dealerSkus]);

  const filterDealerSkuOptions = (options, { inputValue }) => {
    return inputValue
      ? fuse.search(inputValue).map((result) => result.item)
      : options.slice(0, 20);
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!sku) newErrors.sku = "SKU is required";
    if (!dealer) newErrors.dealer = "Dealer is required";
    if (!isValidPrice(bidPrice) && !isValidPrice(askPrice)) {
      newErrors.price =
        "At least one of Bid Price or Ask Price is required and must be in valid format";
    }
    if (!aurbitrageSku) newErrors.aurbitrageSku = "AurbitrageSku is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const skuData = {
      sku: sku.dealerSku || sku,
      dealerId: dealer.id,
      bidPrice,
      askPrice,
      aurbitrageSku,
      aurbitrageSkuId,
      notes,
      bulkDiscount,
      shipping,
      section,
      priceDisplay,
    };

    await createSkuPrice(skuData);
    setShowAlert({ show: true, error: false });
    setErrors({});
  };

  const hideAlert = () => setShowAlert((prev) => ({ ...prev, show: false }));

  if (!createSKU) {
    return null;
  }

  return (
    <>
      <StyledTableRow>
        {userRole == "admin" ? (
          <>
            <StyledTableCell align="right" className="SkuTableCellAdmin">
              {sku}
            </StyledTableCell>
          </>
        ) : (
          <>
            <StyledTableCell align="right" className="SkuTableCell">
              <Autocomplete
                size="small"
                componentsProps={{
                  paper: {
                    sx: {
                      textAlign: "left",
                      backgroundColor: "#000",
                      color: "#fff",
                    },
                  },
                }}
                freeSolo
                filterOptions={filterDealerSkuOptions}
                disablePortal
                disabled={userRole === "admin"}
                id="dealer-sku-autocomplete"
                options={dealerSkus || []}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option?.dealerSku || ""
                }
                className="dealerSkuAutoComplete"
                onChange={(e, v) => {
                  setSku(v);
                  if (errors.sku) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      sku: null,
                    }));
                  }
                }}
                onInputChange={(e, v) => setSku(v)}
                value={sku}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="SKU Name"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      style: { fontSize: "small" },
                    }}
                    error={!!errors.sku}
                    helperText={errors.sku}
                    sx={{
                      color: "white",
                      "& .MuiInputLabel-root": {
                        color: "#696969",
                      },
                      "& .MuiFormHelperText-root": {
                        color: "white",
                      },
                    }}
                  />
                )}
              />
            </StyledTableCell>
          </>
        )}

        {userRole === "superadmin" && (
          <>
            <StyledTableCell align="right" className="TableCellField">
              <StyledTextField
                width={"auto"}
                id="section"
                variant="standard"
                label="Section"
                value={section}
                onChange={(event) => setSection(event.target.value)}
              />
            </StyledTableCell>
            <StyledTableCell align="right" className="DealerTableCell">
              <Autocomplete
                size="small"
                componentsProps={{
                  paper: {
                    sx: {
                      textAlign: "left",
                      backgroundColor: "#000",
                      color: "#fff",
                    },
                  },
                }}
                disablePortal
                id="dealer-autocomplete"
                options={dealers || []}
                getOptionLabel={(option) => option?.dealerName || ""}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                className="dealerAutoComplete"
                onChange={(e, v) => {
                  setDealer(v);
                  if (errors.dealer) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      dealer: null,
                    }));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Dealer"
                    variant="standard"
                    InputProps={{
                      ...params.InputProps,
                      style: { fontSize: "small" },
                      disableUnderline: true,
                    }}
                    error={!!errors.dealer}
                    helperText={errors.dealer}
                    sx={{
                      color: "white",
                      "& .MuiInputBase-input::placeholder": {
                        color: "white",
                        opacity: 1,
                        paddingLeft: "30px",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiFormHelperText-root": {
                        color: "white",
                      },
                    }}
                  />
                )}
              />
            </StyledTableCell>
          </>
        )}

        <StyledTableCell align="right" className="StyledTableCell">
          <Stack>
            <StyledTextField
              width={"6em"}
              id="bid-price"
              className="styledTextField"
              variant="standard"
              value={bidPrice}
              label="Bid Price"
              onChange={handlePriceChange(setBidPrice)}
              inputProps={{ maxLength: 10 }}
              error={!!errors.price}
              helperText={errors.price}
            />

            <StyledTextField
              width={"100px"}
              id="notes"
              variant="standard"
              label="Product Note"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </Stack>
        </StyledTableCell>
        <StyledTableCell align="right" className="StyledTableCell">
          <Stack>
            <StyledTextField
              width={"6em"}
              id="ask-price"
              variant="standard"
              value={askPrice}
              label="Ask Price"
              onChange={handlePriceChange(setAskPrice)}
              inputProps={{ maxLength: 10 }}
              error={!!errors.price}
              helperText={errors.price}
            />

            <StyledTextField
              width={"100px"}
              id="bulkDiscount"
              variant="standard"
              label="Bulk"
              value={bulkDiscount}
              onChange={(event) => setBulkDiscount(event.target.value)}
            />
          </Stack>
        </StyledTableCell>

        <StyledTableCell align="right">
          <Stack>
            <SkuInput
              index={index}
              SkuOptions={AurbitrageSKUMeta?.AurbitrageSkus.map((item) => ({
                label: item.sku,
                value: item.aurbitrageSkuId,
                keyword: item.keywords,
              }))}
              value={aurbitrageSku}
              errors={errors}
              onChange={(e, v) => {
                if (v == null) {
                  setAurbitrageSku("");
                  setAurbitrageSkuId(0);
                } else {
                  setAurbitrageSku(v.label);
                  setAurbitrageSkuId(v.value);
                }

                if (userRole === "admin") {
                  setSku(v.label);
                }
                if (errors.aurbitrageSku) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    aurbitrageSku: null,
                  }));
                }
              }}
            />

            <StyledTextField
              width={"100px"}
              id="shippingNote"
              variant="standard"
              label="Shipping"
              value={shipping}
              onChange={(event) => setShipping(event.target.value)}
            />
          </Stack>
        </StyledTableCell>

        <StyledTableCell align="right" className="DateTableCell">
          {formatDate(new Date())}
        </StyledTableCell>

        <StyledTableCell align="right" className="buttonCell">
          <StyledBox>
            <Tooltip title="Save">
              <Button
                onClick={handleSave}
                className="buttonStyle"
                disabled={
                  loading === "loading" ||
                  Object.values(errors).filter((v) => v).length > 0
                }
              >
                {loading === "loading" ? (
                  <CircularProgress size={24} />
                ) : (
                  <>
                    <SaveIcon sx={{ ml: 1, color: "#1ad598" }} />
                  </>
                )}
              </Button>
            </Tooltip>
            <Tooltip title="Close">
              <CancelOutlinedIcon
                className="cancelIcon"
                onClick={() => setCreateSKU((prev) => !prev)}
              />
            </Tooltip>
          </StyledBox>
        </StyledTableCell>

        <Snackbar
          open={showAlert.show}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={hideAlert}
        >
          <Alert
            onClose={hideAlert}
            severity={loading === "failed" ? "error" : "success"}
            variant="filled"
          >
            {loading === "failed" ? error : "Dealer Sku Created"}
          </Alert>
        </Snackbar>
      </StyledTableRow>

      <StyledTableRow>
        <StyledTableCell colSpan={12}>
          <StyledTextField
            select
            id="price-display-dropdown"
            label="Price Display"
            variant="standard"
            value={priceDisplay}
            onChange={(event) => setPriceDisplay(event.target.value)}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    bgcolor: "#292929",
                    "& .MuiMenuItem-root": {
                      color: "white",
                      "&:hover": {
                        bgcolor: "#3d3d3d",
                      },
                      "&.Mui-selected": {
                        bgcolor: "#3d3d3d",
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value={null}>None</MenuItem>
            <MenuItem value="DollarPerOz">Dollar Per Oz</MenuItem>
            <MenuItem value="DollarPerPiece">Dollar Per Piece</MenuItem>
            <MenuItem value="Percentage">Percentage</MenuItem>
            <MenuItem value="All-in">All-in</MenuItem>
          </StyledTextField>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default CreateSKU;
