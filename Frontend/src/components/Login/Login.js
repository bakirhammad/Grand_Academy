import React, { useContext } from "react";
import "./Login.css";
import { userContext } from "../../App";

const Login = () => {
  const { token, setToken, setUserInfo } = useContext(userContext);
  return (
    <div>
      <h2>Grand Academy</h2>
      <h3>Login</h3>
      <div className="loginForm">
        <div className="loginEmail">
          <label>Email</label>
          <input type="email" placeholder="your email" />
        </div>

        <div className="loginPassword">
          <label>Password</label>
          <input type="password" placeholder="your password" />
        </div>

        <button>Login</button>
        <button>Register Here</button>
      </div>
    </div>
  );
};

export default Login;
