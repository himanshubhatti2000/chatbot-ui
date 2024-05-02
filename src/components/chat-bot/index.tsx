import "./style.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { MdLogout } from "react-icons/md";
import { useChatTheme } from "../../context/chat-theme-context";
import { useAuth } from "../../context/auth-context";
import Textbox from "./textbox";

const MESSAGE_DELAY_TIMINGS_IN_MILLISECONDS = 1000;

interface Message {
  sender: { email: string };
  text?: string;
  imgSrc?: string;
}

const messages: Message[] = [
  { sender: { email: "test@gmail.com" }, text: "Hi there! 👋" },
  {
    sender: { email: "test@gmail.com" },
    text: "I'm Wysa - an AI chatbot built by therapists.",
  },
  {
    sender: { email: "test@gmail.com" },
    text: "I'm here to understand your concerns and connect you with the best resources available to support you.",
  },
  { sender: { email: "test@gmail.com" }, text: "Can I help?" },
  { sender: { email: "test@gmail.com" }, imgSrc: "/wysa.png", text: "" },
];

const Chatbot: React.FC = () => {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [index, setIndex] = useState(0);
  const { currentTheme, ThemeSwitcher } = useChatTheme();
  const { logout, user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // scroll messages to bottom
  const scrollToBottom = useCallback(
    () =>
      setTimeout(() => {
        if (messagesEndRef.current) {
          console.log("working scroll");
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 0),
    []
  );

  // adding new messages
  const addNewMessage = useCallback((message: Message) => {
    setDisplayedMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {
    if (index < messages.length) {
      const timeout = setTimeout(() => {
        addNewMessage(messages[index]);
        setIndex(index + 1);
      }, MESSAGE_DELAY_TIMINGS_IN_MILLISECONDS);

      return () => clearTimeout(timeout);
    }
  }, [index, addNewMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages, scrollToBottom]);

  const handleSendMessage = useCallback(
    ({ text, imgSrc }: { text?: string; imgSrc?: string }) => {
      const newMessage: Message = {
        sender: { email: user?.email || "" },
        text,
        imgSrc,
      };
      addNewMessage(newMessage);
    },
    [user, addNewMessage]
  );

  return (
    <div
      className="chatbot-container"
      style={{
        background: currentTheme.background,
        color: currentTheme.bubbleColor,
      }}
    >
      <div className="chatbot">
        <nav>
          <button onClick={logout} className="logout">
            <MdLogout />
          </button>
          <ThemeSwitcher />
        </nav>
        <div className="messages-container">
          <div className="messages">
            {displayedMessages.map((msg: Message, i: number) => {
              const isMessageSentByMe = msg.sender.email === user?.email;
              return (
                <div
                  className={`chat-bubble-container ${
                    isMessageSentByMe ? "chat-bubble-end" : ""
                  }`}
                  key={msg.text ? msg.text + i : 1}
                >
                  <div
                    className={`chat-bubble ${
                      displayedMessages?.length - 1 === i
                        ? isMessageSentByMe
                          ? "last-message-mine"
                          : "last-message-other"
                        : ""
                    }`}
                    style={{
                      backgroundColor: isMessageSentByMe
                        ? currentTheme.bubbleBackgroundColor
                        : "#fff",
                    }}
                  >
                    {msg.text && <p>{msg.text}</p>}
                    {msg.imgSrc && (
                      <img
                        src={msg.imgSrc}
                        alt="Uploaded"
                        onLoad={scrollToBottom}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <Textbox handleSubmit={handleSendMessage} />
      </div>
    </div>
  );
};

const MemoizedChatbot = React.memo(Chatbot);
export default MemoizedChatbot;
