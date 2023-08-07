import "./Chip.scss";

interface chipProps {
  text: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export const Chip = ({ text, onClick, active, disabled }: chipProps) => {
  return (
    <div
      className={`chip-wrapper ${active ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={onClick}
    >
      <div className="chip-container">{text}</div>
    </div>
  );
};
