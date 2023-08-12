import "./SelectBox.scss";

interface selectBoxProps {
  text: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export const SelectBox = ({
  text,
  onClick,
  active,
  disabled,
}: selectBoxProps) => {
  return (
    <div
      className={`select-box-wrapper ${active ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
    >
      <div className="select-box-container">{text}</div>
    </div>
  );
};
