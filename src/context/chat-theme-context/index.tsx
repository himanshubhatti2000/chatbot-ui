import "./theme-switcher-style.css";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
  useState,
} from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ThemeForm from "../../components/theme-form";

export interface Theme {
  name: string;
  background: string;
  bubbleColor: string;
  bubbleBackgroundColor: string;
}

// Themes available
const initialThemes: Theme[] = [
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
  {
    name: "default",
    background: "linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)",
    bubbleColor: "#33201a",
    bubbleBackgroundColor: "#FDF1E0",
  },
];

interface ChatThemeContextType {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  ThemeSwitcher: () => JSX.Element;
  addTheme: (theme: Theme) => void;
}

const ChatThemeContext = createContext<ChatThemeContextType | undefined>(
  undefined
);

// Provider component
export const ChatThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themes, setThemes] = useLocalStorage<Theme[]>(
    "chat-themes",
    initialThemes
  );
  const [currentTheme, setCurrentTheme] = useLocalStorage<Theme>(
    "chat-theme",
    themes[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // set current theme to newTheme
  useEffect(() => {
    setCurrentTheme(themes[themes.length - 1]);
  }, [themes, setCurrentTheme]);

  const ThemeSwitcher = () => (
    <div className="theme-switcher">
      <div className="btn-container">
        <button onClick={openModal} className="theme-btn">
          <span>+</span>
        </button>
        {themes.map((theme) => (
          <button
            className="theme-btn"
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

      {isModalOpen && (
        <div className="modal-background" onClick={closeModal}>
          <ThemeForm onClose={closeModal} addTheme={addTheme} />
        </div>
      )}
    </div>
  );

  const addTheme = useCallback(
    (newTheme: Theme) => {
      const updatedThemes = [...themes, newTheme];
      setThemes(updatedThemes);
    },
    [themes, setThemes]
  );

  const value = { currentTheme, setCurrentTheme, ThemeSwitcher, addTheme };

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
