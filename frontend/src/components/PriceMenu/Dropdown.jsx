import { useState } from "react";
import ProductNotes from "./ProductNotes";
import FlashIcon from "../Icons/FlashIcon";
import VisitIcon from "../Icons/VisitIcon";
import NotesIcon from "../Icons/NotesIcon";
import { Menu, MenuItem, Wrapper } from "./styles";

export default function Dropdown({
  data,
  aurbitrageSkuId,
  type,
  index,
  handleCheckAvailability,
  loading,
}) {
  const [showNotes, setShowNotes] = useState(false);
  if (showNotes) {
    return (
      <ProductNotes
        data={data}
        onBack={(e) => {
          e.stopPropagation();
          setShowNotes(false);
        }}
      />
    );
  }

  const handleClick = (e) => {
    e.stopPropagation();
    setShowNotes(true);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Wrapper>
      <Menu>
        <MenuItem
          onClick={(e) =>
            handleCheckAvailability({ type, index, aurbitrageSkuId, data })
          }
          className="menu-item"
          disabled={loading}
        >
          <FlashIcon /> {loading ? "Creating Chat..." : "Message About Deal"}
        </MenuItem>
        <MenuItem
          as="a"
          href={data?.dataSource}
          target="_blank"
          className="menu-item"
          onClick={stopPropagation}
        >
          <VisitIcon />{" "}
          {data?.dealer === "Dillon Gage"
            ? "View on FizTrade"
            : data?.dealer?.startsWith("MTB ")
              ? "View on Platform"
              : "View Price Sheet"}
        </MenuItem>
        <MenuItem onClick={handleClick} className="menu-item">
          <NotesIcon /> Product Notes
        </MenuItem>
      </Menu>
    </Wrapper>
  );
}
