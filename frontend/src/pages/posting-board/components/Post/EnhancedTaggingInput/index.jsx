import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { createPortal } from "react-dom";
import useSearchUsersForTagging from "../../../Hooks/useSearchUsersForTagging";
import useSearchDealersForTagging from "../../../Hooks/useSearchDealersForTagging";
import { Smiley, Buildings } from "phosphor-react";

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

const StyledInputContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  border: `1px solid ${theme.palette.background.dark3}`,
  width: "100%",
  minHeight: "52px",
  borderRadius: "6px",
  padding: "8px 170px 8px 20px",
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#fff",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  overflow: "hidden",
  flexWrap: "wrap",
  display: "flex",
  alignItems: "center",
  "&:focus-within": {
    outline: "none",
  },
}));

const HiddenInput = styled("input")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  background: "transparent",
  border: "none",
  outline: "none",
  fontSize: "14px",
  lineHeight: "1.5",
  padding: "5px",
  color: "transparent",
  caretColor: "#fff",
  "&::placeholder": {
    color: "transparent",
  },
}));

const AutocompleteContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  backgroundColor: "#444",
  borderRadius: "8px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
  zIndex: 9999,
  maxHeight: "200px",
  overflowY: "auto",
  border: "1px solid #555",
  minWidth: "200px",
  maxWidth: "320px",
  backdropFilter: "blur(10px)",
  transition: "all 0.2s ease-in-out",
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

const ItemContainer = styled(Box)(({ theme }) => ({
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

const ItemInfo = styled(Box)(({ theme }) => ({
  marginLeft: "6px",
  flex: 1,
}));

const ItemName = styled("div")(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "600",
  color: "inherit",
  lineHeight: "1.1",
}));

const ItemSubtitle = styled("div")(({ theme }) => ({
  fontSize: "10px",
  color: "#999",
  marginTop: "0px",
  lineHeight: "1.1",
}));

const TypeIndicator = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "10px",
  color: "#DBA42D",
  fontWeight: "500",
}));

const FakeCaret = styled("span")(({ theme }) => ({
  display: "inline-block",
  width: "1px",
  height: "1.2em",
  background: "#fff",
  verticalAlign: "middle",
  animation: "blink-caret 1s steps(1) infinite",
  marginLeft: "-1px",
  position: "relative",
  zIndex: 2,
  "@keyframes blink-caret": {
    "0%, 100%": { opacity: 1 },
    "50%": { opacity: 0 },
  },
}));

const Span = styled("span")({
  display: "flex",
  alignItems: "center",
});

