import dayjs from "dayjs";
import PriceFormatter from "./PriceFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDolly,
  faStopwatch,
  faClipboard,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Price, TimeAgo } from "./styles";
import {
  Gold_Coins_Sort_Order,
  Silver_Coins_Sort_Order,
  Silver_Dimes_Coins_Sort_Order,
} from "./CoinsSort";
export const getCategoryColor = (category) => {
  if (category.includes("Gold")) return "#DBA42D";
  if (category.includes("Silver")) return "#C0C0C0";
  if (category.includes("Platinum")) return "#328D62";
  if (category.includes("Palladium")) return "#1C56A4";
  if (category.includes("Copper")) return "#B87333";
  return "#FFFFFF";
};
const colors = {
  gold: "#DBA42D",
  silver: "#C0C0C0",
  platinum: "#328D62",
  palladium: "#1C56A4",
  copper: "#B87333",
};

export const getMetalColor = (nodes) => {
  const color = () => {
    let selectedColor = colors["silver"];
    nodes.forEach((key) => {
      selectedColor = colors[key.metal] || colors["silver"];
    });
    return selectedColor;
  };

  return color();
};
function calculateMinutesDifference(date) {
  const givenDate = new Date(date);
  const currentDate = new Date();
  const diffInMilliseconds = currentDate - givenDate;

  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  return diffInMinutes;
}
const formatTime = (timeString) => {
  return timeString
    .replace(/\byear(s)?\b/g, (match, p1) => (p1 ? "yrs" : "yr"))
    .replace(/\bmonth(s)?\b/g, (match, p1) => (p1 ? "mons" : "mon"))
    .replace(/\bminute(s)?\b/g, (match, p1) => (p1 ? "mins" : "min"))
    .replace(/\bhour(s)?\b/g, (match, p1) => (p1 ? "hrs" : "hr"))
    .replace(/\bday(s)?\b/g, (match, p1) => (p1 ? "days" : "day"))
    .replace(/\bweek(s)?\b/g, (match, p1) => (p1 ? "wks" : "wk"))
    .replace(/\bsecond(s)?\b/g, (match, p1) => (p1 ? "secs" : "sec"));
};

