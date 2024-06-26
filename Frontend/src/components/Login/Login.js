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
      {/* ====== Email input ====== */}
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

        {/* ====== Password input ====== */}
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

        {/* ===== Send the req to Server ======*/}
        <button
          className="loginButton"
          onClick={() => {
            if (email === "" || password === "") {
              return setIsEmpty(!isEmpty);
            }

            setLoader(true);
            // send login req ====>
            axios
              .post("http://localhost:5000/user/login", {
                email,
                password,
              })
              .then((result) => {
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
        <button
          className="registerButton"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register Here
        </button>
      </div>
      {/* ============================================= */}
      {loader && (
        <div className="loaderWindow">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Login;
