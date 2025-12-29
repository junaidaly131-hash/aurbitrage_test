import { useRef, useState } from "react";
import { CircularProgress, Modal, TextField, Typography } from "@mui/material";
import {
  InputLabel,
  Stylediv,
  Wrapper,
  SelectLogo,
  SubmitBtn,
  Profile,
  Picture,
  ProfileIcon,
} from "./styles";
import toast from "react-hot-toast";
import { addAffliation } from "@/apis/dealer";
export const Popup = ({ open, onClose, addAffliation: addNew }) => {
  const [logo, setLogo] = useState(null);
  const [name, setAffiliation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogo(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };
  const handleClick = (e) => {
    fileInputRef.current.click();
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    event.stopPropagation();
    if (!name || !description || !logo) {
      toast.error("Please fill in all required fields and upload an image.");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("logo", logo);
    const response = await addAffliation(formData);
    if (response.success) {
      toast.success(`Added affliation '${name}' `);
      addNew(response.data);
      onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Stylediv onSubmit={handleSubmit}>
        <Profile onClick={handleClick}>
          <Picture src={preview} />
          <ProfileIcon className="icon" />
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleLogoUpload}
          />
        </Profile>
        <InputLabel>Affiliation</InputLabel>
        <TextField
          fullWidth
          value={name}
          variant="standard"
          placeholder="Enter Affiliation"
          InputProps={{
            disableUnderline: true,
          }}
          onChange={(e) => setAffiliation(e.target.value)}
        />
        <InputLabel>Description</InputLabel>
        <TextField
          fullWidth
          value={description}
          variant="standard"
          placeholder="Enter Description"
          InputProps={{
            disableUnderline: true,
          }}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <Wrapper>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ display: "none" }}
            id="logo-upload"
            ref={fileInputRef}
          />

          <SelectLogo onClick={handleClick}>Upload Logo</SelectLogo>
        </Wrapper> */}
        <Wrapper>
          <SubmitBtn type="submit" disabled={loading}>
            Submit {loading && <CircularProgress size="small" />}
          </SubmitBtn>
        </Wrapper>
      </Stylediv>
    </Modal>
  );
};
