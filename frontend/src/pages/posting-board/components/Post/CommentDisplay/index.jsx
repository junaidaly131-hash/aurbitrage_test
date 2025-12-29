import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Skeleton,
  Portal,
} from "@mui/material";

const CommentTextContainer = styled("span")(({ theme }) => ({
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#fff",
  wordBreak: "break-word",
}));

const TaggedUser = styled("span")(({ theme }) => ({
  color: "#4A90E2",
  fontStyle: "italic",
  fontWeight: "normal",
  cursor: "pointer",
  transition: "color 0.2s ease",
  position: "relative",
  "&:hover": {
    color: "#5BA3F5",
    textDecoration: "underline",
  },
}));

const TaggedDealer = styled("span")(({ theme }) => ({
  color: "#DBA42D",
  fontStyle: "italic",
  fontWeight: "600",
  cursor: "pointer",
  transition: "color 0.2s ease",
  position: "relative",
  "&:hover": {
    color: "#FFB84D",
    textDecoration: "underline",
  },
}));

const TooltipCard = styled(Paper)(({ theme }) => ({
  position: "fixed",
  backgroundColor: "#2a2a2a",
  border: "1px solid #444",
  borderRadius: "8px",
  padding: "12px",
  maxWidth: "280px",
  minWidth: "200px",
  zIndex: 10000,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  transition: "all 0.2s ease-in-out",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
    borderBottom: "8px solid #444",
  },
}));

const TooltipHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
  paddingBottom: "6px",
  borderBottom: "1px solid #444",
}));

const TooltipContent = styled(Box)(({ theme }) => ({
  fontSize: "12px",
  color: "#ccc",
}));

const UserItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 0",
  fontSize: "11px",
  color: "#ddd",
}));

// Custom hook for fetching user details
const useUserDetails = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/user/${userId}`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading };
};

const useDealerDetails = (dealerId) => {
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!dealerId) return;

    const fetchDealer = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/dealer/${dealerId}/users`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setDealer(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching dealer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealer();
  }, [dealerId]);

  return { dealer, loading };
};

