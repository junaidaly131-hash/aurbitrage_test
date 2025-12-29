import { InputAdornment, Skeleton } from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import useUpdateUser from "./Hooks/useUpdateUser";
import useCurrentUserHook from "./Hooks/GetCurrentUser";
import { useAuth } from "@/Context/AuthContext";
import {
  InputLabel,
  Picture,
  Profile,
  ProfilePicWrapper,
  SelectLogo,
  Seprator,
  StyledHeading,
  Stylediv,
  Wrapper,
  InputWrapper,
  SaveBtn,
  SectionWrapper,
  SKUFormField,
  FormWrapper,
  ActionButtons,
} from "./styles";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import XIcon from "@/components/Icons/XIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import toast from "react-hot-toast";
import DiscardIcon from "../Icons/DiscardIcon";
import SaveFileIcon from "../Icons/SaveFileIcon";
import { Pencil } from "phosphor-react";
import EditIcon from "../Icons/EditIcon";
import PencilIcon from "../Icons/PencilIcon";

const UserProfile = () => {
  const {
    response: updateUserResponse,
    loading: updateLoading,
    error,
    updateUser,
  } = useUpdateUser();
  const { user, loading, fetchUser } = useCurrentUserHook();
  const auth = useAuth();
  const [userName, setUserName] = useState("");
  const [dealer, setDealer] = useState("");
  const [traderEmail, setTraderEmail] = useState("");
  const [traderPhone, setTraderPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  const storageType =
    localStorage.getItem("rememberMe") === "true"
      ? localStorage
      : sessionStorage;

  const handleSocialChange = (platform, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (auth.profileImage != null) {
      setProfileImage(auth.profileImage);
    }
  }, [auth.profileImage]);
  useEffect(() => {
    if (updateUserResponse != null && !error) {
      setProfileImage(updateUserResponse?.profileImage);
      auth.setUser((prev) => ({ ...prev, profileImage }));
      storageType.setItem("profileImage", updateUserResponse?.profileImage);
    }
  }, [updateUserResponse, error, storageType]);
  useEffect(() => {
    if (user) {
      const userN = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      const dealerN = user.dealer?.dealerName || "";
      const em = user.email || "";
      const ph = user.phoneNo || "";
      const im = user.profileImage || "";
      const sl = user.socials || "";
      setUserName(userN);
      setTraderEmail(em);
      setDealer(dealerN);
      setTraderPhone(ph);
      setProfileImage(im);
      setSocialLinks(sl);
      auth.setUser((prev) => {
        const state = { ...prev };

        if (auth.userName !== userN) {
          state["userName"] = userN;
          storageType.setItem("userName", userN);
        }
        if (auth.dealerName !== dealerN) {
          state["dealerName"] = dealerN;
          storageType.setItem("dealerName", dealerN);
        }
        if (auth.email !== em) {
          state["email"] = em;
          storageType.setItem("email", em);
        }
        if (auth.profileImage !== im) {
          state["profileImage"] = im;
          storageType.setItem("profileImage", im);
        }
        if (auth.phoneNo !== ph) {
          state["phoneNo"] = ph;
          storageType.setItem("phoneNo", ph);
        }
        if (auth.socialLinks !== sl) {
          state["socials"] = sl;
          storageType.setItem("socials", sl);
        }
        return {
          ...state,
        };
      });
    }
  }, [user, userName, storageType]);
  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  const handleUpdateProfile = useCallback(
    async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const [firstName, lastName = ""] = userName.split(" ");
      const updatedData = {};

      if (firstName !== (user.firstName || ""))
        updatedData.firstName = firstName;
      if (lastName !== (user?.lastName || "")) updatedData.lastName = lastName;
      if (dealer !== (user.dealer?.dealerName || ""))
        updatedData.dealerName = dealer;
      if (traderEmail !== (user.email || "")) updatedData.email = traderEmail;
      if (traderPhone !== (user.phoneNo || ""))
        updatedData.phoneNo = traderPhone;

      const formData = new FormData();
      Object.keys(updatedData).forEach((key) =>
        formData.append(key, updatedData[key]),
      );

      if (profileImage && profileImage.startsWith("blob:")) {
        try {
          const response = await fetch(profileImage);
          const blob = await response.blob();
          const file = new File([blob], "profile.jpg", { type: blob.type });
          formData.append("profileImage", file);
        } catch (error) {
          toast.error("Failed to process image.");
          return;
        }
      } else if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      formData.append("socials", JSON.stringify(socialLinks) || "{}");

      try {
        await updateUser(formData);
        if (error) {
          toast.error(error);
          return;
        } else {
          toast.success("Data Updated Successfully");
          await fetchUser();
        }
      } catch (error) {
        toast.error("Update failed. Please try again.");
      }
    },
    [
      error,
      dealer,
      profileImage,
      socialLinks,
      traderPhone,
      user,
      traderEmail,
      userName,
      updateUser,
      fetchUser,
    ],
  );

  return (
    <Stylediv onSubmit={handleUpdateProfile}>
      <SectionWrapper>
        <ProfilePicWrapper>
          {loading ? (
            <Skeleton
              height={"80px"}
              width={"126px"}
              sx={{ borderRadius: "8px" }}
            />
          ) : (
            <>
              <Profile>
                <Picture src={profileImage || auth?.profileImage} />
              </Profile>
              <SelectLogo
                variant="contained"
                onClick={handleProfileImageClick}
                type="button"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="logo-upload"
                  ref={fileInputRef}
                />
                <PencilIcon />
              </SelectLogo>
            </>
          )}
        </ProfilePicWrapper>
        <StyledHeading>Personal Information</StyledHeading>
        <FormWrapper>
          <Wrapper>
            <InputWrapper>
              {loading ? (
                <Skeleton height={"85px"} />
              ) : (
                <>
                  <InputLabel>User Name</InputLabel>
                  <SKUFormField
                    fullWidth
                    value={userName || ""}
                    variant="standard"
                    placeholder="User Name"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </>
              )}
            </InputWrapper>
            <InputWrapper>
              {loading ? (
                <Skeleton height={"85px"} />
              ) : (
                <>
                  <InputLabel>Dealer</InputLabel>
                  <SKUFormField
                    fullWidth
                    value={dealer}
                    variant="standard"
                    placeholder="Dealear Name"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    onChange={(e) => setDealer(e.target.value)}
                  />
                </>
              )}
            </InputWrapper>
          </Wrapper>
          <Wrapper>
            <InputWrapper>
              {loading ? (
                <Skeleton height={"85px"} />
              ) : (
                <>
                  <InputLabel>User Email</InputLabel>
                  <SKUFormField
                    fullWidth
                    value={traderEmail}
                    variant="standard"
                    placeholder="User Email"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    onChange={(e) => setTraderEmail(e.target.value)}
                  />
                </>
              )}
            </InputWrapper>
            <InputWrapper>
              {loading ? (
                <Skeleton height={"85px"} />
              ) : (
                <>
                  <InputLabel>Trader Phone Number</InputLabel>
                  <SKUFormField
                    fullWidth
                    value={traderPhone}
                    variant="standard"
                    placeholder="Phone Number"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    onChange={(e) => setTraderPhone(e.target.value)}
                  />
                </>
              )}
            </InputWrapper>
          </Wrapper>
        </FormWrapper>
      </SectionWrapper>
      <SectionWrapper>
        <StyledHeading>Social Media</StyledHeading>
        <FormWrapper>
          <Wrapper>
            <InputWrapper>
              {loading ? (
                <Skeleton height={"85px"} />
              ) : (
                <>
                  <InputLabel>Facebook</InputLabel>
                  <SKUFormField
                    fullWidth
                    value={socialLinks.facebook}
                    variant="standard"
                    placeholder="Enter your Facebook URL"
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FacebookIcon color="#ffffff" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      handleSocialChange("facebook", e.target.value)
                    }
                  />
                </>
              )}
            </InputWrapper>
            <InputWrapper>
              {loading ? (
                <Skeleton height={"85px"} />
              ) : (
                <>
                  <InputLabel>Instagram</InputLabel>
                  <SKUFormField
                    fullWidth
                    value={socialLinks.instagram}
                    variant="standard"
                    placeholder="Enter your Instagram URL"
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <InstagramIcon color="#ffffff" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      handleSocialChange("instagram", e.target.value)
                    }
                  />
                </>
              )}
            </InputWrapper>
          </Wrapper>
          <Wrapper>
            <InputWrapper>
              {loading ? (
                <Skeleton height={"85px"} />
              ) : (
                <>
                  <InputLabel>X (Twitter)</InputLabel>
                  <SKUFormField
                    fullWidth
                    value={socialLinks.twitter}
                    variant="standard"
                    placeholder="Enter your X URL"
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <XIcon color="#ffffff" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      handleSocialChange("twitter", e.target.value)
                    }
                  />
                </>
              )}
            </InputWrapper>
            <InputWrapper>
              {loading ? (
                <Skeleton height={"85px"} />
              ) : (
                <>
                  <InputLabel>LinkedIn</InputLabel>
                  <SKUFormField
                    fullWidth
                    value={socialLinks.linkedin}
                    variant="standard"
                    placeholder="Enter your LinkedIn URL"
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedInIcon color="#ffffff" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      handleSocialChange("linkedin", e.target.value)
                    }
                  />
                </>
              )}
            </InputWrapper>
          </Wrapper>
        </FormWrapper>
      </SectionWrapper>
      {loading ? (
        ""
      ) : (
        <ActionButtons>
          <SaveBtn type="submit" variant="contained">
            {loading ? "loading...." : "Save Profile"}
          </SaveBtn>
          <SaveBtn type="button" back variant="outlined">
            Discard
          </SaveBtn>
        </ActionButtons>
      )}
    </Stylediv>
  );
};

export default UserProfile;
