import { useState } from "react";
import useUpdatePassword from "./Hooks/useUpdatePassword";
import {
  ActionButtons,
  InputLabel,
  InputWrapper,
  SaveBtn,
  SectionWrapper,
  SKUFormField,
  StyledHeading,
  Stylediv,
  Wrapper,
} from "./styles";
import toast from "react-hot-toast";

const ResetPass = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { response, loading, error, updatePassword } = useUpdatePassword();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!currentPassword) {
      toast.error("Please Enter Current Password");

      return;
    }
    if (!newPassword) {
      toast.error("Please Enter New Password");
      return;
    }
    if (!confirmNewPassword) {
      toast.error("Please Enter Confirm New Password");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New Password and Confirm New Password do not match");
      return;
    }
    await updatePassword({ currentPassword, newPassword });

    if (error) {
      toast.error(error);
    } else if (response) {
      toast.success("Password updated successfully");
    }
  };

  return (
    <>
      <Stylediv onSubmit={handleSubmit}>
        <SectionWrapper>
          <StyledHeading>Password Reset</StyledHeading>
          <Wrapper direction="column" width="50%">
            <InputWrapper>
              <InputLabel>Current Password</InputLabel>
              <SKUFormField
                fullWidth
                value={currentPassword}
                type="password"
                variant="standard"
                placeholder="Please enter your current password."
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>New Password</InputLabel>
              <SKUFormField
                fullWidth
                value={newPassword}
                type="password"
                variant="standard"
                placeholder="Please enter your new password."
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>Confirm New Password</InputLabel>
              <SKUFormField
                fullWidth
                value={confirmNewPassword}
                type="password"
                variant="standard"
                placeholder="Please enter your confirm new password."
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </InputWrapper>
          </Wrapper>
          <ActionButtons>
            <SaveBtn type="submit" variant="contained">
              {loading ? "loading....." : " Reset Password"}
            </SaveBtn>
          </ActionButtons>
        </SectionWrapper>
      </Stylediv>
    </>
  );
};

export default ResetPass;
