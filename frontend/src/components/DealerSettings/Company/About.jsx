import { useFormContext } from "react-hook-form";
import {
  CompanyHeading,
  CompanyPara,
  Error,
  ErrorWrapper,
  RefreshBtn,
  Stylediv,
} from "./style";
import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
export const About = ({ error, loading, getUser }) => {
  const { id } = useParams();
  const { setValue, watch } = useFormContext();
  const about = watch("about");
  const handelclick = () => {
    getUser(id);
  };
  return (
    <>
      <Stylediv>
        <CompanyHeading>Please Share details about your company</CompanyHeading>
      </Stylediv>
      {error ? (
        <ErrorWrapper>
          <Error>{error}</Error>
          <RefreshBtn onClick={handelclick}>Try Again</RefreshBtn>{" "}
        </ErrorWrapper>
      ) : (
        <Stylediv className="text-editor">
          {loading ? (
            <Skeleton height={"280px"} width={"90%"} />
          ) : (
            <CompanyPara
              theme="snow"
              value={about}
              onChange={(value) => {
                setValue("about", value);
              }}
            />
          )}
        </Stylediv>
      )}
    </>
  );
};
