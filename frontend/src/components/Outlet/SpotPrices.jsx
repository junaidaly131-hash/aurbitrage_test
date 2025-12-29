import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  StyledWrapper,
  StyledDiv,
  StyledInnerDiv,
  Value,
  MarqueeContainer,
  MarqueeContent,
  HeadContainer,
} from "./styles";
import { Box, Typography } from "@mui/material";
import StoneXLogo from "@/assets/images/stoneX.svg";
import VerticalSlideText from "@/components/VerticalSlideText";
import { useRef, useEffect, useState, useCallback } from "react";
import { useLayout } from "@/Context/LayoutContext";

const spotPriceOrder = {
  gold: 1,
  silver: 2,
  platinum: 3,
  palladium: 4,
};

const SpotPrices = ({ spotPrices }) => {
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [contentResize, setContentResize] = useState(false);
  const { isSidebarOpen } = useLayout();

  const sortedArray = [...spotPrices].sort(
    (a, b) =>
      spotPriceOrder[a.metals.toLowerCase()] -
      spotPriceOrder[b.metals.toLowerCase()],
  );

  const formatPrice = (price) =>
    price
      ? `$${price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "-";

  const checkOverflow = useCallback(() => {
    if (!contentRef.current || !containerRef.current) return;

    const contentWidth = contentRef.current.scrollWidth;
    const containerWidth = containerRef.current.offsetWidth;

    const overflowing = contentWidth - containerWidth > 2;
    if (overflowing !== isOverflowing) {
      setIsOverflowing(overflowing);
      setAnimationKey((prev) => prev + 1);
    }
  }, [isOverflowing]);

  useEffect(() => {
    setContentResize((prev) => prev + 1);
  }, [isSidebarOpen]);

  useEffect(() => {
    const timeout = setTimeout(checkOverflow, 100);
    return () => clearTimeout(timeout);
  }, [spotPrices, checkOverflow, contentResize]);

  useEffect(() => {
    const handleResize = () => checkOverflow();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [checkOverflow]);

  const renderContent = () =>
    sortedArray.map((price, index) => {
      const color = price.askChangeDollar > 0 ? "green" : "red";
      const arrow =
        price.askChange > 0 ? (
          <FontAwesomeIcon size="xl" icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon size="xl" icon={faCaretDown} />
        );

      const formattedAskChange = price.askChange
        ? `${price.askChange.toFixed(2)}%`
        : "-";
      const formattedAskChangeDollar = price.askChangeDollar
        ? `$${price.askChangeDollar.toFixed(2)}`
        : "-";

      return (
        <StyledDiv key={index}>
          <StyledInnerDiv>
            <VerticalSlideText value={price.metals} />
            <VerticalSlideText value={formatPrice(price?.bid)} />
            <span>/</span>
            <VerticalSlideText value={formatPrice(price?.ask)} />
            <Value style={{ color }}>
              {arrow}
              <VerticalSlideText value={formattedAskChangeDollar} />
              <VerticalSlideText value={formattedAskChange} />
            </Value>
          </StyledInnerDiv>
        </StyledDiv>
      );
    });

  return (
    <HeadContainer>
      <MarqueeContainer ref={containerRef}>
        <MarqueeContent
          key={animationKey}
          className={isOverflowing ? "marquee" : ""}
        >
          <StyledWrapper ref={contentRef}>{renderContent()}</StyledWrapper>
          {isOverflowing && <StyledWrapper>{renderContent()}</StyledWrapper>}
        </MarqueeContent>
      </MarqueeContainer>

      <StyledDiv className="static">
        <StyledInnerDiv className="stack">
          <Typography variant="caption">Powered by</Typography>
          <Box component="img" src={StoneXLogo} alt="StoneX" height="0.8em" />
        </StyledInnerDiv>
      </StyledDiv>
    </HeadContainer>
  );
};

export default SpotPrices;
