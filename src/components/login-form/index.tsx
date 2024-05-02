import "./style.css";
import React, { useState } from "react";
import Input from "../form/input";
import { validateEmail, validatePassword } from "../../utils";

interface LoginProps {
  login: (value: string) => void;
}

const Login: React.FC<LoginProps> = ({ login }) => {
  const [email, setEmail] = useState("himanshubhatti2000@gmail.com");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      login(email);
    }
  };

  return (
    <form
      className="login-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <div className="field-container">
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="error">{emailError}</div>}
      </div>
      <div className="field-container">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="error">{passwordError}</div>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

const MemoizedLogin = React.memo(Login);
export default MemoizedLogin;
