import React, { useState, useRef, useEffect, useCallback } from "react";
import { Avatar, Box, CircularProgress, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { createPortal } from "react-dom";
import useSearchUsersForTagging from "../../../Hooks/useSearchUsersForTagging";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgb(25, 25, 25)",
    color: "#fff",
    borderRadius: "12px",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    color: "#fff",
    "&::placeholder": {
      color: "#999",
      opacity: 1,
    },
  },
}));

const AutocompleteContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  backgroundColor: "#444",
  borderRadius: "8px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
  zIndex: 9999,
  maxHeight: "160px",
  overflowY: "auto",
  border: "1px solid #555",
  minWidth: "200px",
  maxWidth: "320px",
  backdropFilter: "blur(10px)",
  transition: "all 0.2s ease-in-out",
  // Custom scrollbar
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#666",
    borderRadius: "4px",
    "&:hover": {
      background: "#777",
    },
  },
}));

const UserItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px 12px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  position: "relative",
  "&:hover": {
    backgroundColor: "#555",
    transform: "translateX(2px)",
  },
  "&.selected": {
    backgroundColor: "#DBA42D",
    color: "#000",
    transform: "translateX(2px)",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "3px",
      backgroundColor: "#B8860B",
    },
  },
  borderBottom: "1px solid #555",
  "&:last-child": {
    borderBottom: "none",
  },
  "&:first-of-type": {
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  "&:last-of-type": {
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  },
}));

const UserInfo = styled(Box)(({ theme }) => ({
  marginLeft: "6px",
  flex: 1,
}));

const UserName = styled("div")(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "600",
  color: "inherit",
  lineHeight: "1.1",
}));

const DealerName = styled("div")(({ theme }) => ({
  fontSize: "10px",
  color: "#999",
  marginTop: "0px",
  lineHeight: "1.1",
}));

