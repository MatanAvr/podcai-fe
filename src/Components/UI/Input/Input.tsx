import { useEffect, useState } from "react";
import "./Input.scss";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

interface inputProps {
  id?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: "outline" | "underline";
  onBlur?: () => void;
  type?: "password" | "string";
}

export const Input = ({
  id,
  value,
  onChange,
  placeholder,
  style,
  type,
  onBlur,
}: inputProps) => {
  const [showPassword, setSHowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setSHowPassword((prev) => !prev);
  };

  useEffect(() => {}, [showPassword]);

  return (
    <div className="input-wrapper">
      <input
        id={id}
        className={`input-container ${style}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        type={type === "password" && showPassword ? "string" : type}
      />
      {type === "password" && (
        <div
          className="toggle-show-password-button"
          onClick={toggleShowPassword}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      )}
    </div>
  );
};
