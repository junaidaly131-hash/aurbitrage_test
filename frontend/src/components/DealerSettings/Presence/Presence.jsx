import Input from "../Input";
import { useFormContext } from "react-hook-form";
import {
  Stylediv,
  OnlineHeading,
  OnlineWrapper,
  Error,
  ErrorWrapper,
  RefreshBtn,
} from "./styles";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import XIcon from "@/components/Icons/XIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import YoutubeIcon from "@/components/Icons/YoutubeIcon";
import EBayIcon from "@/components/Icons/EBayIcon";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
export const Presence = ({ data, error, loading, getUser }) => {
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  useEffect(() => {
    if (data) {
      const localData = JSON.parse(localStorage.getItem("dealerData") || "{}");
      const links = localData?.social || {};
      const apiData = JSON.parse(data?.socials) || {};
      setValue(
        "socials.youtube",
        links.youtube != null ? links.youtube : apiData?.youtube,
      );
      setValue("socials.x", links.x != null ? links.x : apiData?.x);
      setValue(
        "socials.facebook",
        links.facebook != null ? links.facebook : apiData?.facebook,
      );
      setValue(
        "socials.linkedin",
        links.linkedin != null ? links.linkedin : apiData?.linkedin,
      );
      setValue("socials.ebay", links.ebay != null ? links.ebay : apiData?.ebay);
      setValue(
        "socials.instagram",
        links.instagram != null ? links.instagram : apiData?.instagram,
      );
    }
  }, [data, setValue]);
  const handelclick = () => {
    getUser(id);
  };
  return (
    <OnlineWrapper>
      <Stylediv>
        <OnlineHeading>Share you online Presence</OnlineHeading>
      </Stylediv>
      {error ? (
        <ErrorWrapper>
          <Error>{error}</Error>
          <RefreshBtn onClick={handelclick}>Try Again</RefreshBtn>
        </ErrorWrapper>
      ) : (
        <>
          <Stylediv>
            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Input
                name="socials.facebook"
                Icon={FacebookIcon}
                placeholder={"Enter your Facebook URL"}
                labelname={"Facebook"}
                register={register}
                errors={errors}
              />
            )}
            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Input
                labelname={"Instagram"}
                Icon={InstagramIcon}
                placeholder="Enter your Instagram URL"
                name="socials.instagram"
                register={register}
                errors={errors}
              />
            )}
          </Stylediv>
          <Stylediv>
            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Input
                Icon={XIcon}
                placeholder={"Enter your X URL"}
                labelname={"X (Twitter)"}
                name="socials.x"
                register={register}
                errors={errors}
              />
            )}
            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Input
                Icon={LinkedInIcon}
                placeholder={"Enter your LinkedIn URL"}
                labelname={"LinkedIn"}
                name="socials.linkedin"
                register={register}
                errors={errors}
              />
            )}
          </Stylediv>
          <Stylediv>
            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Input
                Icon={YoutubeIcon}
                placeholder={"Enter your Youtube URL"}
                labelname={"Youtube"}
                name="socials.youtube"
                register={register}
                errors={errors}
              />
            )}
            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Input
                Icon={EBayIcon}
                placeholder={"Enter your Ebay URL"}
                labelname={"Ebay"}
                name="socials.ebay"
                register={register}
                errors={errors}
              />
            )}
          </Stylediv>
        </>
      )}
    </OnlineWrapper>
  );
};
