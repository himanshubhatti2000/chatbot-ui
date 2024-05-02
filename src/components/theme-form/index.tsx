import "./style.css";
import React, { useState, FormEvent } from "react";
import Input from "../form/input";
import { Theme } from "../../context/chat-theme-context";
import Button from "../form/button";

interface ThemeFormProps {
  onClose: () => void;
  addTheme: (theme: Theme) => void;
}
const ThemeForm: React.FC<ThemeFormProps> = ({ onClose, addTheme }) => {
  const [themeName, setThemeName] = useState("");
  const [background, setBackground] = useState("");
  const [bubbleColor, setBubbleColor] = useState("");
  const [bubbleBackgroundColor, setBubbleBackgroundColor] = useState("");

  const handleAddTheme = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check for empty fields
    if (!themeName || !background || !bubbleColor || !bubbleBackgroundColor) {
      alert("All fields are required!");
      return;
    }

    const newTheme = {
      name: themeName,
      background: background,
      bubbleColor: bubbleColor,
      bubbleBackgroundColor: bubbleBackgroundColor,
    };

    addTheme(newTheme);
    onClose();
  };

  return (
    <form
      onSubmit={handleAddTheme}
      className="theme-form"
      onClick={(e) => e.stopPropagation()}
    >
      <Input
        type="text"
        value={themeName}
        onChange={(e) => setThemeName(e.target.value)}
        placeholder="Theme Name"
      />
      <Input
        type="text"
        value={background}
        onChange={(e) => setBackground(e.target.value)}
        placeholder="Background Color"
      />
      <Input
        type="text"
        value={bubbleColor}
        onChange={(e) => setBubbleColor(e.target.value)}
        placeholder="Bubble Color"
      />
      <Input
        type="text"
        value={bubbleBackgroundColor}
        onChange={(e) => setBubbleBackgroundColor(e.target.value)}
        placeholder="Bubble Background Color"
      />
      <Button type="submit" variant="contained">
        Add Theme
      </Button>
      <Button onClick={onClose} type="button">
        Cancel
      </Button>
    </form>
  );
};

export default ThemeForm;
