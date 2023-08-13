import { useEffect, useState } from "react";
import "./Input.scss";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

interface inputProps {
  id?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputStyle?: "outline" | "underline";
  onBlur?: () => void;
  type?: "password" | "string";
  note?: string;
}

export const Input = ({
  id,
  value,
  onChange,
  placeholder,
  inputStyle,
  type,
  onBlur,
  note,
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
        className={`input-container ${inputStyle}`}
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
      {note && <div className="input-note">{note}</div>}
    </div>
  );
};
