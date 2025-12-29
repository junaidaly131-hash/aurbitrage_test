import React from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const MembersModal = ({ open, onClose, members, loading, error }) => {
  const theme = useTheme();
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: "15px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Group Members
        </Typography>
        {loading && <CircularProgress sx={{ color: "#DBA42D" }} />}
        {error && <Typography color="error">Failed to load members</Typography>}
        {!loading && !error && (
          <List>
            {members.map((member) => (
              <ListItem key={member.id}>
                <Stack
                  direction={"row"}
                  spacing={1}
                  sx={{ marginBottom: "5px" }}
                  alignContent={"center"}
                >
                  <Box>
                    <Avatar
                      alt={member.name}
                      sx={{ width: 35, height: 35 }}
                      src={""}
                    />
                  </Box>
                  <Stack spacing={0.1}>
                    <Typography variant="subtitle2" sx={{ color: "white" }}>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.secondary.main,
                        lineHeight: "0.5em",
                      }}
                    >
                      {member.dealerName}
                    </Typography>
                  </Stack>
                </Stack>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Modal>
  );
};

export default MembersModal;