export const renderPrice = (
  displayPrice,
  spotPrices,
  priceObject,
  children,
  dataType,
  isValue,
) => {
  const { price, date, equivalentOz, metal, displayPriceAs, format } =
    priceObject || {};
  const metalSpotPrice = spotPrices.find(
    (item) => item.metals?.toLowerCase() === metal?.toLowerCase(),
  );
  const meltPrice =
    equivalentOz *
    (dataType == "bidData" ? metalSpotPrice?.bid : metalSpotPrice?.ask);
  const formatToTwoDecimalPlaces = (value) => {
    if (typeof value === "number" || !isNaN(value)) {
      return parseFloat(value).toFixed(2);
    }
    return value;
  };

  let priceFormat = getPriceFormat(priceObject, meltPrice);
  let targetDisplayPrice = displayPrice;
  if (targetDisplayPrice === "default") {
    targetDisplayPrice = displayPriceAs;
  }
  const getDisplayValue = () => {
    if (price === 0 && displayPrice !== "All-in") {
      return "Melt";
    }
    const p = (value) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);

    switch (targetDisplayPrice) {
      case "DollarPerPiece":
        if (priceFormat === "DollarPerPiece") {
          return `${p(price)}/pc`;
        } else if (priceFormat === "DollarPerOz") {
          return `${p(price * equivalentOz)}/pc`;
        } else if (priceFormat === "Percentage") {
          let normalizedPrice = (meltPrice * price) / 100;
          return `${p(normalizedPrice)}/pc`;
        } else if (priceFormat === "All-in") {
          let normalizedPrice = price - meltPrice;
          return `${p(normalizedPrice)}/pc`;
        }
        return null;
      case "DollarPerOz":
        if (priceFormat === "DollarPerPiece") {
          return `${p(price / equivalentOz)}/oz`;
        } else if (priceFormat === "DollarPerOz") {
          return `${p(price)}/oz`;
        } else if (priceFormat === "Percentage") {
          let normalizedPrice = (meltPrice * price) / 100 / equivalentOz;
          return `${p(normalizedPrice)}/oz`;
        } else if (priceFormat === "All-in") {
          let normalizedPrice = (price - meltPrice) / equivalentOz;
          return `${p(normalizedPrice)}/oz`;
        }
        return null;
      case "Percentage":
        if (priceFormat === "DollarPerPiece") {
          let normalizedPrice = (price / meltPrice) * 100;
          return `${formatToTwoDecimalPlaces(normalizedPrice)}%`;
        } else if (priceFormat === "DollarPerOz") {
          let normalizedPrice = ((price * equivalentOz) / meltPrice) * 100;
          return `${formatToTwoDecimalPlaces(normalizedPrice)}%`;
        } else if (priceFormat === "Percentage") {
          return `${formatToTwoDecimalPlaces(price)}%`;
        } else if (priceFormat === "All-in") {
          return `${formatToTwoDecimalPlaces((price / meltPrice - 1) * 100)}%`;
        }
        return null;
      case "All-in":
        if (priceFormat === "DollarPerPiece") {
          let normalizedPrice = price + meltPrice;
          return `${p(normalizedPrice)}`;
        } else if (priceFormat === "DollarPerOz") {
          let normalizedPrice = price * equivalentOz + meltPrice;
          return `${p(normalizedPrice)}`;
        } else if (priceFormat === "Percentage") {
          let standardPrice = price;
          if (price > 50) {
            standardPrice = price - 100;
          }
          return `${p((standardPrice / 100 + 1) * meltPrice)}`;
        } else if (priceFormat === "All-in") {
          return `${p(price)}`;
        }
        return null;
      default:
        return format === "%"
          ? `${formatToTwoDecimalPlaces(price)}%`
          : `${p(price)}`;
    }
  };

  let displayValue = getDisplayValue();
  if (displayValue.startsWith("$-")) {
    displayValue = "-$" + displayValue.substring(2); // Remove the '-' from the front
  }

  if (isValue) {
    return {
      price: displayValue,
      date: priceObject?.isApiPrice ? date : formatTime(date),
    };
  }
  return (
    <Price>
      <span>{<PriceFormatter priceData={displayValue} />}</span>
      {priceObject?.isApiPrice ? (
        <TimeAgo>{date}</TimeAgo>
      ) : (
        <TimeAgo>{formatTime(date)}</TimeAgo>
      )}
      {children}
    </Price>
  );
};