const UserTaggingInput = ({
  value,
  onChange,
  onTaggedUsersChange,
  placeholder = "Type your comment..",
  disabled = false,
  onEmojiClick,
  InputProps = {},
  ...props
}) => {
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [displayValue, setDisplayValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const { users, loading, searchUsers, clearUsers } =
    useSearchUsersForTagging();

  const debouncedSearch = useCallback(
    (term) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        if (term.length > 0) {
          searchUsers(term, 10);
        } else {
          clearUsers();
        }
      }, 300);
    },
    [searchUsers, clearUsers],
  );

  const extractTaggedUserIds = useCallback((text) => {
    if (!text) return [];

    const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
    const userIds = [];
    let match;

    mentionRegex.lastIndex = 0;

    while ((match = mentionRegex.exec(text)) !== null) {
      const userId = parseInt(match[2]);
      if (!userIds.includes(userId)) {
        userIds.push(userId);
      }
    }

    return userIds;
  }, []);

  const convertToDisplayValue = useCallback((text) => {
    if (!text) return "";
    return text;
  }, []);

  useEffect(() => {
    if (!isComposing) {
      setDisplayValue(convertToDisplayValue(value));
    }
  }, [value, convertToDisplayValue, isComposing]);

  const handleInputChange = (event) => {
    if (disabled) {
      return;
    }

    const newDisplayValue = event.target.value;
    const cursorPos = event.target.selectionStart;

    setDisplayValue(newDisplayValue);
    setCursorPosition(cursorPos);

    if (!newDisplayValue.includes("@")) {
      onChange(newDisplayValue);
      setTaggedUsers([]);
      onTaggedUsersChange?.([]);
      setShowAutocomplete(false);
      clearUsers();
      return;
    }

    onChange(newDisplayValue);

    const updatedUserIds = extractTaggedUserIds(newDisplayValue);
    setTaggedUsers(updatedUserIds);
    onTaggedUsersChange?.(updatedUserIds);

    const textBeforeCursor = newDisplayValue.slice(0, cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf("@");

    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1);
      if (!textAfterAt.includes(" ") && !textAfterAt.includes("\n")) {
        setSearchTerm(textAfterAt);

        if (inputRef.current) {
          const inputRect = inputRef.current.getBoundingClientRect();
          setDropdownPosition({
            top: inputRect.bottom + 4,
            left: inputRect.left,
            width: inputRect.width,
          });
        }

        setShowAutocomplete(true);
        setSelectedIndex(-1);

        debouncedSearch(textAfterAt);
      } else {
        setShowAutocomplete(false);
        clearUsers();
      }
    } else {
      setShowAutocomplete(false);
      clearUsers();
    }
  };

  const handleUserSelect = (user) => {
    const textBeforeCursor = displayValue.slice(0, cursorPosition);
    const textAfterCursor = displayValue.slice(cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf("@");

    if (lastAtIndex !== -1) {
      const beforeAt = textBeforeCursor.slice(0, lastAtIndex);
      const mention = `@[${user.fullName}](${user.id})`;

      const newValue = beforeAt + mention + " " + textAfterCursor;
      onChange(newValue);
      setDisplayValue(newValue);

      const userIds = extractTaggedUserIds(newValue);
      setTaggedUsers(userIds);
      onTaggedUsersChange?.(userIds);

      setShowAutocomplete(false);
      clearUsers();

      requestAnimationFrame(() => {
        if (inputRef.current) {
          const newCursorPos = beforeAt.length + mention.length + 1;
          inputRef.current.focus();
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          setCursorPosition(newCursorPos);
        }
      });
    }
  };

  const handleKeyDown = (event) => {
    if (disabled) {
      return;
    }

    if (showAutocomplete && users.length > 0) {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) => (prev < users.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : users.length - 1));
          break;
        case "Enter":
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < users.length) {
            handleUserSelect(users[selectedIndex]);
          }
          break;
        case "Escape":
          setShowAutocomplete(false);
          clearUsers();
          break;
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideInput =
        containerRef.current && containerRef.current.contains(event.target);
      const isClickInsideDropdown =
        dropdownRef.current && dropdownRef.current.contains(event.target);

      if (!isClickInsideInput && !isClickInsideDropdown) {
        setShowAutocomplete(false);
        clearUsers();
      }
    };

    const handleScroll = (event) => {
      if (showAutocomplete) {
        const isDropdownScroll =
          dropdownRef.current && dropdownRef.current.contains(event.target);

        if (!isDropdownScroll) {
          setShowAutocomplete(false);
          clearUsers();
        }
      }
    };

    const handleResize = () => {
      if (showAutocomplete) {
        if (inputRef.current) {
          const inputRect = inputRef.current.getBoundingClientRect();
          setDropdownPosition({
            top: inputRect.bottom + 4,
            left: inputRect.left,
            width: inputRect.width,
          });
        }
      }
    };

    if (showAutocomplete) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [showAutocomplete, clearUsers]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Box
        ref={containerRef}
        position="relative"
        width="100%"
        sx={{ isolation: "isolate" }}
      >
        <StyledTextField
          {...props}
          fullWidth
          inputRef={inputRef}
          disabled={disabled}
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
          InputProps={{
            disableUnderline: true,
            ...InputProps,
            style: {
              padding: "5px",
              ...InputProps.style,
            },
          }}
        />
      </Box>

      {showAutocomplete &&
        createPortal(
          <AutocompleteContainer
            ref={dropdownRef}
            data-autocomplete-dropdown
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: Math.max(dropdownPosition.width, 200),
            }}
          >
            {loading ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                gap={1}
              >
                <CircularProgress size={16} sx={{ color: "#DBA42D" }} />
                <Box fontSize="12px" color="#ccc">
                  Searching users...
                </Box>
              </Box>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <UserItem
                  key={user.id}
                  className={index === selectedIndex ? "selected" : ""}
                  onClick={() => handleUserSelect(user)}
                >
                  <Avatar
                    src={user.profileImage || undefined}
                    alt={user.fullName}
                    sx={{ width: 26, height: 26, fontSize: "11px" }}
                  >
                    {user.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                  <UserInfo>
                    <UserName>{user.fullName}</UserName>
                    <DealerName>{user.dealerName}</DealerName>
                  </UserInfo>
                </UserItem>
              ))
            ) : searchTerm ? (
              <Box
                p={2}
                textAlign="center"
                color="#999"
                fontSize="12px"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Box sx={{ opacity: 0.7 }}>🔍</Box>
                <Box>No users found for "{searchTerm}"</Box>
              </Box>
            ) : null}
          </AutocompleteContainer>,
          document.body,
        )}
    </>
  );
};

export default UserTaggingInput;
