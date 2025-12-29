import { useFormContext } from "react-hook-form";
import {
  Stylediv,
  PeopleHeading,
  PeoplePara,
  AddPeopleBtn,
  OtherWrapper,
  ErrorWrapper,
  Error,
  RefreshBtn,
} from "./style";
import { useState } from "react";
import PersonPopup from "../PersonPopup";
import { Box } from "@mui/material";
import Peoples from "@/pages/Dealer/Components/Peoples";
export const Info = ({ loading, error, data, refreshUsers }) => {
  const [open, setOpen] = useState(false);

  return (
    <OtherWrapper>
      <Stylediv>
        <PeopleHeading>Info for other people working here </PeopleHeading>
      </Stylediv>
      <Stylediv>
        <PeoplePara>
          Note: Other Aurbitrage members will Auto-populate here. If there is
          anyone in shipping or payments you want to include, you can add them
          here so other people can know who to contact for non-trading
          inquiries.
        </PeoplePara>
      </Stylediv>
      {error ? (
        <ErrorWrapper>
          <Error>{error}</Error>
          <RefreshBtn onClick={refreshUsers}>Try Again</RefreshBtn>
        </ErrorWrapper>
      ) : (
        <>
          <Box>
            <Peoples data={data} />
          </Box>
          <Stylediv>
            <AddPeopleBtn
              type="button"
              onClick={() => {
                setOpen(!open);
              }}
            >
              Add Another Person
            </AddPeopleBtn>
          </Stylediv>
          {open && (
            <PersonPopup
              open={open}
              onClose={() => {
                setOpen(false);
              }}
            />
          )}
        </>
      )}
    </OtherWrapper>
  );
};
