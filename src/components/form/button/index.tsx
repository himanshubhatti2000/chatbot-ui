import "./style.css";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "text";
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  variant = "text",
  ...p
}) => {
  return <button className={`styled-btn btn-${variant} ${className}`} {...p} />;
};

export default Button;
