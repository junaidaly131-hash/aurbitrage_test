import React from "react";

import { TableRow, IconButton, Tooltip } from "@mui/material";
import SkuMetaInput from "../../../components/SkuMetaInput";
import useEditAurbitrageSKU from "../../../hooks/useEditAurbitrageSKU";
import useCreateAurbitrageSKU from "../../../hooks/useCreateAurbitrageSKU";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faClipboardList,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import Modal from "@mui/material/Modal";
import isEqual from "lodash/isEqual";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { StyledTableCell, StyledBox } from "./styles";

function RowContainer(props) {
  const { children, type } = props;
  if (type === "header") {
    return (
      <TableRow
        sx={{ backgroundColor: "#dcdcec", width: "100%", border: "black" }}
      >
        {children}
      </TableRow>
    );
  }
  return <>{children}</>;
}

const CreateAurbitrageSKURow = (props) => {
  const {
    rowEntry,
    type,
    onCancel,
    index,
    aurbitrageSKUMeta,
    createSKURelation,
    setCreateSKURelation,
  } = props;

  const editHook = useEditAurbitrageSKU();
  const createHook = useCreateAurbitrageSKU();

  let createAurbitrageSKU, loading, error;
  if (!createSKURelation) {
    createAurbitrageSKU = editHook.postData;
    loading = editHook.loading;
    error = editHook.error;
  } else {
    createAurbitrageSKU = createHook.postData;
    loading = createHook.loading;
    error = createHook.error;
  }

  const [skuRelation, setSKURelation] = React.useState(rowEntry);
  const [skuRelationAttributes, setSKURelationAttributes] = React.useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState({
    show: false,
    error: false,
    errorMessage: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const hideAlert = () => {
    setShowAlert((p) => {
      return { ...p, show: false };
    });
  };

  React.useEffect(() => {
    if (loading !== "loading" && loading !== "idle") {
      setShowAlert({ show: true, error: error !== "", errorMessage: error });
    }
  }, [loading, error]);

  React.useEffect(() => {
    if (!isEqual(skuRelation, rowEntry)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [skuRelation, rowEntry]);

  const updateSkuRelation = (value, key) => {
    setSKURelation((prev) => {
      const temp = { ...prev };
      temp[key] = value;
      return temp;
    });
  };

  const updateSkuRelationAttributes = (value, key) => {
    setSKURelationAttributes((prev) => {
      const temp = { ...prev };
      temp[key] = value?.trim();
      return temp;
    });
  };
  const checkRequiredFields = () => {
    if (skuRelation.aurbitrageSku == undefined) {
      setShowAlert({
        show: true,
        error: true,
        errorMessage: "AurbitrageSku is Required",
      });
      return false;
    }
    if (skuRelation.equivalentOz == undefined) {
      setShowAlert({
        show: true,
        error: true,
        errorMessage: "EquivalentOz is Required",
      });
      return false;
    }
    if (skuRelation.priceDisplay == undefined) {
      setShowAlert({
        show: true,
        error: true,
        errorMessage: "PriceDisplay is Required",
      });
      return false;
    }
    if (
      !["DollarPerOz", "DollarPerPiece", "Percentage", "All-in"].includes(
        skuRelation.priceDisplay,
      )
    ) {
      setShowAlert({
        show: true,
        error: true,
        errorMessage:
          "PriceDisplay must be one of: DollarPerOz, DollarPerPiece, Percentage, All-in",
      });
      return false;
    }
    if (skuRelation.metal == undefined) {
      setShowAlert({
        show: true,
        error: true,
        errorMessage: "Metal is Required",
      });
      return false;
    }
    if (skuRelation.category == undefined) {
      setShowAlert({
        show: true,
        error: true,
        errorMessage: "Category is Required",
      });
      return false;
    }
    if (skuRelation.subCategory == undefined) {
      setShowAlert({
        show: true,
        error: true,
        errorMessage: "Sub Category is Required",
      });
      return false;
    }
    return true;
  };
  return (
    <>
      <RowContainer type={type}>
        <>
          <StyledTableCell>
            <SkuMetaInput
              index={index}
              label={"Aurbitrage SKU"}
              value={skuRelation?.aurbitrageSku}
              suggestions={aurbitrageSKUMeta.AurbitrageSkus.map((a) => a?.sku)}
              onChange={(v) => {
                updateSkuRelation(v, "aurbitrageSku");
              }}
              allowCustomInput={true}
              required={true}
            />
          </StyledTableCell>

          <StyledTableCell>
            <SkuMetaInput
              index={index}
              label={"Price Display"}
              value={skuRelation?.priceDisplay}
              suggestions={[
                "DollarPerOz",
                "DollarPerPiece",
                "Percentage",
                "All-in",
              ]}
              onChange={(v) => {
                updateSkuRelation(v, "priceDisplay");
              }}
              required={true}
            />
          </StyledTableCell>
          <StyledTableCell>
            <SkuMetaInput
              index={index}
              label={"Metal"}
              value={skuRelation?.metal}
              suggestions={[
                "Gold",
                "Palladium",
                "Platinum",
                "Copper",
                "Silver",
              ]}
              onChange={(v) => {
                updateSkuRelation(v, "metal");
              }}
              required={true}
            />
          </StyledTableCell>
          <StyledTableCell>
            <SkuMetaInput
              index={index}
              label={"Category"}
              value={skuRelation?.category}
              suggestions={aurbitrageSKUMeta.Categories}
              onChange={(v) => {
                updateSkuRelation(v, "category");
              }}
              allowCustomInput={true}
              required={true}
            />
          </StyledTableCell>
          <StyledTableCell>
            <SkuMetaInput
              index={index}
              label={"Sub Category"}
              value={skuRelation?.subCategory}
              suggestions={aurbitrageSKUMeta.SubCategories}
              onChange={(v) => {
                updateSkuRelation(v, "subCategory");
              }}
              allowCustomInput={true}
              required={true}
            />
          </StyledTableCell>
          <StyledTableCell>
            <SkuMetaInput
              index={index}
              label={"Type"}
              value={skuRelation?.type || ""}
              suggestions={aurbitrageSKUMeta.type}
              onChange={(v) => {
                updateSkuRelation(v, "type");
              }}
              allowCustomInput={true}
              required={true}
            />
          </StyledTableCell>

          <StyledTableCell>
            <SkuMetaInput
              index={index}
              label={"Mint"}
              value={skuRelation?.mint || ""}
              suggestions={aurbitrageSKUMeta.mint}
              onChange={(v) => {
                updateSkuRelation(v, "mint");
              }}
              allowCustomInput={true}
              required={true}
            />
          </StyledTableCell>
          {createSKURelation && (
            <StyledTableCell>
              <SkuMetaInput
                index={index}
                label={"Equivalent Oz"}
                value={skuRelation?.equivalentOz || ""}
                suggestions={aurbitrageSKUMeta.equivalentOz}
                onChange={(v) => {
                  updateSkuRelation(v, "equivalentOz");
                }}
                allowCustomInput={true}
                required={true}
              />
            </StyledTableCell>
          )}
          <StyledTableCell className="ButtonsCell">
            {loading !== "loading" ? (
              <>
                <FontAwesomeIcon
                  size="xl"
                  icon={faSave}
                  title="Save"
                  color={hasUnsavedChanges ? "Green" : "white"}
                  className="SaveIcon"
                  onClick={() => {
                    setHasUnsavedChanges(false);
                    if (!checkRequiredFields()) {
                      return;
                    } else {
                      createAurbitrageSKU(skuRelation);
                    }
                  }}
                  required={true}
                />
              </>
            ) : (
              <CircularProgress className="CircularBar" />
            )}

            <Tooltip title="Close">
              <CancelOutlinedIcon
                className="CancelIcon"
                onClick={() => {
                  if (type == "header") {
                    setCreateSKURelation((prev) => !prev);
                  } else {
                    if (onCancel) {
                      if (hasUnsavedChanges) {
                        const confirm = window.confirm(
                          "Are you sure you want to discard unsaved changes?",
                        );
                        if (!confirm) {
                          return;
                        }
                      }
                      onCancel();
                    }
                  }
                }}
              />
            </Tooltip>

            {type !== "header" && (
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                title="Additional Attributes"
                color="white"
                size="xl"
                icon={faClipboardList}
                onClick={handleOpen}
              />
            )}
          </StyledTableCell>
        </>
      </RowContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <IconButton className="CloseButtonStyle" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} title="Close" size="lg" />
          </IconButton>
          <IconButton
            className="SaveButtonStyle"
            onClick={() => {
              const updatedSkuRelation = {
                ...skuRelation,
                ...skuRelationAttributes,
              };
              setSKURelation(updatedSkuRelation);
              handleClose();
            }}
          >
            <FontAwesomeIcon icon={faSave} title="Save" size="lg" />
          </IconButton>
          <Typography variant="h5" className="TitleStyle">
            Attributes
          </Typography>
          {[
            "aurbitrageSku",
            "equivalentOz",
            "priceDisplay",
            "metal",
            "category",
            "subCategory",
            "type",
            "coreColor",
            "designation",
            "labelType",
            "labelSignature",
            "gradingService",
            "keywords",
            "mint",
            "year",
          ].map((item, index) => (
            <div key={item} style={{ marginBottom: "20px" }}>
              <SkuMetaInput
                index={index}
                label={item.replace(/_/g, " ")}
                value={skuRelation?.[item] || ""}
                onChange={(v) => {
                  updateSkuRelationAttributes(v, item);
                }}
                allowCustomInput={true}
                suggestions={
                  item === "priceDisplay"
                    ? ["DollarPerOz", "DollarPerPiece", "Percentage", "All-in"]
                    : undefined
                }
              />
            </div>
          ))}
        </StyledBox>
      </Modal>
      <Snackbar
        open={showAlert.show}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={hideAlert}
      >
        <Alert
          onClose={hideAlert}
          severity={showAlert.error ? "error" : "success"}
          variant="filled"
        >
          {showAlert.error ? showAlert.errorMessage : "SKU Assigned"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateAurbitrageSKURow;
