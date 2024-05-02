import "./App.css";
import React from "react";
import Login from "./components/login-form";
import Chatbot from "./components/chat-bot";
import { useAuth } from "./context/auth-context";
import TwoColumnLayout from "./layouts/two-column-layout";
import { ChatThemeProvider } from "./context/chat-theme-context";
import Note from "./components/note";

// App will show login  page if not authenticated, otherwise chatbot
const App: React.FC = () => {
  const { isLoggedIn, login } = useAuth();

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <ChatThemeProvider>
          <Chatbot />
        </ChatThemeProvider>
      ) : (
        <TwoColumnLayout imageUrl="/wysa-chatbox.png">
          <h2 className="app-header">CHATBOT</h2>
          <Note>
            Please use any valid email address and ensure your password is at
            least 6 characters long. Thank you!
          </Note>
          <Login login={login} />
        </TwoColumnLayout>
      )}
    </div>
  );
};

export default App;
