import { Box } from "@mui/material";
import { User, Profile, Name, Designation } from "./styles";

const UserProfile = ({ user }) => (
  <User>
    <Profile src={user.profileImage} />
    <Box>
      <Name>
        {user.firstName} {user.lastName}
      </Name>
      <Designation>{user.dealerRole}</Designation>
    </Box>
  </User>
);

export default UserProfile;
