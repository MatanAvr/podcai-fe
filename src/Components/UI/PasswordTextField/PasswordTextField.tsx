import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldVariants,
} from "@mui/material";

interface PasswordTextFieldProps {
  id: string;
  label: string;
  variant: TextFieldVariants | undefined;
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  value: string;
  required: boolean;
  helperText?: string;
}

export default function PasswordTextField({
  id,
  label,
  variant,
  onChange,
  value,
  required,
  helperText,
}: PasswordTextFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      onChange={onChange}
      value={value}
      type={showPassword ? "text" : "password"}
      required={required}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
