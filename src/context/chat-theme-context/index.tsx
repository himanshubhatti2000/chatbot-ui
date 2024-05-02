import "./theme-switcher-style.css";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface Theme {
  name: string;
  background: string;
  bubbleColor: string;
  bubbleBackgroundColor: string;
}

// Themes available
const themes: Theme[] = [
  {
    name: "default",
    background: "linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)",
    bubbleColor: "#33201a",
    bubbleBackgroundColor: "#FDF1E0",
  },
  {
    name: "sunny morning",
    background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    bubbleColor: "#33201a",
    bubbleBackgroundColor: "#fce59a",
  },
  {
    name: "deep blue",
    background: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
    bubbleColor: "#1c2732",
    bubbleBackgroundColor: "#e8d7f7",
  },
];

interface ChatThemeContextType {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  ThemeSwitcher: () => JSX.Element;
}

const ChatThemeContext = createContext<ChatThemeContextType | undefined>(
  undefined
);

// Provider component
export const ChatThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useLocalStorage<Theme>(
    "chatbox-theme",
    themes[0]
  );

  // Load theme from localStorage if exists
  useEffect(() => {
    const storedThemeName = localStorage.getItem("chatTheme");
    if (storedThemeName) {
      const storedTheme = themes.find(
        (theme) => theme.name === storedThemeName
      );
      if (storedTheme) setCurrentTheme(storedTheme);
    }
  }, [setCurrentTheme]);

  // Save theme to localStorage on change
  useEffect(() => {
    localStorage.setItem("chatTheme", currentTheme.name);
  }, [currentTheme]);

  const ThemeSwitcher = () => (
    <div className="theme-switcher">
      {themes.map((theme) => (
        <button
          key={theme.name}
          style={{
            background: theme.background,
            border: `3px solid ${
              currentTheme.name === theme.name
                ? "var(--primary-color)"
                : "transparent"
            }`,
          }}
          onClick={() => setCurrentTheme(theme)}
        >
          {currentTheme === theme && (
            <div
              className="visual-theme-circle "
              style={{
                background: theme.background,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );

  const value = { currentTheme, setCurrentTheme, ThemeSwitcher };

  return (
    <ChatThemeContext.Provider value={value}>
      {children}
    </ChatThemeContext.Provider>
  );
};

// Hook to use the theme context
export const useChatTheme = () => {
  const context = useContext(ChatThemeContext);
  if (!context) {
    throw new Error("useChatTheme must be used within a ChatThemeProvider");
  }
  return context;
};