export const renderNotes = (item) => {
  const calculateDays = (note) => {
    if (!note) return "";

    const regex = /([A-Za-z]{3} \d{1,2} \d{4}, \d{2}:\d{2})/;
    const match = note.match(regex);

    if (!match) {
      return note;
    }

    const dateString = match[0];
    const eventDate = new Date(dateString);
    const today = new Date();

    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const timeDiff = eventDate.getTime() - today.getTime();
    const dayDiff = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    if (dayDiff === 0) {
      return "Starts Today";
    } else if (dayDiff > 0) {
      return `Starts in ${dayDiff} day${dayDiff > 1 ? "s" : ""}`;
    } else {
      return `Started ${Math.abs(dayDiff)} day${Math.abs(dayDiff) > 1 ? "s" : ""} ago`;
    }
  };

  const notes = item.notes ? (
    <>
      <span>
        <FontAwesomeIcon
          icon={faPenToSquare}
          size="lg"
          style={{ verticalAlign: "middle", marginRight: 4 }}
        />
        {item.notes}
      </span>
    </>
  ) : (
    ""
  );

  const bulkDiscount =
    item.bulkDiscount && item.bulkDiscount.toLowerCase() !== "none" ? (
      <span>
        <FontAwesomeIcon
          icon={faDolly}
          size="lg"
          style={{ verticalAlign: "middle", marginRight: 4 }}
        />

        <PriceFormatter priceData={item.bulkDiscount} />
      </span>
    ) : (
      ""
    );

  const shippingNote = item.shippingNote ? (
    <span>
      <FontAwesomeIcon
        icon={faStopwatch}
        size="lg"
        style={{ verticalAlign: "middle", marginRight: 4 }}
      />
      Shipping:{" "}
      {item?.isApiPrice ? calculateDays(item.shippingNote) : item.shippingNote}
    </span>
  ) : (
    ""
  );

  const coreColor = item.coreColor ? (
    <span>
      <FontAwesomeIcon
        icon={faClipboard}
        size="lg"
        style={{ verticalAlign: "middle", marginRight: 4 }}
      />
      Core Color: {item.coreColor}
    </span>
  ) : (
    ""
  );

  const designation = item.designation ? (
    <span>
      <FontAwesomeIcon
        icon={faClipboard}
        size="lg"
        style={{ verticalAlign: "middle", marginRight: 4 }}
      />
      Designation: {item.designation}
    </span>
  ) : (
    ""
  );

  const labelType = item.labelType ? (
    <span>
      <FontAwesomeIcon
        icon={faClipboard}
        size="lg"
        style={{ verticalAlign: "middle", marginRight: 4 }}
      />
      Label Type: {item.labelType}
    </span>
  ) : (
    ""
  );

  const labelSignature = item.labelSignature ? (
    <span>
      <FontAwesomeIcon
        icon={faClipboard}
        size="lg"
        style={{ verticalAlign: "middle", marginRight: 4 }}
      />
      Label Signature: {item.labelSignature}
    </span>
  ) : (
    ""
  );

  const gradingService = item.gradingService ? (
    <span>
      <FontAwesomeIcon
        icon={faClipboard}
        size="lg"
        style={{ verticalAlign: "middle", marginRight: 4 }}
      />
      Grading Service: {item.gradingService}
    </span>
  ) : (
    ""
  );

  const formattedTooltip = [
    notes,
    bulkDiscount,
    shippingNote,
    coreColor,
    designation,
    labelType,
    labelSignature,
    gradingService,
  ]
    .filter((part) => part !== "")
    .map((part, index) => (
      <div key={index} style={{ marginBottom: 4 }}>
        {part}
      </div>
    ));

  return formattedTooltip;
};

export const sortDataByName = (data) => {
  return data.sort((a, b) => {
    const equivalentOzA = a.equivalentOz || 0;
    const equivalentOzB = b.equivalentOz || 0;

    if (equivalentOzA !== equivalentOzB) {
      return equivalentOzB - equivalentOzA;
    }

    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    return nameA.localeCompare(nameB);
  });
};
const getCoinCondition = (name) => {
  let coinCondition = "";
  name.split(" ").forEach((word) => {
    if (Gold_Coins_Sort_Order[word.toUpperCase()]) {
      coinCondition = word;
    }
  });
  return coinCondition;
};
export const sortGoldCoins = (data) => {
  return data.sort((a, b) => {
    const nameA = getCoinCondition(a.name);
    const nameB = getCoinCondition(b.name);
    const indexA = Gold_Coins_Sort_Order[nameA.toUpperCase()] ?? 1000;
    const indexB = Gold_Coins_Sort_Order[nameB.toUpperCase()] ?? 1000;
    return indexA - indexB;
  });
};
const getSilverCoinCondition = (name, Sort_Order) => {
  let coinCondition = "";
  name.split(" ").forEach((word) => {
    if (Sort_Order[word.toUpperCase()]) {
      coinCondition = word;
    }
  });
  return coinCondition;
};
const getCoinTypeRank = (name) => {
  if (name.includes("Dimes")) return 1;
  if (name.includes("Quarters")) return 2;
  if (name.includes("Halves")) return 3;
  return 100;
};

