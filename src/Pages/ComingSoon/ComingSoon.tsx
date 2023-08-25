import "./ComingSoon.scss";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { DynamicLogo } from "../../Components/UI/DynamicLogo/DynamicLogo";
import { openInNewWindow } from "../../Utils/Utils";
import { IconButton } from "../../Components/UI/IconButton/IconButton";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { useAppDispatch } from "../../Hooks/Hooks";
import { Button } from "@mui/material";

const twitterLink = "https://twitter.com/podcai";
const facebookLink = "https://www.facebook.com/podcai.co?mibextid=LQQJ4d";
const instagramLink = "https://instagram.com/podcai?igshid=MzRlODBiNWFlZA==";
const linkedinLink = "https://www.linkedin.com/company/podcai/";

export const ComingSoon = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="coming-soon-wrapper">
      <div className="info-wrapper">
        Coming Soon...
        <div className="title">
          podc<span className="colored">ai</span>
          <DynamicLogo />
        </div>
        <div>Daily personalized news podcasts</div>
        <div>powered by AI</div>
      </div>

      <Button
        variant="contained"
        onClick={() => dispatch(moveToPage("Sign up"))}
      >
        Sign up
      </Button>

      <div className="icons-wrapper">
        <IconButton onClick={() => openInNewWindow(twitterLink)}>
          <BsTwitter size={25} />
        </IconButton>

        <IconButton onClick={() => openInNewWindow(instagramLink)}>
          <BsInstagram size={25} />
        </IconButton>

        <IconButton onClick={() => openInNewWindow(facebookLink)}>
          <BsFacebook size={25} />
        </IconButton>

        <IconButton onClick={() => openInNewWindow(linkedinLink)}>
          <BsLinkedin size={25} />
        </IconButton>
      </div>
    </div>
  );
};
