import { useRef, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import Resizer from "react-image-file-resizer";
import dayjs from "dayjs";

const useDebounce = (callback, delay) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, delay);
  }, []);

  return debouncedCallback;
};

const calculateSKUPriceValue = (sign, number) => {
  if (number !== 0 && !number) {
    return null;
  }
  try {
    number = number.replace(",", "");
    const value = parseFloat((sign || "") + number);
    return value;
  } catch (error) {
    console.error("Error calculating value:", error);
    return null;
  }
};

const formatDate = (postdate) => {
  const date = new Date(postdate);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formattedDate = date.toLocaleString("en-US", options).replace(",", "");

  return formattedDate;
};

const resizeImage = (file, width, height) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      "JPEG",
      100,
      0,
      (uri) => {
        const byteString = atob(uri.split(",")[1]);
        const mimeString = uri.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        resolve(blob);
      },
      "base64",
    );
  });
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";
  let countryCode = "";
  let mainNumber = phoneNumber;

  if (phoneNumber.startsWith("+1")) {
    countryCode = "+1";
    mainNumber = phoneNumber.slice(2);
  }

  if (mainNumber.length !== 10) {
    return phoneNumber;
  }

  const areaCode = mainNumber.slice(0, 3);
  const centralOfficeCode = mainNumber.slice(3, 6);
  const lineNumber = mainNumber.slice(6);

  return `${countryCode} (${areaCode}) ${centralOfficeCode}-${lineNumber}`;
};
const formatDateToAgo = (commentDate) => {
  const date = dayjs(commentDate);
  const diffInDays = dayjs().startOf("day").diff(date.startOf("day"), "day");
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInDays === 0) {
    return `Today at ${date.format("hh:mm A")}`;
  } else if (diffInDays === 1) {
    return `Yesterday at ${date.format("hh:mm A")}`;
  } else if (diffInWeeks < 1) {
    return `${diffInDays} days ago`;
  } else if (diffInWeeks === 1) {
    return "1 week ago";
  } else {
    return `${diffInWeeks} weeks ago`;
  }
};

export {
  useDebounce,
  calculateSKUPriceValue,
  formatDate,
  resizeImage,
  formatPhoneNumber,
  formatDateToAgo,
};
