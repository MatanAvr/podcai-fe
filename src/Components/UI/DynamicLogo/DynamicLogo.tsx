import "./DynamicLogo.scss";

interface dynamicLogoProps {}

export const DynamicLogo = ({}: dynamicLogoProps) => {
  return (
    <div className="dynamic-logo-wrapper">
      <div className="dynamic-logo-container">
        <div className="bar" style={{ height: "40%" }} />
        <div className="bar" style={{ height: "30%" }} />
        <div className="bar" style={{ height: "70%" }} />
        <div className="bar" style={{ height: "90%" }} />
        <div className="bar" style={{ height: "100%" }} />
        <div className="bar" style={{ height: "70%" }} />
      </div>
    </div>
  );
};
