import React from "react";
import "./style.css";

interface TwoColumnLayoutProps {
  imageUrl: string; // URL of the image to display on the left side
  children: React.ReactNode; // Content to display on the right side
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  imageUrl,
  children,
}) => {
  return (
    <div className="two-column-layout">
      <div className="left-column">
        <img src={imageUrl} alt="wasya chat box" />
      </div>
      <div className="right-column">{children}</div>
    </div>
  );
};

export default TwoColumnLayout;
