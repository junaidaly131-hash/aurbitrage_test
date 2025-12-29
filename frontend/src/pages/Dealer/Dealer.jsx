import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";
import Peoples from "./Components/Peoples";
import Address from "./Components/Address";
import Shipping from "./Components/Shipping";
import Info from "./Components/Info";
import {
  Wrapper,
  Content,
  Tabs,
  Tab,
  TabContainer,
  Description,
  ErrorWrapper,
  Error,
  RefreshBtn,
} from "./styles";
import useGetDealer from "@/pages/Dealer/Hooks/useGetDealer";
export const Dealer = () => {
  const location = useLocation();
  const { id } = useParams();
  const { loading, error, success, data, getUser } = useGetDealer();
  useEffect(() => {
    getUser(id);
  }, [id, getUser]);
  useEffect(() => {
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "initial";
    };
  }, []);
  const handelclick = () => {
    getUser(id);
  };
  const active = location.hash.substring(1) || "about";
  const renderTabContent = () => {
    switch (active) {
      case "about":
        if (loading) {
          return <Skeleton variant="text" width="100%" height={100} />;
        } else {
          return (
            <>
              {error ? (
                <ErrorWrapper>
                  <Error>{error}</Error>
                  <RefreshBtn onClick={handelclick}>Try Again</RefreshBtn>
                </ErrorWrapper>
              ) : (
                <Description
                  dangerouslySetInnerHTML={{
                    __html: data?.about || "Description not added",
                  }}
                ></Description>
              )}
            </>
          );
        }

      case "peoples":
        return <Peoples />;

      case "addresses":
        return <Address />;

      case "shipping":
        return <Shipping />;
    }
  };

  return (
    <Wrapper>
      <Info data={data} loading={loading} error={error} />
      <Content>
        <Tabs>
          <Tab href="#about" as="a" active={(active === "about").toString()}>
            About
          </Tab>
          <Tab
            href="#peoples"
            as="a"
            active={(active === "peoples").toString()}
          >
            People
          </Tab>
          <Tab
            href="#addresses"
            as="a"
            active={(active === "addresses").toString()}
          >
            Addresses
          </Tab>
          <Tab
            href="#shipping"
            as="a"
            active={(active === "shipping").toString()}
          >
            Shipping
          </Tab>
        </Tabs>
        <TabContainer>{renderTabContent()}</TabContainer>
      </Content>
    </Wrapper>
  );
};

export default Dealer;
