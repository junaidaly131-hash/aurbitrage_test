import React, { useState, useEffect, useCallback } from "react";
import {
  CircularProgress,
  Tooltip,
  InputAdornment,
  Grid,
  MenuItem,
  Divider,
} from "@mui/material";
import Fuse from "fuse.js";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckIcon from "@mui/icons-material/Check";
import {
  SKUTableCell,
  ActionButtonContainer,
  SKUFormField,
  SKUModalContainer,
  SKUAutocomplete,
  StyledModal,
  SKUSelect,
  AddButton,
} from "./styles";
import SkuInputStyled from "@/pages/admin-dashboard/components/SkuInput/SkuInputStyled";
import useAssignSKUPrices from "@/pages/admin-dashboard/hooks/useAssignSkuPrices";
import useAssignSkuNotes from "@/pages/admin-dashboard/hooks/useAssignSkuNotes";
import useAssignSkuRelation from "@/pages/admin-dashboard/hooks/useAssignSkuRelation";
import useCreateSkuPrice from "@/pages/admin-dashboard/hooks/useCreateSkuPrice";
import useUnMapSku from "@/pages/admin-dashboard/hooks/useUnmapSku";
import useGetDealersForSku from "@/pages/admin-dashboard/hooks/useGetDealersForSku";
import useGetDealerSku from "@/pages/admin-dashboard/hooks/useGetDealerSkus";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import AppSnackbar from "../commom/AppSnackBar";

