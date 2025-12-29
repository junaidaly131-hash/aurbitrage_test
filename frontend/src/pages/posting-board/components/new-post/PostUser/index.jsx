import { useAuth } from "@/Context/AuthContext";
import { DealerName, Image, Profile, UserName } from "./styles";
import { Box } from "@mui/material";

const PostUser = () => {
  const { userName, dealerName, profileImage } = useAuth();
  return (
    <Profile>
      <Image src={profileImage || undefined} />
      <Box>
        <UserName variant="h3">{userName}</UserName>
        <DealerName variant="body2">{dealerName}</DealerName>
      </Box>
    </Profile>
  );
};

export default PostUser;
