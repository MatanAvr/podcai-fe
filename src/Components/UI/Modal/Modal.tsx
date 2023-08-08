import "./Modal.scss";

interface modalProps {
  text: string;
}

export const Modal = ({ text }: modalProps) => {
  return <div className={`modal-wrapper`}>{text}</div>;
};
