import Actions from "../Actions";
import LocationIcon from "@/components/Icons/LocationIcon";
import PhoneIcon from "@/components/Icons/PhoneIcon";
import GlobeIcon from "@/components/Icons/GlobeIcon";
import BankIcon from "@/components/Icons/BankIcon";
import DoubleCheckIcon from "@/components/Icons/DoubleCheckIcon";
import COVER from "@/assets/images/dealers/cover.png";
import LOGO1 from "@/assets/images/companies/1.svg";
import LOGO2 from "@/assets/images/companies/2.svg";
import LOGO3 from "@/assets/images/companies/3.svg";
import LOGO4 from "@/assets/images/companies/4.svg";
import { Box, Skeleton } from "@mui/material";

import {
  Contact,
  Contacts,
  Group,
  GroupInfo,
  GroupItem,
  GroupLabel,
  Logo,
  Profile,
  SeeAll,
  SocialIcon,
  SocialLink,
  SocialLinks,
  StyledHeader,
  Title,
  InfoWrapper,
  Image,
  ImagesWrapper,
  Error,
  Loader,
} from "./styles";
import ArrowLeftTiltIcon from "@/components/Icons/ArrowLeftTiltIcon";
import { useParams } from "react-router-dom";
import img1 from "@/assets/images/landing-pages/about.png";
import img2 from "@/assets/images/landing-pages/advantage.png";
import img3 from "@/assets/images/landing-pages/header.jpeg";
import { useNavigate } from "react-router-dom";
import { useDealers } from "@/Context/DealerContext";
import { SOCIAL_ICONS } from "@/constants/socialIcons";
import { useEffect, useRef } from "react";

export const Info = ({ data, error, loading, ...props }) => {
  const { authorizations, loading: fetchingAuths, affiliations } = useDealers();
  const ref = useRef(null);
  const { id } = useParams();
  const dealerId =
    localStorage.getItem("dealerId") || sessionStorage.getItem("dealerId");
  const images = [img1, img2, img3];
  const coverImages = images || [];

  useEffect(() => {
    if (id) {
      authorizations.fetchAuthorizations();
      affiliations.fetchAffiliations();
    }
  }, [id]);

  const isLoggedInUser = id === dealerId;
  const topImage =
    coverImages.length > 1 ? coverImages.slice(0, 3) : coverImages;
  const navigate = useNavigate();

  const handleClickOpen = () => {
    navigate(`/dashboard/dealer/${dealerId}/gallery`);
  };

  const socials = JSON.parse(data?.socials || "{}");
  const auths = authorizations.data || [];
  const affs = affiliations.data || [];
  return (
    <Box ref={ref} {...props}>
      <StyledHeader bg={COVER}>
        <ImagesWrapper>
          {topImage.map((img, index) => (
            <Image src={img} key={index + 1} />
          ))}
        </ImagesWrapper>
        <Profile src={data?.profileImage}>QA</Profile>
        {coverImages.length > 1 && (
          <SeeAll onClick={handleClickOpen}>
            See All Pictures
            <ArrowLeftTiltIcon />
          </SeeAll>
        )}
      </StyledHeader>
      <InfoWrapper>
        {loading || fetchingAuths ? (
          <>
            <Loader>
              <Skeleton height={60} width={80} />
              <Skeleton height={60} width={300} />
            </Loader>
          </>
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <>
            <Title>
              <b>{data?.dealerName}</b>
              <SocialLinks>
                {Object.keys(socials).map((link) => {
                  const Icon = SOCIAL_ICONS[link];
                  if (socials[link])
                    return (
                      <SocialLink
                        href={socials[link]}
                        target="_blank"
                        key={socials[link]}
                      >
                        <Icon />
                      </SocialLink>
                    );
                })}
                {isLoggedInUser && <Actions />}
              </SocialLinks>
            </Title>
            <Contacts>
              {data?.dealerAddress && (
                <Contact>
                  <LocationIcon />
                  <span>{data?.dealerAddress}</span>
                </Contact>
              )}
              {data?.phone && (
                <Contact>
                  <PhoneIcon />
                  <span>{data?.phone}</span>
                </Contact>
              )}
              {data?.site && (
                <Contact>
                  <GlobeIcon />
                  <span>{data?.site}</span>
                </Contact>
              )}
              {data?.yearEstablished && (
                <Contact>
                  <BankIcon />
                  <span>Since {data?.yearEstablished}</span>
                </Contact>
              )}
            </Contacts>
            <Group>
              <GroupLabel>Authorized Distributer Of:</GroupLabel>
              <GroupInfo>
                {auths.length
                  ? auths.map((auth) => (
                      <GroupItem key={auth.id}>
                        <DoubleCheckIcon />
                        <span>{auth.name}</span>
                      </GroupItem>
                    ))
                  : "No authorizations found"}
              </GroupInfo>
            </Group>
            <Group>
              <GroupLabel>Industry Affiliations</GroupLabel>
              <GroupInfo>
                {affs.length
                  ? affs.map((aff) => (
                      <GroupItem key={aff.id}>
                        <Logo src={aff.logo} />
                        <span> {aff.name}</span>
                      </GroupItem>
                    ))
                  : "No affiliations found"}
              </GroupInfo>
            </Group>
          </>
        )}
      </InfoWrapper>
    </Box>
  );
};
