import _ from "lodash";
import "./SelectBox.scss";
import { Card } from "@mui/material";

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
    <Card
      variant="outlined"
      className={`select-box-wrapper ${active ? "active" : ""}`}
    >
      <div
        className={`select-box-wrapper ${active ? "active" : ""} ${
          disabled ? "disabled" : ""
        }`}
        onClick={onClick}
      >
        <div className="select-box-container">{_.capitalize(text)}</div>
      </div>
    </Card>
  );
};
