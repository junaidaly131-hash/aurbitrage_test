import { useContext, useState, useEffect } from "react";
import { PricingDashboardContext } from "@/Context/PricingDashboardContext";
import useValidateToken from "../Hooks/useValidateToken";
import useDeleteToken from "../Hooks/useDeleteToken";
import useAddToken from "../Hooks/useAddToken";
import APIIntegration from "./ApiIntegration";
import { CircularProgress, Box } from "@mui/material";
import useGetApiKeys from "../Hooks/GetApiKeys";
import { Loader } from "@/components/DealerSettings/Distributers/styles";
import {
  ConnectionContainer,
  Description,
  IntegrationContainer,
  Label,
  List,
  ListItem,
  Row,
  SearchWrapper,
  Title,
} from "./styles";
import { SearchBar } from "@/components/SearchBar/SearchFilter";
import { DEALER_NAMES, DEALERS } from "@/constants/profile";
import { SectionWrapper, StyledHeading } from "../styles";
const Integration = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userApiKeys, setUserApiKey] = useState({});
  const open = Boolean(anchorEl);

  const { apiKeys, loading, error, fetchApiKeys } = useGetApiKeys();
  useEffect(() => {
    fetchApiKeys();
  }, []);

  useEffect(() => {
    if (loading === "success") {
      setUserApiKey(apiKeys);
      const integratedDealers = [];

      if (apiKeys.stoneXApiToken && apiKeys.stoneXApiToken !== "") {
        integratedDealers.push("StoneX");
      } else {
        localStorage.setItem("isStoneXIntegrated", "false");
      }

      if (apiKeys.dillionGageApiToken && apiKeys.dillionGageApiToken !== "") {
        integratedDealers.push("DillionGage");
      } else {
        localStorage.setItem("isDillionGageIntegrated", "false");
      }

      if (apiKeys.upstateEmail && apiKeys.upstateEmail !== "") {
        integratedDealers.push("Upstate");
      } else {
        localStorage.setItem("isUpstateIntegrated", "false");
      }

      setIntegratedDealers(integratedDealers);
    }
  }, [loading, apiKeys]);
  const { isStoneXIntegrated, isDillionGageIntegrated, isUpstateIntegrated } =
    useContext(PricingDashboardContext);

  const [integratedDealers, setIntegratedDealers] = useState([]);

  useEffect(() => {
    setIntegratedDealers((prev) => {
      const updated = [...prev];

      // Only add dealers if they have actual API keys/credentials AND the flag is true
      if (
        isStoneXIntegrated &&
        userApiKeys.stoneXApiToken &&
        userApiKeys.stoneXApiToken !== "" &&
        !updated.includes("StoneX")
      ) {
        updated.push("StoneX");
      }
      if (
        isDillionGageIntegrated &&
        userApiKeys.dillionGageApiToken &&
        userApiKeys.dillionGageApiToken !== "" &&
        !updated.includes("DillionGage")
      ) {
        updated.push("DillionGage");
      }
      if (
        isUpstateIntegrated &&
        userApiKeys.upstateEmail &&
        userApiKeys.upstateEmail !== "" &&
        !updated.includes("Upstate")
      ) {
        updated.push("Upstate");
      }

      // Filter out dealers that don't have actual credentials
      const filtered = updated.filter((dealer) => {
        if (dealer === "StoneX") {
          return (
            isStoneXIntegrated &&
            userApiKeys.stoneXApiToken &&
            userApiKeys.stoneXApiToken !== ""
          );
        }
        if (dealer === "DillionGage") {
          return (
            isDillionGageIntegrated &&
            userApiKeys.dillionGageApiToken &&
            userApiKeys.dillionGageApiToken !== ""
          );
        }
        if (dealer === "Upstate") {
          return (
            isUpstateIntegrated &&
            userApiKeys.upstateEmail &&
            userApiKeys.upstateEmail !== ""
          );
        }
        return true;
      });
      return filtered;
    });
  }, [
    isStoneXIntegrated,
    isDillionGageIntegrated,
    isUpstateIntegrated,
    userApiKeys,
  ]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDealerSelect = (dealer) => {
    if (dealer) {
      const dealerIndex = DEALER_NAMES.findIndex((name) => name === dealer);
      const dealerValue = dealerIndex !== -1 ? DEALERS[dealerIndex] : dealer;

      const isAlreadyIntegrated = integratedDealers.includes(
        dealerValue.toLowerCase(),
      );

      if (!isAlreadyIntegrated) {
        setIntegratedDealers((prev) => {
          const uniqueDealers = new Set([...prev, dealerValue]);
          return Array.from(uniqueDealers);
        });
        handleMenuClose();
      }
    }
  };
  return (
    <IntegrationContainer>
      <SectionWrapper>
        <StyledHeading>
          Customize Your Dashboard with Dealer Pricing
        </StyledHeading>
        <Description>
          Aurbitrage displays pricing from dealers who choose to share their
          prices with the entire Aurbitrage community. If you receive pricing
          from a dealer who is not publicly contributing, but you’d like to
          include their pricing in your personal dashboard, you can either:
          <br />
          <br />
          • Send us their price sheet, or
          <br />
          • Connect your dealer account via API using the options below.
          <br />
          <br />
          Once added, this pricing will be visible only to you. It will not be
          shared with other Aurbitrage members.
          <br /> Our goal is to help you access all of your dealer pricing in
          one place—so you can make faster, more confident trading decisions.
        </Description>
      </SectionWrapper>

      <ConnectionContainer>
        {/* <Connection>
          <Heading>Connect APIs</Heading>
          <Paragraph>
            When you&apos;re busy or not online, Substance can send you email
            notifications for any new direct messages or mentions of your name.
          </Paragraph>
        </Connection> */}
        <SectionWrapper>
          {loading === "pending" ||
            (loading === "idle" && (
              <Row>
                <Loader item xs={12}>
                  <CircularProgress size={32} />
                </Loader>
              </Row>
            ))}

          {loading === "success" && (
            <>
              {integratedDealers.map((integratedDealer) => {
                const tokenKey = `${integratedDealer.charAt(0).toLowerCase()}${integratedDealer.slice(1)}ApiToken`;
                const dealerIndex = DEALERS.findIndex(
                  (d) => d.toLowerCase() === integratedDealer.toLowerCase(),
                );
                const dealerName =
                  dealerIndex !== -1 ? DEALER_NAMES[dealerIndex] : null;

                // For Upstate, pass email instead of API token
                const apiTokenValue =
                  integratedDealer.toLowerCase() === "upstate"
                    ? userApiKeys.upstateEmail
                    : userApiKeys[tokenKey];

                return (
                  <Row key={integratedDealer}>
                    <SearchWrapper>
                      <Label>Dealer Name</Label>
                      <SearchBar
                        isDealer
                        id={dealerName}
                        label="Select Dealer"
                        searchInput={dealerName}
                        options={DEALER_NAMES.map((dealer) => ({
                          dealerName: dealer,
                        }))}
                        onChange={(selectedDealerName) =>
                          handleDealerSelect(selectedDealerName)
                        }
                        openOnFocus={true}
                      />
                    </SearchWrapper>
                    <APIIntegration
                      key={integratedDealer}
                      integrationName={integratedDealer}
                      tokenKey={tokenKey}
                      validateHook={useValidateToken}
                      addHook={useAddToken}
                      removeHook={useDeleteToken}
                      apiToken={apiTokenValue}
                      setUserApiKey={setUserApiKey}
                    />
                  </Row>
                );
              })}

              {integratedDealers.length < 3 && (
                <Row key="new-dealer">
                  <Box>
                    <Label>Dealer Name</Label>
                    <SearchBar
                      isDealer
                      label="Select Dealer"
                      options={DEALERS.filter(
                        (dealer) => !integratedDealers.includes(dealer),
                      ).map((dealer) => {
                        const dealerIndex = DEALERS.findIndex(
                          (d) => d.toLowerCase() === dealer.toLowerCase(),
                        );
                        const dealerName =
                          dealerIndex !== -1
                            ? DEALER_NAMES[dealerIndex]
                            : dealer;
                        return { dealerName };
                      })}
                      onChange={(selectedDealerName) =>
                        handleDealerSelect(selectedDealerName)
                      }
                      openOnFocus={true}
                      styles={{
                        width: "300px",
                        backgroundColor: "#191919",
                        padding: "0px",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                  <Box />
                  <Box />
                </Row>
              )}
            </>
          )}
        </SectionWrapper>
      </ConnectionContainer>
    </IntegrationContainer>
  );
};

export default Integration;
