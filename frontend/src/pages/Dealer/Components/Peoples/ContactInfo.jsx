import {
  ContactCardContainer,
  ContactCard,
  ContactWrapper,
  ContactHeading,
  Contact,
  Go,
} from "./styles";
import { formatPhoneNumber } from "@/lib";
import SendIcon from "@/components/Icons/SendIcon";
import Copy from "@/assets/images/copy.svg";
import CallIconOutline from "@/assets/images/call-icon-outline.png";
import EmailIcon from "@/assets/images/email 1.svg";
import toast from "react-hot-toast";
import ContactCardIcon from "@/assets/icons/contact-card.svg";
import { useState } from "react";

const ContactInfo = ({ user, index }) => {
  const [visibleTooltipIndex, setVisibleTooltipIndex] = useState(null);
  const handleMouseEnter = () => {
    setVisibleTooltipIndex(index);
  };
  const handleMouseLeave = () => {
    setVisibleTooltipIndex(null);
  };
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast("Text Copied!", {
      position: "top-center",
    });
  };

  return (
    <ContactCardContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={ContactCardIcon} alt="contact-icon" />
      {visibleTooltipIndex === index && (
        <ContactCard>
          <ContactWrapper>
            <ContactHeading>Contact Card</ContactHeading>
            {user.phoneNo && (
              <Contact className="contactPhoneNo">
                <img
                  loading="lazy"
                  src={CallIconOutline}
                  alt="call-icon"
                  className="icon"
                />
                <span>{formatPhoneNumber(user.phoneNo)}</span>
                <Go>
                  <SendIcon />
                  <img
                    onClick={() => handleCopy(user.phoneNo)}
                    className="icon"
                    src={Copy}
                    alt=""
                  />
                </Go>
              </Contact>
            )}
            {user.email && (
              <Contact className="contactEmail">
                <img src={EmailIcon} alt="email-icon" className="icon" />
                <span className="emailText">{user.email}</span>
                <Go>
                  <SendIcon />
                  <img
                    onClick={() => handleCopy(user.email)}
                    className="icon"
                    src={Copy}
                    alt="copy"
                  />
                </Go>
              </Contact>
            )}
          </ContactWrapper>
        </ContactCard>
      )}
    </ContactCardContainer>
  );
};

export default ContactInfo;
