import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Extra/Loader";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("S");

  const [loader, setloader] = useState(true); // To Show and hide loader.
  const [showMessage, setshowMessage] = useState(false); // To Show and hide loader.
  const [message, setMessage] = useState(""); // message of success register.
  const [errResp, setErrResp] = useState(""); // message of Errot in register.
  const [isEmpty, setIsEmpty] = useState(false); // message if any reqiured field is Empty.

  return (
    <div className="registerBody">
      <h2>Register</h2>

      {/* ========= Start of Form =======*/}
      <div className="registerForm">
        {/* ====== First Name input ====== */}
        <div>
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Your first name"
            onChange={(e) => {
              setFirstName(e.target.value);
              setIsEmpty(false);
            }}
          />
        </div>
        <br />

        {/* ====== Last Name input ====== */}
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Your last name"
            onChange={(e) => {
              setLastName(e.target.value);
              setIsEmpty(false);
            }}
          />
        </div>
        <br />

        {/* ====== Email input ====== */}
        <div>
          <label>New Email:</label>
          <input
            type="email"
            placeholder="Your email"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmpty(false);
            }}
          />
        </div>
        <br />

        {/* ====== Password input ====== */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Your password"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsEmpty(false);
            }}
          />
        </div>
        <br />

        {/* ======= Type of account ======= */}

        <div className="accountType">
          <label htmlFor="T_S_radio">What are you?</label>
          <div>
            <p className="choises">
              <input
                type="radio"
                name="T_S"
                value="T"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
              <label>Teacher</label>
            </p>
            <p className="choises">
              <input
                type="radio"
                name="T_S"
                value="S"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
              <label>Student</label>
            </p>
          </div>
        </div>

        {/* Error messages in faild Resgiter */}
        {errResp && <div style={{ color: "red" }}>{errResp}</div>}
        {isEmpty && <div style={{ color: "red" }}>Please fill all fields</div>}

        {/* ========= Rgister Button ========== */}
        <button
          className="regButton"
          onClick={() => {
            if (
              firstName === "" ||
              lastName === "" ||
              email === "" ||
              password === ""
            ) {
              return setIsEmpty(!isEmpty);
            }

            setshowMessage(true);

            axios
              .post("http://localhost:5000/user/register", {
                firstName,
                lastName,
                email,
                password,
                role,
              })
              .then((result) => {
                setMessage(result.data.message);
                setloader(false);
              })
              .catch((err) => {
                setErrResp(err.response.data.message);
                setshowMessage(false);
              });
          }}
        >
          Create Account
        </button>
      </div>
      {/* =============== End Forms ================= */}

      {/* ===== Show Message and Loader part  After  Register ===== */}
      {showMessage && (
        <div className="A">
          <div className="B">
            {loader ? (
              <Loader />
            ) : (
              <>
                {" "}
                <div>{message}</div>
                <button
                  className="DoneButton"
                  onClick={() => {
                    setshowMessage(false);
                    setloader(true);
                    navigate("/login");
                  }}
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================================== */}
    </div>
  );
};

export default Register;
