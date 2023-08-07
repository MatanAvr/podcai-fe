import "./Input.scss";

interface inputProps {
  id?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "outline" | "underline";
}

export const Input = ({
  id,
  value,
  onChange,
  placeholder,
  type,
}: inputProps) => {
  return (
    <input
      id={id}
      className={`input-wrapper ${type}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
