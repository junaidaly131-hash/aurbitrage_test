import { useState, useEffect } from "react";
import { CircularProgress, Grid, MenuItem } from "@mui/material";
import {
  SKUTableCell,
  SKUFormField,
  SKUModalContainer,
  SKUAutocomplete,
  StyledModal,
  AddButton,
  SKUSelect,
} from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCreateAurbitrageSKU from "@/pages/admin-dashboard/hooks/useCreateAurbitrageSKU";
import useEditAurbitrageSKU from "@/pages/admin-dashboard/hooks/useEditAurbitrageSKU";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import RenderIf from "../commom/RenderIf";

const AddCatalogSKU = ({
  AurbitrageSKUMeta,
  createSKU,
  setCreateSKU,
  editData,
  updateChanges,
  setEditData,
  setShowAlert,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(!!editData);

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
    year: yup
      .string()
      .nullable()
      .notRequired()
      .test("is-4-digit-or-empty", "Year must be a 4-digit number", (value) => {
        return !value || /^\d{4}$/.test(value);
      }),

    equivalentOz: yup.string().required("EquivalentOz is required"),
  });

  const createHook = useCreateAurbitrageSKU();
  const editHook = useEditAurbitrageSKU();

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
    if (editData?.aurbitrageSku) {
      reset({
        aurbitrageSku: editData.aurbitrageSku || "",
        priceDisplay: editData.priceDisplay || "",
        metal: editData.metal || "",
        category: editData.category || "",
        subCategory: editData.subCategory || "",
        type: editData.type || "",
        mint: editData.mint || "",
        equivalentOz: editData.equivalentOz || "",
        label: editData?.label || "",
        keywords: editData?.keywords || "",
        gradingService: editData?.gradingService || "",
        year: editData?.year || "",
        labelSignature: editData?.labelSignature || "",
        labelType: editData?.labelType || "",
        coreColor: editData?.coreColor || "",
        designation: editData?.designation || "",
      });
      setIsEditing(true);
    }
  }, [createSKU, editData, reset]);

  const handleCloseModal = () => {
    setCreateSKU(false);
    setIsEditing(false);
    setEditData({});
    reset({
      aurbitrageSku: "",
      priceDisplay: "",
      metal: "",
      category: "",
      subCategory: "",
      type: "",
      mint: "",
      equivalentOz: "",
      label: "",
      keywords: "",
      gradingService: "",
      year: "",
      labelType: "",
      designation: "",
      coreColor: "",
      labelSignature: "",
    });
  };

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
          handleCloseModal();
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
      handleCloseModal();
    } catch (err) {
      setShowAlert({
        show: true,
        error: true,
        errorMessage:
          err.message ||
          err ||
          `Failed to ${isEditing ? "update" : "save"} SKU`,
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

    handleCloseModal();
  };

  if (!createSKU) {
    return null;
  }

  const skuAttributeFields = [
    { name: "label", label: "Label" },
    { name: "keywords", label: "Keywords" },
    { name: "gradingService", label: "Grading Service" },
    { name: "year", label: "Year" },
    { name: "labelType", label: "Label Type" },
    { name: "designation", label: "Designation" },
    { name: "coreColor", label: "Core Color" },
    { name: "labelSignature", label: "Label Signature" },
  ];

  return (
    <>
      <StyledModal
        open={createSKU}
        onClose={() => handleCloseModal()}
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
                    <SKUSelect
                      {...field}
                      select
                      id="price-display"
                      variant="standard"
                      label="Price Display"
                      fullWidth
                      error={!!errors.priceDisplay}
                      helperText={errors.priceDisplay?.message}
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
              <RenderIf isTrue={isEditing}>
                <>
                  {skuAttributeFields.map(({ name, label }) => (
                    <SKUTableCell
                      key={name}
                      item
                      xs={6}
                      className="StyledTableCell"
                    >
                      <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                          <SKUFormField
                            {...field}
                            id={name}
                            variant="standard"
                            label={label}
                            error={!!errors[name]}
                            helperText={errors[name]?.message}
                            fullWidth
                          />
                        )}
                      />
                    </SKUTableCell>
                  ))}
                </>
              </RenderIf>
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

                <RenderIf isTrue={isEditing}>
                  <AddButton
                    danger
                    onClick={() => setShowDeleteDialog(true)}
                    sx={{ marginRight: 2 }}
                  >
                    Delete
                  </AddButton>
                </RenderIf>

                <AddButton danger onClick={() => handleCloseModal()}>
                  Cancel
                </AddButton>
              </Grid>
            </Grid>
          </form>
        </SKUModalContainer>
      </StyledModal>

      <DeleteConfirmationModal
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        skuId={editData?.id}
        onSuccess={handleDeleteSuccess}
        isAurbitrageSku={true}
      />
    </>
  );
};

export default AddCatalogSKU;