export const sortSilverCoins = (data) => {
  let Sort_Order = Silver_Coins_Sort_Order;
  return data.sort((a, b) => {
    if (a.subCategory === "90% Dimes, Quarters and Halves") {
      Sort_Order = Silver_Dimes_Coins_Sort_Order;
    }

    const typeRankA = getCoinTypeRank(a.name);
    const typeRankB = getCoinTypeRank(b.name);

    if (typeRankA !== typeRankB) {
      return typeRankA - typeRankB;
    }

    const nameA = getSilverCoinCondition(a.name, Sort_Order);
    const nameB = getSilverCoinCondition(b.name, Sort_Order);
    const indexA = Sort_Order[nameA.toUpperCase()] ?? 1000;
    const indexB = Sort_Order[nameB.toUpperCase()] ?? 1000;

    return indexA - indexB;
  });
};

export const getPriceFormat = (item, meltPrice) => {
  const pricelistFormat = item.format;
  let dealerPriceFormat = item.priceFormat;
  let aurbitragePriceFormat = item.displayPriceAs;

  let priceFormat = dealerPriceFormat || aurbitragePriceFormat;

  if (pricelistFormat === "%") {
    priceFormat = "Percentage";
  } else if (pricelistFormat === "$") {
    if (dealerPriceFormat && dealerPriceFormat.toLowerCase() !== "percentage") {
      return dealerPriceFormat;
    } else if (Math.abs(item.price / meltPrice) > 0.75) {
      priceFormat = "All-in";
    } else {
      priceFormat = "DollarPerPiece";
    }
  }
  return priceFormat;
};

export const formatTooltipContent = (aurbitrageSku) => {
  const entries = [
    { label: "Id", value: aurbitrageSku.id || aurbitrageSku.aurbitrageSkuId },
    { label: "Equivalent Oz", value: aurbitrageSku.equivalentOz },
    { label: "Category", value: aurbitrageSku.category },
    { label: "SubCategory", value: aurbitrageSku.subCategory },
    { label: "metal", value: aurbitrageSku.metal },
    { label: "coreColor", value: aurbitrageSku.coreColor },
    { label: "designation", value: aurbitrageSku.designation },
    { label: "label", value: aurbitrageSku.label },
    { label: "gradingService", value: aurbitrageSku.gradingService },
    { label: "keywords", value: aurbitrageSku.keywords },
    { label: "labelType", value: aurbitrageSku.labelType },
    { label: "labelSignature", value: aurbitrageSku.labelSignature },
    { label: "mint", value: aurbitrageSku.mint },
    { label: "year", value: aurbitrageSku.year },
    { label: "type", value: aurbitrageSku.type },
  ];

  return entries
    .filter((entry) => entry.value !== null && entry.value !== undefined)
    .map(
      (entry) =>
        `<strong style="color: #FFD700;">${entry.label}:</strong> ${entry.value}`,
    )
    .join("<br />");
};

export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} wk${weeks !== 1 ? "s" : ""} ago`;
}

export const getMeltPrice = (item, type, spotPrices) => {
  const metalSpotPrice = spotPrices.find(
    (spot) => spot.metals?.toLowerCase() === item.metal?.toLowerCase(),
  );
  return item.equivalentOz * (metalSpotPrice?.[type] || 0);
};

export const calculatePrice = (item, meltPrice) => {
  if (item === undefined) return Infinity;
  let priceFormat = getPriceFormat(item, meltPrice);
  let price = item.price;
  let equivalentOz = item.equivalentOz;

  if (priceFormat === "DollarPerPiece") {
    let normalizedPrice = price + meltPrice;
    return normalizedPrice;
  } else if (priceFormat === "DollarPerOz") {
    let normalizedPrice = price * equivalentOz + meltPrice;
    return normalizedPrice;
  } else if (priceFormat === "Percentage") {
    let standardPrice = price;
    if (price > 50) {
      standardPrice = price - 100;
    }
    return (standardPrice / 100 + 1) * meltPrice;
  } else if (priceFormat === "All-in") {
    return price;
  }
};
