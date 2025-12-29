import { People } from "@mui/icons-material";
import { Avatar, ListItemAvatar, List as MuiList } from "@mui/material";
import { Center, CheckIcon, Label, Li, Wrapper } from "./styles";
import { Checkbox, CircularProgress } from "@mui/material";

const List = ({ chats, groups, loading, toggleCheck, checked, compare }) => {
  const dealerGroups = groups?.filter((group) => group.type === "dealer") || [];
  const combinedList = [...chats, ...dealerGroups];

  return (
    <Wrapper>
      <MuiList>
        {loading ? (
          <Center>
            <CircularProgress size={24} />
          </Center>
        ) : (
          combinedList?.map((chat, index) => {
            const labelId = `chat-list-label-${chat?.name}`;
            const isGroup = chat.chatType === "group" || chat.type === "dealer"; // Ensure dealer groups are treated correctly

            return (
              <Li
                className={`${chat.owner ? "border-b" : ""}`}
                key={(chat?.msgId || `msg-${index + 1}`) + chat?.userId}
                disablePadding
                onClick={toggleCheck(chat)}
                secondaryAction={
                  <CheckIcon>
                    <Checkbox
                      edge="end"
                      color="secondary"
                      checked={checked.some((item) =>
                        compare.some((i) => item[i] === chat[i]),
                      )}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </CheckIcon>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={`Profile ${chat.name}`} src={chat?.profileImage}>
                    {isGroup ? <People /> : null}
                  </Avatar>
                </ListItemAvatar>
                <Label
                  primary={chat.name}
                  secondary={isGroup ? "Dealer" : chat.dealerName}
                />
              </Li>
            );
          })
        )}
      </MuiList>
    </Wrapper>
  );
};

export default List;