const EnhancedTaggingInput = ({
  value,
  onChange,
  onTaggedUsersChange,
  onTaggedDealersChange,
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
  const [taggedDealers, setTaggedDealers] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [displayValue, setDisplayValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [searchType, setSearchType] = useState("users"); // "users" or "dealers"
  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const hiddenInputRef = useRef(null);
  const userSearchTimeoutRef = useRef(null);
  const dealerSearchTimeoutRef = useRef(null);
  const {
    users,
    loading: usersLoading,
    searchUsers,
    clearUsers,
  } = useSearchUsersForTagging();
  const {
    dealers,
    loading: dealersLoading,
    searchDealers,
    clearDealers,
  } = useSearchDealersForTagging();

  const debouncedSearchUsers = useCallback(
    (term) => {
      if (userSearchTimeoutRef.current) {
        clearTimeout(userSearchTimeoutRef.current);
      }

      userSearchTimeoutRef.current = setTimeout(() => {
        if (term.length > 0) {
          searchUsers(term, 10);
        } else {
          clearUsers();
        }
      }, 300);
    },
    [searchUsers, clearUsers],
  );

  const debouncedSearchDealers = useCallback(
    (term) => {
      if (dealerSearchTimeoutRef.current) {
        clearTimeout(dealerSearchTimeoutRef.current);
      }

      dealerSearchTimeoutRef.current = setTimeout(() => {
        if (term.length > 0) {
          searchDealers(term, 10);
        } else {
          clearDealers();
        }
      }, 300);
    },
    [searchDealers, clearDealers],
  );

  const extractTaggedUserIds = useCallback((text) => {
    if (!text) return [];

    const mentionRegex = /@\[([^\]]+)\]\(user:(\d+)\)/g;
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

  const extractTaggedDealerIds = useCallback((text) => {
    if (!text) return [];

    const dealerMentionRegex = /@\[([^\]]+)\]\(dealer:(\d+)\)/g;
    const dealerIds = [];
    let match;

    dealerMentionRegex.lastIndex = 0;

    while ((match = dealerMentionRegex.exec(text)) !== null) {
      const dealerId = parseInt(match[2]);
      if (!dealerIds.includes(dealerId)) {
        dealerIds.push(dealerId);
      }
    }

    return dealerIds;
  }, []);

  // Function to parse and render styled tags
  const parseAndRenderTags = useCallback((text) => {
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
          >
            @{mention.name}
          </TaggedUser>,
        );
      } else {
        parts.push(
          <TaggedDealer
            key={`dealer-mention-${mention.id}-${mentionCounter}-${mention.index}`}
            title={`Tagged dealer: ${mention.name}`}
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
        return (
          <Span key={`text-part-${index}`} style={{ color: "#fff" }}>
            {part}
          </Span>
        );
      }
    });
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

  useEffect(() => {
    if (hiddenInputRef.current && focused) {
      const selectionStart = hiddenInputRef.current.selectionStart;
      if (selectionStart !== cursorPosition) {
        setCursorPosition(selectionStart);
      }
    }
  }, [focused, cursorPosition]);

  const handleSelectionChange = () => {
    if (hiddenInputRef.current) {
      const selectionStart = hiddenInputRef.current.selectionStart;
      setCursorPosition(selectionStart);
    }
  };

  const getCaretIndexFromClick = (event) => {
    if (!containerRef.current) return displayValue.length;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.visibility = "hidden";
    tempContainer.style.fontSize = "14px";
    tempContainer.style.fontFamily = "inherit";
    tempContainer.style.whiteSpace = "pre-wrap";
    tempContainer.style.wordBreak = "break-word";
    tempContainer.style.padding = "5px";
    tempContainer.style.width = rect.width + "px";

    let caretIdx = displayValue.length;

    let left = 0;
    let right = displayValue.length;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      tempContainer.innerHTML = "";

      const before = displayValue.slice(0, mid);
      const tempSpan = document.createElement("span");
      tempSpan.style.whiteSpace = "pre-wrap";
      tempSpan.style.wordBreak = "break-word";
      tempSpan.textContent = before;
      tempContainer.appendChild(tempSpan);

      document.body.appendChild(tempContainer);
      const width = tempContainer.offsetWidth;
      document.body.removeChild(tempContainer);

      if (width <= x) {
        left = mid + 1;
        caretIdx = mid;
      } else {
        right = mid - 1;
      }
    }

    return Math.min(caretIdx, displayValue.length);
  };

  const renderWithCaret = () => {
    const caretIdx = cursorPosition;
    const before = displayValue.slice(0, caretIdx);
    const after = displayValue.slice(caretIdx);
    return (
      <>
        {parseAndRenderTags(before)}
        {focused && <FakeCaret />}
        {parseAndRenderTags(after)}
      </>
    );
  };

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
      setTaggedDealers([]);
      onTaggedUsersChange?.([]);
      onTaggedDealersChange?.([]);
      setShowAutocomplete(false);
      clearUsers();
      clearDealers();
      return;
    }

    onChange(newDisplayValue);

    const updatedUserIds = extractTaggedUserIds(newDisplayValue);
    const updatedDealerIds = extractTaggedDealerIds(newDisplayValue);
    setTaggedUsers(updatedUserIds);
    setTaggedDealers(updatedDealerIds);
    onTaggedUsersChange?.(updatedUserIds);
    onTaggedDealersChange?.(updatedDealerIds);

    const textBeforeCursor = newDisplayValue.slice(0, cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf("@");

    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1);
      if (!textAfterAt.includes(" ") && !textAfterAt.includes("\n")) {
        setSearchTerm(textAfterAt);
        setSearchType("both"); // Search both users and dealers

        if (containerRef.current) {
          const inputRect = containerRef.current.getBoundingClientRect();
          setDropdownPosition({
            top: inputRect.bottom + 4,
            left: inputRect.left,
            width: inputRect.width,
          });
        }

        setShowAutocomplete(true);
        setSelectedIndex(-1);

        // Search both users and dealers
        debouncedSearchUsers(textAfterAt);
        debouncedSearchDealers(textAfterAt);
      } else {
        setShowAutocomplete(false);
        clearUsers();
        clearDealers();
      }
    } else {
      setShowAutocomplete(false);
      clearUsers();
      clearDealers();
    }
  };

  const handleUserSelect = (user) => {
    const textBeforeCursor = displayValue.slice(0, cursorPosition);
    const textAfterCursor = displayValue.slice(cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf("@");

    if (lastAtIndex !== -1) {
      const beforeAt = textBeforeCursor.slice(0, lastAtIndex);
      const mention = `@[${user.fullName}](user:${user.id})`;

      const newValue = beforeAt + mention + " " + textAfterCursor;
      onChange(newValue);
      setDisplayValue(newValue);

      const userIds = extractTaggedUserIds(newValue);
      setTaggedUsers(userIds);
      onTaggedUsersChange?.(userIds);

      setShowAutocomplete(false);
      clearUsers();

      requestAnimationFrame(() => {
        if (hiddenInputRef.current) {
          const newCursorPos = beforeAt.length + mention.length + 1;
          hiddenInputRef.current.focus();
          hiddenInputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          setCursorPosition(newCursorPos);
        }
      });
    }
  };

  const handleDealerSelect = (dealer) => {
    const textBeforeCursor = displayValue.slice(0, cursorPosition);
    const textAfterCursor = displayValue.slice(cursorPosition);
    const lastAtIndex = textBeforeCursor.lastIndexOf("@");

    if (lastAtIndex !== -1) {
      const beforeAt = textBeforeCursor.slice(0, lastAtIndex);
      const mention = `@[${dealer.dealerName}](dealer:${dealer.id})`;

      const newValue = beforeAt + mention + " " + textAfterCursor;
      onChange(newValue);
      setDisplayValue(newValue);

      const dealerIds = extractTaggedDealerIds(newValue);
      setTaggedDealers(dealerIds);
      onTaggedDealersChange?.(dealerIds);

      setShowAutocomplete(false);
      clearDealers();

      requestAnimationFrame(() => {
        if (hiddenInputRef.current) {
          const newCursorPos = beforeAt.length + mention.length + 1;
          hiddenInputRef.current.focus();
          hiddenInputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          setCursorPosition(newCursorPos);
        }
      });
    }
  };

  const handleKeyDown = (event) => {
    if (disabled) {
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const newPosition =
        event.key === "ArrowLeft"
          ? Math.max(0, cursorPosition - 1)
          : Math.min(displayValue.length, cursorPosition + 1);

      setCursorPosition(newPosition);

      if (hiddenInputRef.current) {
        hiddenInputRef.current.setSelectionRange(newPosition, newPosition);
      }
      return;
    }

    // Combine users and dealers for unified selection
    const combinedItems = [
      ...users.map((u) => ({ ...u, type: "user" })),
      ...dealers.map((d) => ({ ...d, type: "dealer" })),
    ];
    const loading = usersLoading || dealersLoading;

    if (showAutocomplete && combinedItems.length > 0) {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev < combinedItems.length - 1 ? prev + 1 : 0,
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : combinedItems.length - 1,
          );
          break;
        case "Enter":
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < combinedItems.length) {
            const selectedItem = combinedItems[selectedIndex];
            if (selectedItem.type === "dealer") {
              handleDealerSelect(selectedItem);
            } else {
              handleUserSelect(selectedItem);
            }
          }
          break;
        case "Escape":
          setShowAutocomplete(false);
          clearUsers();
          clearDealers();
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
        clearDealers();
      }
    };

    const handleScroll = (event) => {
      if (showAutocomplete) {
        const isDropdownScroll =
          dropdownRef.current && dropdownRef.current.contains(event.target);

        if (!isDropdownScroll) {
          setShowAutocomplete(false);
          clearUsers();
          clearDealers();
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
  }, [showAutocomplete, clearUsers, clearDealers]);

  useEffect(() => {
    return () => {
      if (userSearchTimeoutRef.current) {
        clearTimeout(userSearchTimeoutRef.current);
      }
      if (dealerSearchTimeoutRef.current) {
        clearTimeout(dealerSearchTimeoutRef.current);
      }
    };
  }, []);

  const combinedItems = [
    ...users.map((u) => ({ ...u, type: "user" })),
    ...dealers.map((d) => ({ ...d, type: "dealer" })),
  ];
  const loading = usersLoading || dealersLoading;

  return (
    <>
      <StyledInputContainer
        ref={containerRef}
        tabIndex={0}
        onMouseDown={(e) => {
          e.preventDefault();
          setFocused(true);
          if (hiddenInputRef.current) hiddenInputRef.current.focus();
          const idx = getCaretIndexFromClick(e);
          setCursorPosition(idx);
          setTimeout(() => {
            if (hiddenInputRef.current) {
              hiddenInputRef.current.setSelectionRange(idx, idx);
            }
          }, 0);
        }}
        style={{ cursor: disabled ? "not-allowed" : "text" }}
      >
        {!focused && displayValue.length === 0 ? (
          <Span style={{ color: "#999" }}>{focused || placeholder}</Span>
        ) : (
          renderWithCaret()
        )}
        <HiddenInput
          ref={hiddenInputRef}
          disabled={disabled}
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSelectionChange={handleSelectionChange}
          style={{ width: "100%", height: "100%" }}
        />
      </StyledInputContainer>

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
                  Searching...
                </Box>
              </Box>
            ) : combinedItems.length > 0 ? (
              combinedItems.map((item, index) => (
                <ItemContainer
                  key={`${item.type}-${item.id}`}
                  className={index === selectedIndex ? "selected" : ""}
                  onClick={() =>
                    item.type === "dealer"
                      ? handleDealerSelect(item)
                      : handleUserSelect(item)
                  }
                >
                  <Avatar
                    src={item.profileImage || undefined}
                    alt={
                      item.type === "dealer" ? item.dealerName : item.fullName
                    }
                    sx={{ width: 26, height: 26, fontSize: "11px" }}
                  >
                    {item.type === "dealer"
                      ? item.dealerName.charAt(0).toUpperCase()
                      : item.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                  <ItemInfo>
                    <ItemName>
                      {item.type === "dealer" ? item.dealerName : item.fullName}
                    </ItemName>
                    <ItemSubtitle>
                      {item.type === "dealer"
                        ? `${item.userCount} users`
                        : item.dealerName}
                    </ItemSubtitle>
                  </ItemInfo>
                  <TypeIndicator>
                    {item.type === "dealer" ? (
                      <>
                        <Buildings size={12} />
                        Dealer
                      </>
                    ) : (
                      <>
                        <Box component="span" sx={{ fontSize: "10px" }}>
                          👤
                        </Box>
                        User
                      </>
                    )}
                  </TypeIndicator>
                </ItemContainer>
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
                <Box>No users or dealers found for "{searchTerm}"</Box>
              </Box>
            ) : null}
          </AutocompleteContainer>,
          document.body,
        )}
    </>
  );
};

export default EnhancedTaggingInput;
