import React, { useContext, useState } from "react";
import "./CreateCourse.css";
import { userContext } from "../../App";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Extra/Loader";

const CreateCourse = () => {
  const { userInfo, token } = useContext(userContext);
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState("");
  const [courseBody, setCourseBody] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [isEmpty, setIsEmpty] = useState(false); // message if any reqiured field is Empty.
  const [loader, setloader] = useState(true); // To Show and hide loader.
  const [showMessage, setshowMessage] = useState(false); // To Show and hide loader.
  const [message, setMessage] = useState(""); // message of success register.

  return (
    <div>
      {/* ===== Top bar of CreateCourse page ===== */}
      <div className="headCourseBar">
        <h3>
          Welcome{" "}
          {userInfo.firstName.replace(
            userInfo.firstName[0],
            userInfo.firstName[0].toUpperCase()
          )}
        </h3>
        <h4>
          <Link className="homeLink" to="/home">
            Home
          </Link>
        </h4>
      </div>

      {/* ===== Body part of createCourse page ===== */}
      <div className="mainCeateBody">
        <div className="createCourseBody">
          {/* ----- Title of course ------ */}
          <div className="courseTitle">
            <label>
              The Course Title: <span className="star">*</span>
            </label>
            <br />
            <input
              className="createInputs"
              placeholder="Course title"
              onChange={(e) => {
                setIsEmpty(false);
                setCourseTitle(e.target.value);
              }}
            />
          </div>{" "}
          <br />
          {/* ----- Duration of course ------ */}
          <div className="courseDuration">
            <label>
              Course Duration: <span className="star">*</span>
            </label>
            <br />
            <input
              type="number"
              className="createInputs"
              placeholder="Number of hourse ex: 120"
              onChange={(e) => {
                setIsEmpty(false);
                setCourseDuration(e.target.value);
              }}
            />
          </div>
          <br />
          {/* ----- Description of course ------ */}
          <div className="courseBody">
            <label>
              Course Description: <span className="star">*</span>
            </label>
            <br />
            <textarea
              className="createInputs"
              rows={12}
              placeholder="Course description"
              onChange={(e) => {
                setIsEmpty(false);
                setCourseBody(e.target.value);
              }}
            />
          </div>
          <br />
          {/* ----- URL image of course ------ */}
          <div className="courseImage">
            <label>Course Image URL:</label>
            <br />
            <input
              className="createInputs"
              placeholder="Paste URT"
              onChange={(e) => {
                setCourseImage(e.target.value);
              }}
            />
          </div>
          <br />
          {/* ---- Error messages in faild Login -----*/}
          {isEmpty && (
            <div style={{ color: "red" }}>Please fill all * fields</div>
          )}
          {/* ----- Button of create course ------ */}
          <button
            className="createButton"
            onClick={() => {
              if (
                courseBody === "" ||
                courseDuration === "" ||
                courseTitle === ""
              ) {
                return setIsEmpty(!isEmpty);
              }
              setshowMessage(true);
              axios // send req to create new course
                .post(
                  "http://localhost:5000/course/createCourse",
                  {
                    courseTitle,
                    courseDuration,
                    courseBody,
                    courseImage,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((result) => {
                  setMessage(result.data.message);
                  setIsEmpty(false);
                  setloader(false);
                })
                .catch((err) => {
                  setMessage(err.response.data.message);
                  setIsEmpty(false);
                  setloader(false);
                });
            }}
          >
            Create The Course
          </button>
        </div>
      </div>

      {/* ===== Show Message and Loader after get response from server ===== */}
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
                    navigate("/home");
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

export default CreateCourse;
