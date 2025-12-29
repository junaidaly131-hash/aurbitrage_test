import React, { useEffect } from "react";
import {
  AuthorizedGrid,
  AuthorizedHeading,
  Error,
  Loader,
  RefreshBtn,
  Stylediv,
} from "./styles";
import { Grid } from "@mui/material";
import CheckBox from "../Checkbox";
import { useFormContext } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import useGetAuthorizations from "@/pages/Dealer/Hooks/useGetAuthorizations";

export const Distributers = () => {
  const { setValue, watch } = useFormContext();
  const mints = watch("authorizations") || [];
  const { data, loading, error, fetchAuthorizations } = useGetAuthorizations();

  useEffect(() => {
    fetchAuthorizations();
  }, [fetchAuthorizations]);

  const handleAuthorized = (value) => (e) => {
    const { checked } = e.target;
    const { id } = value;
    const filters = checked
      ? [...mints, id]
      : mints.filter((item) => item !== id);

    setValue("authorizations", filters);
  };

  const refreshAuthorizations = () => {
    fetchAuthorizations();
  };

  return (
    <>
      <Stylediv>
        <AuthorizedHeading>
          Share if you are Authorized Distributors for the following
          mints/refineries
        </AuthorizedHeading>
      </Stylediv>

      <Stylediv>
        <AuthorizedGrid container spacing={2}>
          {error && !loading ? (
            <Grid item xs={12}>
              <Error>{error}</Error>
              <Stylediv>
                <RefreshBtn onClick={refreshAuthorizations}>
                  Try again
                </RefreshBtn>
              </Stylediv>
            </Grid>
          ) : (
            <>
              {data.map((mint) => (
                <Grid item xs={12} sm={6} md={4} key={`mint-${mint.id}`}>
                  <CheckBox
                    label={mint.name}
                    value={mints?.includes(mint.id) || false}
                    onChange={handleAuthorized(mint)}
                    checked={mints?.includes(mint.id) || false}
                  />
                </Grid>
              ))}
            </>
          )}

          {loading && (
            <Loader item xs={12}>
              <CircularProgress size={32} />
            </Loader>
          )}
        </AuthorizedGrid>
      </Stylediv>
    </>
  );
};
