import "./LoadingSpinner.scss";

interface loadingSpinnerProps {}

export const LoadingSpinner = ({}: loadingSpinnerProps) => {
  return (
    <div className="loading-spinner-wrapper">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
