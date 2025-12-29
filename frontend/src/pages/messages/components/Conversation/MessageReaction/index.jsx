import { useState, useRef } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useGetReactors from "../../../hooks/useGetReactors";
import useRemoveReaction from "../../../hooks/useRemoveReaction";
import { useAuth } from "@/Context/AuthContext";
import { ReactBox, ReactBoxWrapper, ReactName, ReactTooltip } from "./style";

// Style components
const ReactorsBox = styled(Box)(({ theme, userId, reactor }) => ({
  cursor: reactor.reactorId === userId ? "pointer" : "default",
  display: "flex",
  "&:hover": {
    backgroundColor:
      reactor.reactorId === userId ? "rgba(0, 0, 0, 0.04)" : "transparent",
  },
}));

const ReactionsBox = styled(Box)(({ theme, chatType }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  borderRadius: "6px",
  backgroundColor: theme.palette.background.overlay,
  border: `1px solid ${theme.palette.background.dark3}`,
  height: "30px",
  cursor: "pointer",
  padding: "6px",
  marginTop: "6px",
  width: "fit-content",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  "& .reactions": {
    display: "inline-flex",
    alignItems: "center",
  },
  "& .reactionCount": {
    marginLeft: "2px",
    color: "#fff",
    fontSize: "9px",
  },
}));

const ReactionTooltip = ({ el, getEmojiIcon, chatType }) => {
  const { getReactors, loading, error, reactors } = useGetReactors();
  const { removeReaction } = useRemoveReaction();
  const [showTooltip, setShowTooltip] = useState(false);
  const { userId } = useAuth();
  const hideTimeoutRef = useRef(null);

  const handleMouseEnter = async () => {
    clearTimeout(hideTimeoutRef.current);
    setShowTooltip(true);
    await getReactors(el.id);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const handleTooltipEnter = () => {
    clearTimeout(hideTimeoutRef.current);
  };

  const handleTooltipLeave = () => {
    setShowTooltip(false);
  };

  const handleReactionClick = async (reactionId) => {
    await removeReaction(reactionId);
  };

  const aggregateReactions = (reactions) => {
    return reactions.reduce((acc, reactionObj) => {
      const existing = acc.find((r) => r.reaction === reactionObj.reaction);
      if (existing) {
        existing.count += reactionObj.count;
      } else {
        acc.push({ ...reactionObj });
      }
      return acc;
    }, []);
  };

  const aggregatedReactions = aggregateReactions(el.reaction);

  return (
    <ReactTooltip
      placement="right-start"
      arrow={false}
      title={
        loading ? (
          <Typography>Loading reactors...</Typography>
        ) : error ? (
          <ReactName color="error">Error loading reactors</ReactName>
        ) : reactors.length > 0 ? (
          <ReactBoxWrapper
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          >
            {reactors.map((reactor) => (
              <ReactorsBox
                userId={userId}
                reactor={reactor}
                key={reactor.id}
                onClick={
                  reactor.reactorId === userId
                    ? () => handleReactionClick(reactor.reactionId)
                    : null
                }
              >
                <ReactBox>
                  <ReactName variant="subtitle2">
                    {reactor.reactorId === userId ? "You" : reactor.reactorName}{" "}
                    {getEmojiIcon(reactor.reaction)}
                  </ReactName>

                  {reactor.reactorId === userId && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        color: "black",
                        fontSize: "10px",
                      }}
                    >
                      Click to remove reaction
                    </Typography>
                  )}
                </ReactBox>
              </ReactorsBox>
            ))}
          </ReactBoxWrapper>
        ) : (
          <Typography>No reactors found</Typography>
        )
      }
      open={showTooltip}
      onOpen={handleMouseEnter}
      onClose={handleMouseLeave}
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 6],
            },
          },
        ],
      }}
    >
      <ReactionsBox
        component="div"
        data-chat-type={chatType}
        chatType={chatType}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {aggregatedReactions.map((reactionObj) => (
          <span
            key={reactionObj.reaction}
            role="img"
            aria-label="reaction"
            className="reactions"
            style={{
              color: reactionObj.reaction === "Emphasize" ? "red" : "inherit",
            }}
          >
            {getEmojiIcon(reactionObj.reaction)}
            {reactionObj.count > 1 && (
              <span className="reactionCount">{reactionObj.count}</span>
            )}
          </span>
        ))}
      </ReactionsBox>
    </ReactTooltip>
  );
};

export default ReactionTooltip;
