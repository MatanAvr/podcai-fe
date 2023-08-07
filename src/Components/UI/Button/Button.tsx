import "./Button.scss";

interface buttonProps {
  text?: string;
  type?: "outline" | "logo" | "regular";
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  active?: boolean;
}

export const Button = ({
  text,
  type = "regular",
  onClick,
  isLoading,
  disabled,
  active,
}: buttonProps) => {
  const internalOnClickHandler = (e: any) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`button-wrapper ${type} ${active ? "active" : ""}`}
      onClick={internalOnClickHandler}
      disabled={disabled}
    >
      {type === "logo" ? (
        <>
          podc<span className="colored">ai</span>
        </>
      ) : isLoading ? (
        <div className="button-loading">loading TODO</div>
      ) : (
        text
      )}
    </button>
  );
};
