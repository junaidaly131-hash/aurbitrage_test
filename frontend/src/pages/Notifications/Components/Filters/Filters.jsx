import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { Item, Label, StyledSelect, Wrapper } from "./styles";
import { useNotifications } from "@/Context";

export const Filters = () => {
  const { filter, changeFilter } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    changeFilter(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Wrapper>
      <Label>Show: </Label>
      <FormControl>
        <StyledSelect
          id="sort-filter"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={filter}
          onChange={handleChange}
        >
          <Item value={"latest"}>Latest</Item>
          <Item value={"read"}>Read</Item>
          <Item value={"unread"}>Unread</Item>
        </StyledSelect>
      </FormControl>
    </Wrapper>
  );
};
