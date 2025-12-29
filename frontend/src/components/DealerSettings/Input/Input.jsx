import { TextField } from "@mui/material";
import { Stylediv, InputLabel, Required, Error, InputIcon } from "./styles";

export const Input = ({
  Icon,
  placeholder,
  labelname,
  required,
  register,
  name,
  validationRules,
  errors,
  error,
}) => {
  return (
    <Stylediv>
      <InputLabel>
        {labelname} {required ? <Required>*</Required> : ""}
      </InputLabel>
      <TextField
        {...register(name, validationRules)}
        fullWidth
        variant="standard"
        placeholder={placeholder}
        InputProps={{
          startAdornment: Icon ? (
            <InputIcon position="start">
              <Icon />
            </InputIcon>
          ) : (
            ""
          ),
          disableUnderline: true,
        }}
      />
      {error && <Error>{error}</Error>}
    </Stylediv>
  );
};
