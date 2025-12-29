import { PAGE_VIEW_OPTIONS as PAGE_VIEW } from "@/constants/pricing-dashboard";

export const DISPLAY_PRICE_OPTIONS = [
  {
    label: "Default",
    value: "default",
  },
  {
    label: "Dollar/Piece",
    value: "DollarPerPiece",
  },
  {
    label: "Dollar/Oz",
    value: "DollarPerOz",
  },
  {
    label: "Percent",
    value: "Percentage",
  },
  {
    label: "All-in",
    value: "All-in",
  },
];

export const DEPTH_OPTIONS = [
  {
    label: "Best",
    value: 1,
  },
  {
    label: "Top 3",
    value: 3,
  },
  {
    label: "All",
    value: 100,
  },
];
export const PAGE_VIEW_OPTIONS = Object.keys(PAGE_VIEW).map(([key]) => {
  return {
    label: PAGE_VIEW[key]?.charAt(0).toUpperCase() + PAGE_VIEW[key]?.slice(1),
    value: PAGE_VIEW[key],
  };
});
