import "./Modal.scss";

interface modalProps {
  type?: "regular" | "error";
  text: string;
}

export const Modal = ({ type = "regular", text }: modalProps) => {
  return (
    <div className={`modal-wrapper ${type}`}>
      <div className={`modal-container ${type}`}>{text}</div>
    </div>
  );
};
