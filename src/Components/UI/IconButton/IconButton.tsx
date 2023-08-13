import "./IconButton.scss";
import React from "react";

interface iconButtonProps {
  onClick: () => void;
  children: JSX.Element;
}

export const IconButton: React.FC<iconButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <div className="icon-button-wrapper" onClick={onClick}>
      {children}
    </div>
  );
};
