import "./ComingSoon.scss";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
// import { Input } from "../../Components/UI/Input/Input";
import { Button } from "../../Components/UI/Button/Button";
import React, { useState } from "react";
import { DynamicLogo } from "../../Components/UI/DynamicLogo/DynamicLogo";
import { LoadingSpinner } from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import {
  addErrorToId,
  isValidEmail,
  removeErrorFromId,
} from "../../Utils/Utils";
import { Modal } from "../../Components/UI/Modal/Modal";
import { IconButton } from "../../Components/UI/IconButton/IconButton";
import { moveToPage } from "../../Features/Navigation/Navigation";
import { useAppDispatch } from "../../Hooks/Hooks";

const twitterLink = "https://twitter.com/podcai";
const facebookLink = "https://www.facebook.com/podcai.co?mibextid=LQQJ4d";
const instagramLink = "https://instagram.com/podcai?igshid=MzRlODBiNWFlZA==";
const linkedinLink = "https://www.linkedin.com/company/podcai/";

interface subscribeFormFields {
  firstname: string;
  lastname: string;
  email: string;
}

const defaultFormFields: subscribeFormFields = {
  firstname: "",
  lastname: "",
  email: "",
};

export const ComingSoon = () => {
  const [formData, setFormData] =
    useState<subscribeFormFields>(defaultFormFields);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const subsricbeFieldsArr: {
    id: "firstname" | "lastname" | "email";
    placeholder: string;
  }[] = [
    { id: "firstname", placeholder: "Enter first name" },
    { id: "lastname", placeholder: "Enter last name" },
    { id: "email", placeholder: "Enter email" },
  ];

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { id: key, value } = e.target;
    // console.log(key, value);
    const formDataTemp = { ...formData };
    //@ts-ignore
    formDataTemp[key] = value;
    setFormData(formDataTemp);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submiting");
    const valid = validateFields();
    if (!valid) console.warn("coming soon form not valid");
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setOk(true);
    }, 2500);
  };

  const validateFields = () => {
    let error = "";
    const emailValid = isValidEmail(formData.email);
    if (!emailValid) {
      addErrorToId("email");
      error = "Invalid email";
    } else {
      removeErrorFromId("email");
    }
    if (error !== "") {
      setShowModal(true);
      return false;
    }
    return true;
  };

  return (
    <div className="coming-soon-wrapper">
      <div className="info-wrapper">
        Coming Soon...
        <div className="title">
          podc<span className="colored">ai</span>
          <DynamicLogo />
        </div>
        <div>Personalized podcasts</div>
        <div>powered by AI</div>
      </div>

      <Button
        text="SignUp"
        type="outline"
        onClick={() => {
          dispatch(moveToPage("SignUp"));
        }}
      />

      {isSending ? (
        <LoadingSpinner />
      ) : ok ? (
        <div className="res-container">
          <div>Thanks for subscribing !</div>
          <div>You will get the sample soon !</div>
        </div>
      ) : (
        ""
      )}

      <div className="icons-wrapper">
        <IconButton onClick={() => window.open(twitterLink, "_blank")}>
          <BsTwitter size={25} />
        </IconButton>

        <IconButton onClick={() => window.open(instagramLink, "_blank")}>
          <BsInstagram size={25} />
        </IconButton>

        <IconButton onClick={() => window.open(facebookLink, "_blank")}>
          <BsFacebook size={25} />
        </IconButton>

        <IconButton onClick={() => window.open(linkedinLink, "_blank")}>
          <BsLinkedin size={25} />
        </IconButton>
      </div>
      {showModal && <Modal text="error" />}
    </div>
  );
};
