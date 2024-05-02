import "./style.css";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = "", ...p }) => {
  return <input className={`styled-input ${className}`} {...p} />;
};

export default Input;
