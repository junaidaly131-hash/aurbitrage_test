import { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import Checkbox from "../Checkbox";
import {
  Stylediv,
  AuthorizedHeading,
  AuthorizedGrid,
  AuthorizedPara,
  AddIndustryAffiliations,
  Loader,
  Error,
  RefreshBtn,
} from "./styles";
import Popup from "../Popup";
import useGetAffiliations from "@/pages/Dealer/Hooks/useGetAffiliations";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

export const Affiliations = () => {
  const { id } = useParams();
  const [affliations, setAffiliations] = useState([]);

  const { setValue, watch } = useFormContext();
  const { data, loading, error, fetchAffiliations } = useGetAffiliations();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && data) {
      setAffiliations(data);
    }
  }, [data, loading]);

  const addAffliation = (value) => {
    setAffiliations((prev) => [...prev, value]);
  };
  const refreshAffiliations = () => {
    fetchAffiliations(id);
  };
  const formAffiliations = watch("affiliations") || [];
  const handleAffliation = (value) => (e) => {
    const { checked } = e.target;
    const { id } = value;
    const filters = checked
      ? [...formAffiliations, id]
      : formAffiliations.filter((item) => item !== id);

    setValue("affiliations", filters);
  };
  return (
    <>
      <Stylediv>
        <AuthorizedHeading>Share your Industry Affiliations</AuthorizedHeading>
      </Stylediv>
      <Stylediv>
        <AuthorizedGrid container spacing={2}>
          {error && !loading && (
            <Grid item xs={12}>
              <Error>{error}</Error>
              <Stylediv>
                <RefreshBtn onClick={refreshAffiliations}>try again</RefreshBtn>
              </Stylediv>
            </Grid>
          )}
          {affliations.map((affiliation) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={`affiliation-${affiliation.id}`}
            >
              <Checkbox
                label={affiliation.name}
                checked={formAffiliations?.includes(affiliation.id)}
                onChange={handleAffliation(affiliation)}
                icon={affiliation.logo}
              />
            </Grid>
          ))}
          {loading && (
            <Loader item xs={12}>
              <CircularProgress size={32} />
            </Loader>
          )}
        </AuthorizedGrid>
      </Stylediv>
      {error ? (
        ""
      ) : (
        <>
          <Stylediv>
            <AuthorizedPara>
              Can&apos;t Find your Industry Affiliations
            </AuthorizedPara>
          </Stylediv>
          <Stylediv>
            <AddIndustryAffiliations
              type="button"
              onClick={() => {
                setOpen(!open);
              }}
            >
              Add your Own Industry Affiliations
            </AddIndustryAffiliations>
          </Stylediv>
        </>
      )}

      {open ? (
        <Popup
          open={open}
          addAffliation={addAffliation}
          onClose={() => {
            setOpen(false);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};
