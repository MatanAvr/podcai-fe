import "./ComingSoon.scss";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { Input } from "../../Components/UI/Input/Input";
import { Button } from "../../Components/UI/Button/Button";
import React, { useState } from "react";
import { DynamicLogo } from "../../Components/UI/DynamicLogo/DynamicLogo";
import { LoadingSpinner } from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import {
  addErrorToId,
  isValidEmail,
  removeErrorFromId,
} from "../../Utils/Utils";
import { error } from "console";
import { Modal } from "../../Components/UI/Modal/Modal";

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

  const sunbsricbeFieldsArr: {
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
    }
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

      {!isSending && !ok && (
        <form className="form-wrapper" onSubmit={onSubmitHandler}>
          {sunbsricbeFieldsArr.map((field, index) => {
            const key = field.id;
            return (
              <Input
                key={"SB" + index}
                id={field.id}
                value={formData[key]}
                onChange={onChangeHandler}
                placeholder={field.placeholder}
                type="underline"
                onBlur={validateFields}
              />
            );
          })}
          <Button text="Subscribe" type="outline" />
        </form>
      )}

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
        <BsTwitter size={25} />
        <BsInstagram size={25} />
        <BsFacebook size={25} />
        <BsLinkedin size={25} />
      </div>
      {showModal && <Modal text="error" />}
    </div>
  );
};