const AddSKU = ({
  index,
  AurbitrageSKUMeta,
  createSKU,
  userRole,
  setCreateSKU,
  editData,
  updateChanges,
  displayAlert,
}) => {
  const { dealers } = useGetDealersForSku();
  const { dealerSkus } = useGetDealerSku();
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
    loading: unMapSkuLoading,
    error: unMapSkuError,
    unMapSku,
  } = useUnMapSku();
  const {
    loading: skuRelationsLoading,
    error: skuRelationError,
    postData: postSkuRelation,
  } = useAssignSkuRelation();
  const {
    createSkuPrice,
    loading: createSkuPriceLoading,
    error: createSkuPriceError,
  } = useCreateSkuPrice();
  const [showAlert, setShowAlert] = useState({ show: false, error: false });
  const [inputValue, setInputValue] = useState("");
  const [priceType, setPriceType] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const priceRegex = /^-?\$-?[0-9]+(\.[0-9]*)?$|^-?[0-9]+(\.[0-9]*)?%$/;

  const isEditing = editData && editData.sku;

  const validationSchema = yup.object().shape({
    bidPrice: yup
      .string()
      .test(
        "valid-format",
        "Price must include $ or % format",
        function (value) {
          if (!value) return true;
          return priceRegex.test(value);
        },
      )
      .test(
        "at-least-one-price",
        "At least one price must be provided",
        function (value) {
          const { askPrice } = this.parent;
          return value || askPrice;
        },
      ),
    askPrice: yup
      .string()
      .test(
        "valid-format",
        "Price must include $ or % format",
        function (value) {
          if (!value) return true;
          return priceRegex.test(value);
        },
      )
      .test(
        "at-least-one-price",
        "At least one price must be provided",
        function (value) {
          const { bidPrice } = this.parent;
          return value || bidPrice;
        },
      ),
    sku:
      userRole === "admin"
        ? yup.string()
        : yup.mixed().required("SKU is required"),
    aurbitrageSku: yup.string().nullable(),
    dealer:
      userRole === "superadmin"
        ? yup.object().nullable().required("Dealer is required")
        : yup.mixed(),
    section: yup.string().optional(),
    askPriceFormat: yup
      .string()
      .oneOf(
        ["DollarPerOz", "DollarPerPiece", "Percentage", "All-in", null],
        "Invalid price format",
      )
      .nullable(),
    bidPriceFormat: yup
      .string()
      .oneOf(
        ["DollarPerOz", "DollarPerPiece", "Percentage", "All-in", null],
        "Invalid price format",
      )
      .nullable(),
    askPriceDisplayAs: yup
      .string()
      .oneOf(
        ["DollarPerOz", "DollarPerPiece", "Percentage", "All-in", null],
        "Invalid price display format",
      )
      .nullable(),
    bidPriceDisplayAs: yup
      .string()
      .oneOf(
        ["DollarPerOz", "DollarPerPiece", "Percentage", "All-in", null],
        "Invalid price display format",
      )
      .nullable(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      bidPrice: "",
      askPrice: "",
      sku: "",
      aurbitrageSku: "",
      aurbitrageSkuId: null,
      notes: "",
      bulkDiscount: "",
      shippingNotes: "",
      section: "",
      dealer: null,
      askPriceFormat: null,
      bidPriceFormat: null,
      askPriceDisplayAs: null,
      bidPriceDisplayAs: null,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (editData) {
      const bidPrice = editData.bidNumber
        ? editData.bidFormat === "%"
          ? `${editData.bidSign || ""}${editData.bidNumber}${editData.bidFormat}`
          : `${editData.bidSign || ""}${editData.bidFormat || ""}${editData.bidNumber}`
        : "";
      const askPrice = editData.askNumber
        ? editData.askFormat === "%"
          ? `${editData.askSign || ""}${editData.askNumber}${editData.askFormat}`
          : `${editData.askSign || ""}${editData.askFormat || ""}${editData.askNumber}`
        : "";

      const dealerObject =
        dealers?.find((d) => d.dealerName === editData.dealer) || null;

      if (dealerObject) {
        setInputValue(dealerObject.dealerName);
      }

      let type = "";
      if (bidPrice && askPrice) {
        type = "ask&bid";
      } else if (bidPrice) {
        type = "bid";
      } else if (askPrice) {
        type = "ask";
      }
      setPriceType(type);
      setShowAlert({ show: false, error: false });
      reset({
        bidPrice,
        askPrice,
        sku: editData.sku || "",
        aurbitrageSku: editData.aurbitrageSku || "",
        aurbitrageSkuId: editData.aurbitrageSkuId || null,
        notes: editData.notes || "",
        bulkDiscount: editData.bulkDiscount || "",
        shippingNotes: editData.shippingNotes || "",
        section: editData.section || "",
        dealer: dealerObject,
        askPriceFormat: editData.askPriceFormat || null,
        bidPriceFormat: editData.bidPriceFormat || null,
        askPriceDisplayAs: editData.askPriceDisplayAs || null,
        bidPriceDisplayAs: editData.bidPriceDisplayAs || null,
      });
    }
  }, [editData, reset, dealers]);

  useEffect(() => {
    if (userRole === "admin" && dealers?.length) {
      setValue("dealer", dealers[0]);
    }
  }, [userRole, dealers, setValue]);

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

  const handleAlert = useCallback(
    (loadingState, errorState, successMessage) => {
      if (loadingState !== "loading" && loadingState !== "idle") {
        const alertObject = {
          show: true,
          error: errorState !== "",
          message: errorState || successMessage,
        };
        displayAlert ? displayAlert(alertObject) : setShowAlert(alertObject);
      }
    },
    [displayAlert, setShowAlert],
  );

  useEffect(() => {
    handleAlert(skuPriceLoading, skuPriceError, "Price Assigned");
  }, [skuPriceError, skuPriceLoading, handleAlert]);

  useEffect(() => {
    handleAlert(skuNotesLoading, skuNotesError, "Note Assigned");
  }, [skuNotesError, skuNotesLoading, handleAlert]);

  useEffect(() => {
    handleAlert(skuRelationsLoading, skuRelationError, "Assigned SKU");
  }, [skuRelationsLoading, skuRelationError, handleAlert]);

  useEffect(() => {
    handleAlert(createSkuPriceLoading, createSkuPriceError, "SKU Created");
  }, [createSkuPriceError, createSkuPriceLoading, handleAlert]);

  useEffect(() => {
    handleAlert(unMapSkuLoading, unMapSkuError, "Sku Unmapped");
  }, [unMapSkuError, unMapSkuLoading, handleAlert]);

  const onSubmit = async (data) => {
    const parseBidPrice = () => {
      if (!data.bidPrice)
        return { bidNumber: null, bidFormat: null, bidSign: null };

      const format = data.bidPrice.startsWith("$")
        ? "$"
        : data.bidPrice.endsWith("%")
          ? "%"
          : null;

      const number = data.bidPrice.replace(/[$%]/g, "");
      const sign = null;
      return { bidNumber: number, bidFormat: format, bidSign: sign };
    };

    const parseAskPrice = () => {
      if (!data.askPrice)
        return { askNumber: null, askFormat: null, askSign: null };

      const format = data.askPrice.startsWith("$")
        ? "$"
        : data.askPrice.endsWith("%")
          ? "%"
          : null;

      const number = data.askPrice.replace(/[$%]/g, "");
      const sign = null;
      return { askNumber: number, askFormat: format, askSign: sign };
    };

    const priceData = {
      ...parseBidPrice(),
      ...parseAskPrice(),
    };

    const skuData = {
      ...editData,
      sku: typeof data.sku === "object" ? data.sku.dealerSku : data.sku,
      dealerId: data.dealer?.id,
      dealerName: data.dealer?.dealerName,
      ...priceData,
      aurbitrageSku: data.aurbitrageSku,
      aurbitrageSkuId: data.aurbitrageSkuId,
      notes: data.notes,
      bulkDiscount: data.bulkDiscount,
      shippingNotes: data.shippingNotes,
      section: data.section,
      askPriceFormat: data.askPriceFormat,
      bidPriceFormat: data.bidPriceFormat,
      askPriceDisplayAs: data.askPriceDisplayAs,
      bidPriceDisplayAs: data.bidPriceDisplayAs,
    };
    if (isEditing) {
      const sourceTable = editData.sourceTable || "MasterPricelists";
      const dealerId = data.dealer?.id || editData.dealerId;
      const dealerObj = dealers.find((d) => d.id === dealerId);
      const dealerName = dealerObj?.dealerName || "";
      const sku =
        typeof data.sku === "object"
          ? data.sku.dealerSku
          : data.sku || editData.sku;
      const date = editData.date || new Date().toISOString();
      const section = data.section || editData.section;
      const askPriceFormat = data.askPriceFormat || editData.askPriceFormat;
      const bidPriceFormat = data.bidPriceFormat || editData.bidPriceFormat;
      const askPriceDisplayAs =
        data.askPriceDisplayAs || editData.askPriceDisplayAs;
      const bidPriceDisplayAs =
        data.bidPriceDisplayAs || editData.bidPriceDisplayAs;
      let priceUpdated = false;
      let notesUpdated = false;
      let bulkUpdated = false;
      let shippingUpdated = false;
      let skuRelationUpdated = false;

      if (
        editData.bidNumber !== priceData.bidNumber ||
        editData.bidFormat !== priceData.bidFormat ||
        editData.askNumber !== priceData.askNumber ||
        editData.askFormat !== priceData.askFormat ||
        editData.askSign !== priceData.askSign ||
        editData.bidSign !== priceData.bidSign
      ) {
        let askPrice = data.askPrice;
        let bidPrice = data.bidPrice;

        await postSKUPricesData(
          sku,
          dealerName,
          date,
          askPrice,
          bidPrice,
          sourceTable,
        );

        priceUpdated = true;
      }

      if (editData.notes !== data.notes) {
        await postSkuNote(
          sku,
          dealerName,
          date,
          data.notes,
          "notes",
          sourceTable,
        );
        notesUpdated = true;
      }

      if (editData.bulkDiscount !== data.bulkDiscount) {
        await postSkuNote(
          sku,
          dealerName,
          date,
          data.bulkDiscount,
          "bulk",
          sourceTable,
        );
        bulkUpdated = true;
      }

      if (editData.shippingNotes !== data.shippingNotes) {
        await postSkuNote(
          sku,
          dealerName,
          date,
          data.shippingNotes,
          "shipping",
          sourceTable,
        );
        shippingUpdated = true;
      }
      if (
        editData.aurbitrageSku !== data.aurbitrageSku ||
        editData.askPriceFormat !== data.askPriceFormat ||
        editData.bidPriceFormat !== data.bidPriceFormat ||
        editData.askPriceDisplayAs !== data.askPriceDisplayAs ||
        editData.bidPriceDisplayAs !== data.bidPriceDisplayAs
      ) {
        if (data.aurbitrageSkuId == null) {
          await unMapSku(sku, dealerName, section);
        } else {
          await postSkuRelation(
            data.aurbitrageSkuId,
            sku,
            dealerName,
            section,
            askPriceFormat,
            bidPriceFormat,
            askPriceDisplayAs,
            bidPriceDisplayAs,
          );
        }
        skuRelationUpdated = true;
      }

      if (
        priceUpdated ||
        notesUpdated ||
        bulkUpdated ||
        shippingUpdated ||
        skuRelationUpdated
      ) {
        if (updateChanges) {
          updateChanges(skuData);
        }

        setTimeout(() => {
          setCreateSKU(false);
        }, 1000);
      } else {
        setCreateSKU(false);
      }
    } else {
      let returnedPricelistId = null;
      if (data.aurbitrageSkuId) {
        data.sku = data.aurbitrageSku;
        returnedPricelistId = await createSkuPrice({
          dealerId: data.dealer?.id,
          sku: data.aurbitrageSku,
          aurbitrageSkuId: data.aurbitrageSkuId,
          askPrice: data.askPrice,
          bidPrice: data.bidPrice,
          notes: data.notes,
          section: data.section,
          bulkDiscount: data.bulkDiscount,
          shipping: data.shippingNotes,
          askPriceFormat: data.askPriceFormat,
          bidPriceFormat: data.bidPriceFormat,
          askPriceDisplayAs: data.askPriceDisplayAs,
          bidPriceDisplayAs: data.bidPriceDisplayAs,
        });
      }

      if (updateChanges) {
        updateChanges({
          ...skuData,
          isExtracted: false,
          pricelistId: returnedPricelistId,
        });
      }
      handleReset();

      setShowAlert({
        show: true,
        error: false,
        message: "SKU created successfully",
      });
      setTimeout(() => {
        setCreateSKU(false);
      }, 1000);
    }
  };

  const handleReset = () => {
    reset({
      bidPrice: "",
      askPrice: "",
      sku: "",
      aurbitrageSku: "",
      aurbitrageSkuId: null,
      notes: "",
      bulkDiscount: "",
      shippingNotes: "",
      section: "",
      dealer: null,
      askPriceFormat: null,
      bidPriceFormat: null,
      askPriceDisplayAs: null,
      bidPriceDisplayAs: null,
    });
  };

  const handleCancel = () => {
    handleReset();

    setCreateSKU(false);
  };

  const hideAlert = () => setShowAlert((prev) => ({ ...prev, show: false }));

  const currentSection = priceType;
  const shouldShowBidFields =
    currentSection === "bid" || currentSection === "ask&bid";
  const shouldShowAskFields =
    currentSection === "ask" || currentSection === "ask&bid";
  if (!createSKU) {
    return null;
  }

  const handleDeleteSuccess = () => {
    setShowAlert({
      show: true,
      error: false,
      message: "SKU Price deleted successfully",
    });
    updateChanges({ ...editData, deleted: true });
    setTimeout(() => {
      setCreateSKU(false);
    }, 3000);
  };

  return (
    <>
      <StyledModal
        open={createSKU}
        onClose={() => {
          setCreateSKU(false);
          editData(null);
        }}
        aria-labelledby="add-sku-modal"
        aria-describedby="modal-to-add-new-sku"
      >
        <SKUModalContainer>
          <Grid container spacing={3}>
            {userRole == "admin" ? (
              <>
                <SKUTableCell className="SkuTableCellAdmin">
                  {watch("sku")}
                </SKUTableCell>
              </>
            ) : (
              <>
                <SKUTableCell item className="SkuTableCell" xs={6}>
                  <Controller
                    name={isEditing ? "sku" : "aurbitrageSku"}
                    control={control}
                    render={({ field }) => (
                      <SKUFormField
                        {...field}
                        width={"100px"}
                        id="dealer-sku-autocomplete"
                        variant="standard"
                        label="SKU Name"
                        disabled={true}
                        title={field.value}
                      />
                    )}
                  />
                </SKUTableCell>
              </>
            )}
            <SKUTableCell item xs={6}>
              <Controller
                name="priceType"
                control={control}
                render={({ field }) => (
                  <SKUSelect
                    {...field}
                    select
                    id="section-dropdown drop-down-gray"
                    variant="standard"
                    label="Price Type"
                    fullWidth
                    value={priceType}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setPriceType(e.target.value);
                    }}
                    SelectProps={{
                      renderValue: (value) => {
                        const options = {
                          bid: "Bid Price",
                          ask: "Ask Price",
                          "ask&bid": "Ask & Bid Price",
                        };
                        return options[value] || "";
                      },
                      MenuProps: {
                        PaperProps: {
                          style: {
                            backgroundColor: "#292929",
                          },
                        },
                        sx: {
                          "& .MuiMenuItem-root": {
                            color: "white",
                            alignItems: "center",
                            "&.Mui-selected": {
                              backgroundColor: "#696969",
                            },
                            display: "flex",
                            justifyContent: "space-between",
                          },
                          "& .MuiMenu-list": {
                            backgroundColor: "#292929",
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="bid">
                      Bid Price
                      {field.value === "bid" && (
                        <CheckIcon sx={{ color: "#DBA42D", ml: 1 }} />
                      )}
                    </MenuItem>
                    <MenuItem value="ask">
                      Ask Price
                      {field.value === "ask" && (
                        <CheckIcon sx={{ color: "#DBA42D", ml: 1 }} />
                      )}
                    </MenuItem>
                    <MenuItem value="ask&bid">
                      Ask & Bid Price
                      {field.value === "ask&bid" && (
                        <CheckIcon sx={{ color: "#DBA42D", ml: 1 }} />
                      )}
                    </MenuItem>
                  </SKUSelect>
                )}
              />
            </SKUTableCell>
            <SKUTableCell
              item
              xs={userRole === "superadmin" ? 6 : 12}
              className="StyledTableCell"
            >
              <Controller
                name="aurbitrageSku"
                control={control}
                render={({ field }) => (
                  <SkuInputStyled
                    index={index}
                    id="aurbitrage-sku-autocomplete"
                    SkuOptions={AurbitrageSKUMeta?.AurbitrageSkus.map(
                      (item) => ({
                        label: item.sku,
                        value: item.aurbitrageSkuId,
                        keyword: item.keywords,
                      }),
                    )}
                    value={field.value || ""}
                    error={!!errors.aurbitrageSku}
                    helperText={errors.aurbitrageSku?.message || "Invalid"}
                    onChange={(e, v) => {
                      if (v == null) {
                        field.onChange("");
                        setValue("aurbitrageSkuId", null);
                      } else {
                        field.onChange(v.label);
                        setValue("aurbitrageSkuId", v.value);
                        if (userRole === "admin") {
                          setValue("sku", v.label);
                        }
                      }
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                  />
                )}
              />
            </SKUTableCell>

            {userRole === "superadmin" && (
              <SKUTableCell item xs={6} className="StyledTableCell">
                <Controller
                  name="dealer"
                  control={control}
                  render={({ field }) => (
                    <SKUAutocomplete
                      disablePortal
                      id="dealer-autocomplete"
                      options={dealers || []}
                      getOptionLabel={(option) => option?.dealerName || ""}
                      inputValue={inputValue}
                      onChange={(_, newValue) => field.onChange(newValue || "")}
                      onInputChange={(_, newInputValue) =>
                        setInputValue(newInputValue)
                      }
                      value={field.value}
                      disabled={isEditing}
                      renderInput={(params) => (
                        <SKUFormField
                          {...params}
                          placeholder="Dealer"
                          variant="standard"
                          label="Dealer"
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                          error={!!errors.dealer}
                          helperText={errors.dealer?.message || ""}
                        />
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.dealerName === value.dealerName
                      }
                    />
                  )}
                />
              </SKUTableCell>
            )}
            {editData && (
              <SKUTableCell item xs={12} className="StyledTableCell">
                <Controller
                  name="section"
                  control={control}
                  render={({ field }) => (
                    <SKUFormField
                      {...field}
                      width={"6em"}
                      id="section"
                      className="styledTextField"
                      variant="standard"
                      label="Section"
                      error={!!errors.section}
                      helperText={errors.section?.message || ""}
                    />
                  )}
                />
              </SKUTableCell>
            )}

            {shouldShowBidFields && (
              <>
                <SKUTableCell item xs={6} className="StyledTableCell">
                  <Controller
                    name="bidPrice"
                    control={control}
                    render={({ field }) => (
                      <SKUFormField
                        {...field}
                        width={"6em"}
                        id="bid-price"
                        className="styledTextField"
                        variant="standard"
                        label="Bid Price"
                        inputProps={{ maxLength: 10 }}
                        error={!!errors.bidPrice}
                        helperText={errors.bidPrice?.message || ""}
                      />
                    )}
                  />
                </SKUTableCell>
                <SKUTableCell item xs={6} className="StyledTableCell">
                  <Controller
                    name="bidPriceFormat"
                    control={control}
                    render={({ field }) => (
                      <SKUSelect
                        {...field}
                        select
                        id="bid-price-format"
                        variant="standard"
                        label="Bid Price Format"
                        fullWidth
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              style: {
                                backgroundColor: "#292929",
                              },
                            },
                            sx: {
                              "& .MuiMenuItem-root": {
                                color: "white",
                                alignItems: "center",
                                "&.Mui-selected": {
                                  backgroundColor: "#696969",
                                },
                                display: "flex",
                                justifyContent: "space-between",
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value={null}>None</MenuItem>
                        <MenuItem value="DollarPerOz">Dollar Per Oz</MenuItem>
                        <MenuItem value="DollarPerPiece">
                          Dollar Per Piece
                        </MenuItem>
                        <MenuItem value="Percentage">Percentage</MenuItem>
                        <MenuItem value="All-in">All-in</MenuItem>
                      </SKUSelect>
                    )}
                  />
                </SKUTableCell>
                <SKUTableCell item xs={6} className="StyledTableCell">
                  <Controller
                    name="bidPriceDisplayAs"
                    control={control}
                    render={({ field }) => (
                      <SKUSelect
                        {...field}
                        select
                        id="bid-price-display"
                        variant="standard"
                        label="Bid Price Display As"
                        fullWidth
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              style: {
                                backgroundColor: "#292929",
                              },
                            },
                            sx: {
                              "& .MuiMenuItem-root": {
                                color: "white",
                                alignItems: "center",
                                "&.Mui-selected": {
                                  backgroundColor: "#696969",
                                },
                                display: "flex",
                                justifyContent: "space-between",
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value={null}>None</MenuItem>
                        <MenuItem value="DollarPerOz">Dollar Per Oz</MenuItem>
                        <MenuItem value="DollarPerPiece">
                          Dollar Per Piece
                        </MenuItem>
                        <MenuItem value="Percentage">Percentage</MenuItem>
                        <MenuItem value="All-in">All-in</MenuItem>
                      </SKUSelect>
                    )}
                  />
                </SKUTableCell>
                <SKUTableCell item xs={6} className="StyledTableCell">
                  <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                      <SKUFormField
                        {...field}
                        width={"100px"}
                        id="notes"
                        variant="standard"
                        label="Product Note"
                      />
                    )}
                  />
                </SKUTableCell>
              </>
            )}

            {shouldShowAskFields && (
              <>
                <SKUTableCell item xs={12}>
                  <Divider
                    sx={{
                      my: 2,
                      borderColor: "rgba(255, 255, 255, 0.12)",
                      width: "100%",
                    }}
                  />
                </SKUTableCell>
                <SKUTableCell item xs={6} className="StyledTableCell">
                  <Controller
                    name="askPrice"
                    control={control}
                    render={({ field }) => (
                      <SKUFormField
                        {...field}
                        width={"6em"}
                        id="ask-price"
                        variant="standard"
                        label="Ask Price"
                        inputProps={{ maxLength: 10 }}
                        error={!!errors.askPrice}
                        helperText={errors.askPrice?.message || ""}
                      />
                    )}
                  />
                </SKUTableCell>
                <SKUTableCell item xs={6} className="StyledTableCell">
                  <Controller
                    name="askPriceFormat"
                    control={control}
                    render={({ field }) => (
                      <SKUSelect
                        {...field}
                        select
                        id="ask-price-format"
                        variant="standard"
                        label="Ask Price Format"
                        fullWidth
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              style: {
                                backgroundColor: "#292929",
                              },
                            },
                            sx: {
                              "& .MuiMenuItem-root": {
                                color: "white",
                                alignItems: "center",
                                "&.Mui-selected": {
                                  backgroundColor: "#696969",
                                },
                                display: "flex",
                                justifyContent: "space-between",
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value={null}>None</MenuItem>
                        <MenuItem value="DollarPerOz">Dollar Per Oz</MenuItem>
                        <MenuItem value="DollarPerPiece">
                          Dollar Per Piece
                        </MenuItem>
                        <MenuItem value="Percentage">Percentage</MenuItem>
                        <MenuItem value="All-in">All-in</MenuItem>
                      </SKUSelect>
                    )}
                  />
                </SKUTableCell>
                <SKUTableCell item xs={6} className="StyledTableCell">
                  <Controller
                    name="askPriceDisplayAs"
                    control={control}
                    render={({ field }) => (
                      <SKUSelect
                        {...field}
                        select
                        id="ask-price-display"
                        variant="standard"
                        label="Ask Price Display As"
                        fullWidth
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              style: {
                                backgroundColor: "#292929",
                              },
                            },
                            sx: {
                              "& .MuiMenuItem-root": {
                                color: "white",
                                alignItems: "center",
                                "&.Mui-selected": {
                                  backgroundColor: "#696969",
                                },
                                display: "flex",
                                justifyContent: "space-between",
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value={null}>None</MenuItem>
                        <MenuItem value="DollarPerOz">Dollar Per Oz</MenuItem>
                        <MenuItem value="DollarPerPiece">
                          Dollar Per Piece
                        </MenuItem>
                        <MenuItem value="Percentage">Percentage</MenuItem>
                        <MenuItem value="All-in">All-in</MenuItem>
                      </SKUSelect>
                    )}
                  />
                </SKUTableCell>

                <SKUTableCell item xs={6} className="StyledTableCell">
                  <Controller
                    name="bulkDiscount"
                    control={control}
                    render={({ field }) => (
                      <SKUFormField
                        {...field}
                        width={"100px"}
                        id="bulkDiscount"
                        variant="standard"
                        label="Bulk"
                      />
                    )}
                  />
                </SKUTableCell>

                <SKUTableCell item xs={12} className="StyledTableCell">
                  <Controller
                    name="shippingNotes"
                    control={control}
                    render={({ field }) => (
                      <SKUFormField
                        {...field}
                        width={"100px"}
                        id="shippingNote"
                        variant="standard"
                        label="Shipping"
                      />
                    )}
                  />
                </SKUTableCell>
              </>
            )}

            <SKUTableCell item xs={12} className="buttonCell">
              <ActionButtonContainer>
                <Grid item xs={12} className="ButtonsContainer">
                  <Tooltip title="Save">
                    <AddButton
                      onClick={handleSubmit(onSubmit)}
                      className="buttonStyle"
                      sx={{ marginRight: 2 }}
                      disabled={
                        skuPriceLoading === "loading" ||
                        skuNotesLoading === "loading" ||
                        skuRelationsLoading === "loading" ||
                        unMapSkuLoading === "loading" ||
                        createSkuPriceLoading === "loading"
                      }
                    >
                      {skuPriceLoading === "loading" ||
                      skuNotesLoading === "loading" ||
                      skuRelationsLoading === "loading" ||
                      unMapSkuLoading === "loading" ||
                      createSkuPriceLoading === "loading" ? (
                        <>
                          Loading <CircularProgress size={24} />
                        </>
                      ) : (
                        <>Save </>
                      )}
                    </AddButton>
                  </Tooltip>
                  {isEditing && (
                    <Tooltip title="Delete">
                      <AddButton
                        danger
                        onClick={() => setShowDeleteDialog(true)}
                        sx={{ marginRight: 2 }}
                      >
                        Delete
                      </AddButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Cancel">
                    <AddButton danger onClick={() => setCreateSKU(false)}>
                      Cancel
                    </AddButton>
                  </Tooltip>
                </Grid>

                <Tooltip title="Close">
                  <CancelOutlinedIcon
                    className="cancelIcon"
                    onClick={handleCancel}
                  />
                </Tooltip>
              </ActionButtonContainer>
            </SKUTableCell>
          </Grid>
        </SKUModalContainer>
      </StyledModal>

      <DeleteConfirmationModal
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        skuId={editData?.pricelistId}
        onSuccess={handleDeleteSuccess}
        isAurbitrageSku={false}
        sourceTable={editData?.sourceTable}
      />

      <AppSnackbar
        open={showAlert.show}
        onClose={hideAlert}
        message={showAlert.message}
        severity={showAlert.error ? "error" : "success"}
      />
    </>
  );
};

export default AddSKU;