const UserTooltip = ({ userId, name, position, onClose }) => {
  const { user, loading } = useUserDetails(userId);

  return (
    <TooltipCard style={{ top: position.top, left: position.left }}>
      <TooltipHeader>
        <Avatar
          src={user?.profileImage}
          sx={{ width: 24, height: 24, fontSize: "10px" }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#4A90E2", fontWeight: 600, fontSize: "12px" }}
          >
            {name}
          </Typography>
          {loading ? (
            <Skeleton width={60} height={12} sx={{ bgcolor: "#444" }} />
          ) : (
            <Typography
              variant="caption"
              sx={{ color: "#999", fontSize: "10px" }}
            >
              {user?.dealer?.dealerName || "Unknown Dealer"}
            </Typography>
          )}
        </Box>
      </TooltipHeader>
      <TooltipContent>
        {loading ? (
          <Box>
            <Skeleton
              width="100%"
              height={12}
              sx={{ bgcolor: "#444", mb: 0.5 }}
            />
            <Skeleton width="80%" height={12} sx={{ bgcolor: "#444" }} />
          </Box>
        ) : (
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#ccc", fontSize: "11px" }}
            >
              Email: {user?.email || "N/A"}
            </Typography>
            <br />
            <Typography
              variant="caption"
              sx={{ color: "#ccc", fontSize: "11px" }}
            >
              Status: {user?.status || "N/A"}
            </Typography>
          </Box>
        )}
      </TooltipContent>
    </TooltipCard>
  );
};

const DealerTooltip = ({ dealerId, name, position, onClose }) => {
  const { dealer, loading } = useDealerDetails(dealerId);

  return (
    <TooltipCard style={{ top: position.top, left: position.left }}>
      <TooltipHeader>
        <Avatar
          src={dealer?.profileImage}
          sx={{ width: 24, height: 24, fontSize: "10px", bgcolor: "#DBA42D" }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#DBA42D", fontWeight: 600, fontSize: "12px" }}
          >
            {name}
          </Typography>
          {loading ? (
            <Skeleton width={60} height={12} sx={{ bgcolor: "#444" }} />
          ) : (
            <Typography
              variant="caption"
              sx={{ color: "#999", fontSize: "10px" }}
            >
              {dealer?.users?.length || 0} users
            </Typography>
          )}
        </Box>
      </TooltipHeader>
      <TooltipContent>
        {loading ? (
          <Box>
            <Skeleton
              width="100%"
              height={12}
              sx={{ bgcolor: "#444", mb: 0.5 }}
            />
            <Skeleton width="80%" height={12} sx={{ bgcolor: "#444" }} />
            <Skeleton width="90%" height={12} sx={{ bgcolor: "#444" }} />
          </Box>
        ) : dealer?.users?.length > 0 ? (
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#999", fontSize: "10px", mb: 1, display: "block" }}
            >
              Team Members:
            </Typography>
            {dealer.users.slice(0, 10).map((user, index) => (
              <UserItem key={user.id}>
                <Avatar
                  src={user.profileImage}
                  sx={{ width: 16, height: 16, fontSize: "8px" }}
                >
                  {user.firstName?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography
                  variant="caption"
                  sx={{ color: "#ddd", fontSize: "10px" }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
              </UserItem>
            ))}
            {dealer.users.length > 10 && (
              <Typography
                variant="caption"
                sx={{
                  color: "#999",
                  fontSize: "9px",
                  mt: 0.5,
                  display: "block",
                }}
              >
                +{dealer.users.length - 10} more users
              </Typography>
            )}
          </Box>
        ) : (
          <Typography
            variant="caption"
            sx={{ color: "#999", fontSize: "11px" }}
          >
            No active users found
          </Typography>
        )}
      </TooltipContent>
    </TooltipCard>
  );
};

const CommentDisplay = ({ commentBody }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipTimeoutRef = useRef(null);

  const handleMouseEnter = (event, type, id, name) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }

    const rect = event.target.getBoundingClientRect();
    const position = {
      top: rect.top - 10, // Position above the element
      left: rect.left + rect.width / 2 - 140, // Center the tooltip
    };

    if (position.left < 10) {
      position.left = 10;
    } else if (position.left + 280 > window.innerWidth) {
      position.left = window.innerWidth - 290;
    }

    if (position.top < 10) {
      position.top = rect.bottom + 10; // Position below if no space above
    }

    setTooltipPosition(position);
    setActiveTooltip({ type, id, name });
  };

  const handleMouseLeave = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 200); // Small delay to allow moving to tooltip
  };

  const handleTooltipMouseEnter = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
  };

  const handleTooltipMouseLeave = () => {
    setActiveTooltip(null);
  };

  const parseCommentText = (text) => {
    if (!text) return text;

    const parts = [];
    const userMentionRegex = /@\[([^\]]+)\]\(user:(\d+)\)/g;
    const dealerMentionRegex = /@\[([^\]]+)\]\(dealer:(\d+)\)/g;
    let lastIndex = 0;
    let match;
    let mentionCounter = 0;

    const allMentions = [];

    userMentionRegex.lastIndex = 0;
    while ((match = userMentionRegex.exec(text)) !== null) {
      allMentions.push({
        type: "user",
        match: match[0],
        name: match[1],
        id: match[2],
        index: match.index,
        length: match[0].length,
      });
    }

    dealerMentionRegex.lastIndex = 0;
    while ((match = dealerMentionRegex.exec(text)) !== null) {
      allMentions.push({
        type: "dealer",
        match: match[0],
        name: match[1],
        id: match[2],
        index: match.index,
        length: match[0].length,
      });
    }

    allMentions.sort((a, b) => a.index - b.index);

    for (const mention of allMentions) {
      if (mention.index > lastIndex) {
        const beforeText = text.slice(lastIndex, mention.index);
        if (beforeText) {
          parts.push(beforeText);
        }
      }

      mentionCounter++;

      if (mention.type === "user") {
        parts.push(
          <TaggedUser
            key={`user-mention-${mention.id}-${mentionCounter}-${mention.index}`}
            title={`Tagged user: ${mention.name}`}
            onMouseEnter={(e) =>
              handleMouseEnter(e, "user", mention.id, mention.name)
            }
            onMouseLeave={handleMouseLeave}
          >
            @{mention.name}
          </TaggedUser>,
        );
      } else {
        parts.push(
          <TaggedDealer
            key={`dealer-mention-${mention.id}-${mentionCounter}-${mention.index}`}
            title={`Tagged dealer: ${mention.name}`}
            onMouseEnter={(e) =>
              handleMouseEnter(e, "dealer", mention.id, mention.name)
            }
            onMouseLeave={handleMouseLeave}
          >
            @{mention.name}
          </TaggedDealer>,
        );
      }

      lastIndex = mention.index + mention.length;
    }

    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      if (remainingText) {
        parts.push(remainingText);
      }
    }

    if (parts.length === 0) {
      return text;
    }

    return parts.map((part, index) => {
      if (React.isValidElement(part)) {
        return part;
      } else {
        return <span key={`text-part-${index}`}>{part}</span>;
      }
    });
  };

  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <CommentTextContainer>
        {parseCommentText(commentBody)}
      </CommentTextContainer>

      {activeTooltip && (
        <Portal>
          <div
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
          >
            {activeTooltip.type === "user" ? (
              <UserTooltip
                userId={activeTooltip.id}
                name={activeTooltip.name}
                position={tooltipPosition}
                onClose={() => setActiveTooltip(null)}
              />
            ) : (
              <DealerTooltip
                dealerId={activeTooltip.id}
                name={activeTooltip.name}
                position={tooltipPosition}
                onClose={() => setActiveTooltip(null)}
              />
            )}
          </div>
        </Portal>
      )}
    </>
  );
};

export default CommentDisplay;
