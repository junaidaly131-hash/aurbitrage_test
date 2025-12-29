import { SOCIAL_ICONS } from "@/constants/socialIcons";
import { SocialLinks, SocialLink } from "../../styles";
import { useState, useEffect } from "react";

const Links = ({ user }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (user.socials) {
      const socialLinks =
        typeof user.socials === "object"
          ? user.socials
          : JSON.stringify(user.socials);
      setLinks(socialLinks);
    }
  }, [user.socials]);

  return (
    <SocialLinks gap="6px" align="center">
      {Object.keys(links).map((link) => {
        const Logo = SOCIAL_ICONS[link];
        if (links[link]) {
          return (
            <SocialLink key={link}>
              <Logo />
            </SocialLink>
          );
        }
      })}
    </SocialLinks>
  );
};

export default Links;
