import { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import Input from "../Input";
import Dropdown from "../Dropdown";
import {
  Stylediv,
  CompanyHeading,
  AboutWrapper,
  SelectLogo,
  Profile,
  Picture,
  ProfilePicWrapper,
  Error,
  RefreshBtn,
  ErrorWrapper,
  PhoneNumberInput,
  Label,
  PhoneInputWrapper,
} from "./style";
import "react-quill/dist/quill.snow.css";
import PhoneIcon from "@/components/Icons/PhoneIcon";
import BankIcon from "@/components/Icons/BankIcon";
import GlobeIcon from "@/components/Icons/GlobeIcon";
import UserOutlineIcon from "@/components/Icons/UserOutlineIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import FileUploadIcon from "@/components/Icons/FileUploadIcon";
import { InputLabel, Skeleton } from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";
import "react-phone-number-input/style.css";

export const Company = ({
  data,
  preview,
  setPreview,
  refreshDealer,
  loading,
  error,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const [years, setYears] = useState([]);
  const [yearOffset, setYearOffset] = useState(0);
  const yearsToLoad = 60;
  const fileInputRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    loadYears();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("profileImage", file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    } else {
      setPreview(data?.profileImage);
    }
  };
  const loadYears = () => {
    const newYears = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < yearsToLoad; i++) {
      const year = currentYear - i;
      newYears.push({ value: year.toString(), label: year.toString() });
    }
    setYears((prevYears) => [...prevYears, ...newYears]);
    setYearOffset(yearOffset + yearsToLoad);
  };
  const year = watch("yearEstablished");

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const formattedAddress = place.formatted_address;
      setValue("dealerAddress", formattedAddress);
    }
  };

  return (
    <AboutWrapper>
      <Stylediv>
        <CompanyHeading>Tell us about your company</CompanyHeading>
      </Stylediv>

      {error ? (
        <ErrorWrapper>
          <Error>{error}</Error>
          <RefreshBtn onClick={refreshDealer}>Try Again</RefreshBtn>
        </ErrorWrapper>
      ) : (
        <>
          <ProfilePicWrapper>
            <Profile>
              {loading ? (
                <Skeleton
                  height={"180px"}
                  width={"120px"}
                  sx={{ borderRadius: "50%" }}
                />
              ) : (
                <Picture src={preview || data?.profileImage} />
              )}
            </Profile>
            {loading ? (
              ""
            ) : (
              <SelectLogo onClick={handleProfileImageClick} type="button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="logo-upload"
                  ref={fileInputRef}
                />
                <FileUploadIcon />
                Upload Profile Photo
              </SelectLogo>
            )}
          </ProfilePicWrapper>

          <Stylediv>
            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Input
                name="dealerName"
                Icon={UserOutlineIcon}
                placeholder="Enter your Official Dealer Name"
                labelname="Company Name"
                required
                register={register}
                errors={errors}
              />
            )}

            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <PhoneInputWrapper>
                <Label htmlFor="phone">Phone Number</Label>
                <PhoneNumberInput
                  international
                  defaultCountry="US"
                  value={watch("phone")}
                  onChange={(value) => setValue("phone", value)}
                  placeholder="Enter your Phone Number"
                  className={errors.phone ? "phone-input-error" : "phone-input"}
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone.message}</span>
                )}
              </PhoneInputWrapper>
            )}
            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Input
                name="site"
                Icon={GlobeIcon}
                placeholder="Enter your Website URL"
                labelname="Website"
                required
                register={register}
                errors={errors}
              />
            )}
          </Stylediv>
          <Stylediv>
            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Dropdown
                name="yearEstablished"
                label="Foundation Year"
                Icon={BankIcon}
                placeholder="Select the Year of Foundation"
                value={year}
                onChange={(e) => {
                  setValue("yearEstablished", e.target.value);
                }}
                options={years}
                register={register}
                errors={errors}
                required
              />
            )}

            {loading ? (
              <Skeleton height={"85px"} width={"100%"} />
            ) : (
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                options={{
                  types: ["address"],
                  componentRestrictions: { country: "us" },
                }}
              >
                <Input
                  name="dealerAddress"
                  Icon={LocationIcon}
                  placeholder="Enter your location"
                  labelname="Location"
                  required
                  register={register}
                  errors={errors}
                />
              </Autocomplete>
            )}
          </Stylediv>
        </>
      )}
    </AboutWrapper>
  );
};
