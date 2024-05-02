import React from "react";
import "./style.css";

interface NoteProps {
  children: string;
}
const Note: React.FC<NoteProps> = ({ children }) => {
  return (
    <div className="note">
      <p>*{children}</p>
    </div>
  );
};

export default Note;
