import { React, useRef, useState } from "react";
import { CircularProgress, Modal, TextField, Typography } from "@mui/material";
import {
  Stylediv,
  Wrapper,
  PersonHeading,
  AddPerson,
  Profile,
  Picture,
  ProfileIcon,
  PhoneInputWrapper,
  Label,
  PhoneNumberInput,
} from "./styles";
import UserOutlineIcon from "@/components/Icons/UserOutlineIcon";
import Input from "../Input";
import { useForm, Controller } from "react-hook-form";
import PhoneIcon from "@/components/Icons/PhoneIcon";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import XIcon from "@/components/Icons/XIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import YoutubeIcon from "@/components/Icons/YoutubeIcon";
import EBayIcon from "@/components/Icons/EBayIcon";
import { EmailOutlined } from "@mui/icons-material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDealers } from "@/Context/DealerContext";
import toast from "react-hot-toast";
import { addPeople } from "@/apis/dealer";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  socials: yup.object().shape({
    facebook: yup.string().url("Invalid URL").optional(),
    instagram: yup.string().url("Invalid URL").optional(),
    x: yup.string().url("Invalid URL").optional(),
    linkedin: yup.string().url("Invalid URL").optional(),
    youtube: yup.string().url("Invalid URL").optional(),
    ebay: yup.string().url("Invalid URL").optional(),
  }),
});

export const PersonPopup = ({ open, onClose }) => {
  const { id } = useParams();
  const { peoples } = useDealers();
  const fileInputRef = useRef(null);
  const { handleAddMember } = peoples;
  const [adding, setAdding] = useState(false);
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      position: "",
      socials: {
        facebook: "",
        instagram: "",
        x: "",
        linkedin: "",
        youtube: "",
        ebay: "",
      },
    },
  });
  const [preview, setPreview] = useState("");

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue("profileImage", file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("dealerId", id);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("phoneNo", values.phone);
    formData.append("dealerRole", values.role);
    formData.append("subtitle", values.position);
    formData.append("profileImage", values.profileImage);
    formData.append(`socials`, JSON.stringify(values.socials));
    // Object.keys(values.socials).forEach((key) => {
    //   formData.append(`socials[${key}]`, values.socials[key]);
    // });
    setAdding(true);
    const response = await addPeople(formData);
    setAdding(false);
    if (response.success) {
      toast.success(`Added ${values.firstName} ${values.lastName}`);
      handleAddMember(response.data);
      onClose();
    } else {
      toast.error(response);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stylediv
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <PersonHeading>Person Details</PersonHeading>
        <Profile onClick={handleProfileImageClick}>
          <Picture src={preview} />
          <ProfileIcon className="icon" />
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleFileChange}
          />
        </Profile>
        <Wrapper>
          <Input
            name="firstName"
            Icon={UserOutlineIcon}
            placeholder={"Enter First Name"}
            labelname={"First Name"}
            register={register}
            error={errors["firstName"]?.message}
            required
          />
          <Input
            name="lastName"
            Icon={UserOutlineIcon}
            placeholder={"Enter Last Name"}
            labelname={"Last Name"}
            register={register}
            error={errors["lastName"]?.message}
            required
          />
        </Wrapper>
        <Wrapper>
          <Input
            name="email"
            Icon={EmailOutlined}
            placeholder={"Enter Email"}
            labelname={"Email"}
            register={register}
            error={errors["email"]?.message}
            required
          />

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
        </Wrapper>
        <Wrapper>
          <Input
            name="role"
            Icon={UserOutlineIcon}
            placeholder={"What's their role?"}
            labelname={"Role"}
            register={register}
            error={errors["role"]?.message}
          />
          <Input
            name="position"
            Icon={UserOutlineIcon}
            placeholder={"Position"}
            labelname={"Position"}
            register={register}
            error={errors["position"]?.message}
          />
        </Wrapper>
        <PersonHeading>Social Links</PersonHeading>
        <Wrapper>
          <Controller
            name="socials.facebook"
            control={control}
            render={({ field }) => (
              <Input
                register={register}
                Icon={FacebookIcon}
                placeholder={"Enter your Facebook URL"}
                labelname={"Facebook"}
                {...field}
                error={
                  errors.socials?.facebook
                    ? errors.socials.facebook.message
                    : ""
                }
              />
            )}
          />
          <Controller
            name="socials.instagram"
            control={control}
            render={({ field }) => (
              <Input
                register={register}
                labelname={"Instagram"}
                Icon={InstagramIcon}
                placeholder="Enter your Instagram URL"
                {...field}
                error={
                  errors.socials?.instagram
                    ? errors.socials.instagram.message
                    : ""
                }
              />
            )}
          />
        </Wrapper>
        <Wrapper>
          <Controller
            name="socials.x"
            control={control}
            render={({ field }) => (
              <Input
                register={register}
                Icon={XIcon}
                placeholder={"Enter your X URL"}
                labelname={"X (Twitter)"}
                {...field}
                error={errors.socials?.x ? errors.socials.x.message : ""}
              />
            )}
          />
          <Controller
            name="socials.linkedin"
            control={control}
            render={({ field }) => (
              <Input
                register={register}
                Icon={LinkedInIcon}
                placeholder={"Enter your LinkedIn URL"}
                labelname={"LinkedIn"}
                {...field}
                error={
                  errors.socials?.linkedin
                    ? errors.socials.linkedin.message
                    : ""
                }
              />
            )}
          />
        </Wrapper>
        <Wrapper>
          <Controller
            name="socials.youtube"
            control={control}
            render={({ field }) => (
              <Input
                register={register}
                Icon={YoutubeIcon}
                placeholder={"Enter your Youtube URL"}
                labelname={"Youtube"}
                {...field}
                error={
                  errors.socials?.youtube ? errors.socials.youtube.message : ""
                }
              />
            )}
          />
          <Controller
            name="socials.ebay"
            control={control}
            render={({ field }) => (
              <Input
                register={register}
                Icon={EBayIcon}
                placeholder={"Enter your Ebay URL"}
                labelname={"Ebay"}
                {...field}
                error={errors.socials?.ebay ? errors.socials.ebay.message : ""}
              />
            )}
          />
        </Wrapper>
        <Wrapper>
          <AddPerson type="submit" color="secondary" variant="contained">
            Add Person {adding && <CircularProgress size="sm" />}
          </AddPerson>
        </Wrapper>
      </Stylediv>
    </Modal>
  );
};
