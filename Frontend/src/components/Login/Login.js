import React, { useContext, useState } from "react";
import "./Login.css";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Extra/Loader";

const Login = () => {
  const { setToken, setUserInfo } = useContext(userContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errResp, setErrResp] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [loader, setLoader] = useState(false);

  return (
    <div className="loginPage">
      <h2>Grand Academy</h2>
      <h2>Login</h2>

      <div className="loginForm">
        <div className="loginEmail">
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="your email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrResp("");
              setIsEmpty(false);
            }}
          />
        </div>
        <br />

        <div className="loginPassword">
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="your password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrResp("");
              setIsEmpty(false);
            }}
          />
        </div>
        <br />

        {/* Error messages in faild Login */}
        {errResp && <div style={{ color: "red" }}>{errResp}</div>}
        {isEmpty && <div style={{ color: "red" }}>Please fill all fields</div>}

        <button
          className="loginButton"
          onClick={() => {
            setLoader(true);

            if (email === "" || password === "") {
              setLoader(false);
              return setIsEmpty(!isEmpty);
            }

            axios
              .post("http://localhost:5000/user/login", {
                email,
                password,
              })
              .then((result) => {
                console.log(result.data);
                localStorage.setItem("token", result.data.token);
                localStorage.setItem(
                  "UI",
                  JSON.stringify(result.data.userInfo)
                );
                setToken(result.data.token);
                setUserInfo(result.data.userInfo);
                navigate("/home");
                setLoader(false);
                setErrResp("");
                setIsEmpty(false);
              })
              .catch((err) => {
                setErrResp(err.response.data.message);
                setLoader(false);
              });
          }}
        >
          Login
        </button>

        <p>Don't have Account?</p>
        <button className="registerButton">Register Here</button>
      </div>

      {loader && <Loader />}
    </div>
  );
};

export default Login;
