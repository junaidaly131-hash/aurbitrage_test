import { useState, useEffect } from "react";
import { CircularProgress, Alert, Snackbar, Grid } from "@mui/material";
import {
  SKUTableCell,
  SKUFormField,
  SKUModalContainer,
  SKUAutocomplete,
  StyledModal,
} from "./styles";
import { AddButton } from "../styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCreateAurbitrageSKU from "../../admin-dashboard/hooks/useCreateAurbitrageSKU";
import useEditAurbitrageSKU from "../../admin-dashboard/hooks/useEditAurbitrageSKU";
import DeleteSKUDialog from "./DeleteSKUDialog";

const AddSKU = ({
  AurbitrageSKUMeta,
  createSKU,
  setCreateSKU,
  editData,
  updateChanges,
}) => {
  const [showAlert, setShowAlert] = useState({ show: false, error: false });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const validationSchema = yup.object().shape({
    aurbitrageSku: yup.string().required("AurbitrageSku is required"),
    priceDisplay: yup
      .string()
      .oneOf(
        ["DollarPerOz", "DollarPerPiece", "Percentage", "All-in"],
        "Price display must be one of: DollarPerOz, DollarPerPiece, Percentage, All-in",
      )
      .required("PriceDisplay is required"),
    metal: yup.string().required("Metal is required"),
    category: yup.string().required("Category is required"),
    subCategory: yup.string().required("Sub Category is required"),
    type: yup.string(),
    mint: yup.string(),
    equivalentOz: yup.string().required("EquivalentOz is required"),
  });

  const createHook = useCreateAurbitrageSKU();
  const editHook = useEditAurbitrageSKU();

  const isEditing = !!editData;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      aurbitrageSku: editData?.aurbitrageSku || "",
      priceDisplay: editData?.priceDisplay || "",
      metal: editData?.metal || "",
      category: editData?.category || "",
      subCategory: editData?.subCategory || "",
      type: editData?.type || "",
      mint: editData?.mint || "",
      equivalentOz: editData?.equivalentOz || "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (editData) {
      reset({
        aurbitrageSku: editData.aurbitrageSku || "",
        priceDisplay: editData.priceDisplay || "",
        metal: editData.metal || "",
        category: editData.category || "",
        subCategory: editData.subCategory || "",
        type: editData.type || "",
        mint: editData.mint || "",
        equivalentOz: editData.equivalentOz || "",
      });
    }
  }, [editData, reset]);

  const submitAction = isEditing ? editHook.postData : createHook.postData;
  const loading = isEditing ? editHook.loading : createHook.loading;

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        const hasChanges = Object.keys(data).some(
          (key) => data[key] !== editData[key],
        );

        if (!hasChanges) {
          setShowAlert({
            show: true,
            error: false,
            message: "No changes detected",
          });
          setTimeout(() => {
            setCreateSKU(false);
          }, 3000);
          return;
        }
      }
      const payload = { ...editData, ...data };
      await submitAction(payload);
      updateChanges(payload);

      setShowAlert({
        show: true,
        error: false,
        message: isEditing
          ? "SKU Updated Successfully"
          : "SKU Created Successfully",
      });
      setTimeout(() => {
        setCreateSKU(false);
      }, 3000);
    } catch (err) {
      setShowAlert({
        show: true,
        error: true,
        errorMessage:
          err.message || `Failed to ${isEditing ? "update" : "save"} SKU`,
      });
    }
  };

  const handleDeleteSuccess = () => {
    setShowAlert({
      show: true,
      error: false,
      message: "SKU deleted successfully",
    });
    updateChanges({ ...editData, deleted: true });
    setTimeout(() => {
      setCreateSKU(false);
    }, 3000);
  };

  if (!createSKU) {
    return null;
  }

  return (
    <>
      <StyledModal
        open={createSKU}
        onClose={() => setCreateSKU(false)}
        aria-labelledby="add-sku-modal"
        aria-describedby="modal-to-add-new-sku"
      >
        <SKUModalContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <SKUTableCell item xs={6} className="StyledTableCell">
                <Controller
                  name="aurbitrageSku"
                  control={control}
                  render={({ field }) => (
                    <SKUAutocomplete
                      {...field}
                      disablePortal
                      freeSolo
                      id="aurbitrage-sku-autocomplete"
                      options={
                        AurbitrageSKUMeta?.AurbitrageSkus?.map((a) => a?.sku) ||
                        []
                      }
                      getOptionLabel={(option) => option || ""}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue || "")}
                      onInputChange={(_, newInputValue) => {
                        field.onChange(newInputValue || "");
                      }}
                      renderInput={(params) => (
                        <SKUFormField
                          {...params}
                          label="Aurbitrage SKU"
                          variant="standard"
                          error={!!errors.aurbitrageSku}
                          helperText={errors.aurbitrageSku?.message}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </SKUTableCell>

              <SKUTableCell item xs={6} className="StyledTableCell">
                <Controller
                  name="priceDisplay"
                  control={control}
                  render={({ field }) => (
                    <SKUAutocomplete
                      {...field}
                      disablePortal
                      freeSolo
                      id="price-display-autocomplete"
                      options={[
                        "DollarPerOz",
                        "DollarPerPiece",
                        "Percentage",
                        "All-in",
                      ]}
                      getOptionLabel={(option) => option || ""}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue || "")}
                      onInputChange={(_, newInputValue) => {
                        field.onChange(newInputValue || "");
                      }}
                      renderInput={(params) => (
                        <SKUFormField
                          {...params}
                          label="Price Display"
                          variant="standard"
                          error={!!errors.priceDisplay}
                          helperText={errors.priceDisplay?.message}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </SKUTableCell>

              <SKUTableCell item xs={6} className="StyledTableCell">
                <Controller
                  name="metal"
                  control={control}
                  render={({ field }) => (
                    <SKUAutocomplete
                      {...field}
                      disablePortal
                      id="metal-autocomplete"
                      options={[
                        "Gold",
                        "Palladium",
                        "Platinum",
                        "Copper",
                        "Silver",
                      ]}
                      getOptionLabel={(option) => option || ""}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue || "")}
                      renderInput={(params) => (
                        <SKUFormField
                          {...params}
                          label="Metal"
                          variant="standard"
                          error={!!errors.metal}
                          helperText={errors.metal?.message}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </SKUTableCell>

              <SKUTableCell item xs={6} className="StyledTableCell">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <SKUAutocomplete
                      {...field}
                      disablePortal
                      freeSolo
                      id="category-autocomplete"
                      options={AurbitrageSKUMeta?.Categories || []}
                      getOptionLabel={(option) => option || ""}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue || "")}
                      onInputChange={(_, newInputValue) => {
                        field.onChange(newInputValue || "");
                      }}
                      renderInput={(params) => (
                        <SKUFormField
                          {...params}
                          label="Category"
                          variant="standard"
                          error={!!errors.category}
                          helperText={errors.category?.message}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </SKUTableCell>

              <SKUTableCell item xs={6} className="StyledTableCell">
                <Controller
                  name="subCategory"
                  control={control}
                  render={({ field }) => (
                    <SKUAutocomplete
                      {...field}
                      disablePortal
                      freeSolo
                      id="sub-category-autocomplete"
                      options={AurbitrageSKUMeta?.SubCategories || []}
                      getOptionLabel={(option) => option || ""}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue || "")}
                      onInputChange={(_, newInputValue) => {
                        field.onChange(newInputValue || "");
                      }}
                      renderInput={(params) => (
                        <SKUFormField
                          {...params}
                          label="Sub Category"
                          variant="standard"
                          error={!!errors.subCategory}
                          helperText={errors.subCategory?.message}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </SKUTableCell>

              <SKUTableCell item xs={6} className="StyledTableCell">
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <SKUFormField
                      {...field}
                      id="type-input"
                      variant="standard"
                      label="Type"
                      error={!!errors.type}
                      helperText={errors.type?.message}
                      fullWidth
                    />
                  )}
                />
              </SKUTableCell>

              <SKUTableCell item xs={6} className="StyledTableCell">
                <Controller
                  name="mint"
                  control={control}
                  render={({ field }) => (
                    <SKUAutocomplete
                      {...field}
                      disablePortal
                      freeSolo
                      id="mint-autocomplete"
                      options={AurbitrageSKUMeta?.mint || []}
                      getOptionLabel={(option) => option || ""}
                      value={field.value}
                      onChange={(_, newValue) => field.onChange(newValue || "")}
                      onInputChange={(_, newInputValue) => {
                        field.onChange(newInputValue || "");
                      }}
                      renderInput={(params) => (
                        <SKUFormField
                          {...params}
                          label="Mint"
                          variant="standard"
                          error={!!errors.mint}
                          helperText={errors.mint?.message}
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </SKUTableCell>

              <SKUTableCell item xs={6} className="StyledTableCell">
                <Controller
                  name="equivalentOz"
                  control={control}
                  render={({ field }) => (
                    <SKUFormField
                      {...field}
                      id="equivalent-oz"
                      variant="standard"
                      label="Equivalent Oz"
                      error={!!errors.equivalentOz}
                      helperText={errors.equivalentOz?.message}
                      fullWidth
                    />
                  )}
                />
              </SKUTableCell>

              <Grid item xs={12} className="ButtonsContainer">
                <AddButton
                  type="submit"
                  disabled={loading === "loading"}
                  sx={{ marginRight: 2 }}
                >
                  {loading === "loading" ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Save"
                  )}
                </AddButton>
                {isEditing && (
                  <AddButton
                    danger
                    onClick={() => setShowDeleteDialog(true)}
                    sx={{ marginRight: 2 }}
                  >
                    Delete
                  </AddButton>
                )}
                <AddButton danger onClick={() => setCreateSKU(false)}>
                  Cancel
                </AddButton>
              </Grid>
            </Grid>
          </form>
        </SKUModalContainer>
      </StyledModal>

      <DeleteSKUDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        skuId={editData?.id}
        onSuccess={handleDeleteSuccess}
      />

      <Snackbar
        open={showAlert.show}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setShowAlert({ show: false, error: false })}
      >
        <Alert
          onClose={() => setShowAlert({ show: false, error: false })}
          severity={showAlert.error ? "error" : "success"}
          variant="filled"
        >
          {showAlert.error
            ? showAlert.errorMessage
            : showAlert.message || "SKU Created Successfully"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddSKU;
