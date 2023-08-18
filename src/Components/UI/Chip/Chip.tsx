import "./Chip.scss";
import _ from "lodash";

interface chipProps {
  text: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  size?: "small";
}

export const Chip = ({ text, onClick, active, disabled, size }: chipProps) => {
  return (
    <div
      className={`chip-wrapper ${active ? "active" : ""} ${
        disabled ? "disabled" : ""
      } ${size ? size : ""}`}
      onClick={onClick}
    >
      <div className="chip-container">{_.capitalize(text)}</div>
    </div>
  );
};
