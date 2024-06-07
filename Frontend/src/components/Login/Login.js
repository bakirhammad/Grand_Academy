import React, { useContext, useState } from "react";
import "./Login.css";
import { userContext } from "../../App";

const Login = () => {
  const { token, setToken, setUserInfo } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="loginPage">
      <h2>Grand Academy</h2>
      <h2>Login</h2>

      <div className="loginForm">
        <div className="loginEmail">
          <label>Email</label>
          <br />
          <input type="email" placeholder="your email" />
        </div>
        <br />

        <div className="loginPassword">
          <label>Password</label>
          <br />
          <input type="password" placeholder="your password" />
        </div>
        <br />

        <button className="loginButton">Login</button>
        <p>Don't have Account?</p>
        <button className="registerButton">Register Here</button>
      </div>
    </div>
  );
};

export default Login;
