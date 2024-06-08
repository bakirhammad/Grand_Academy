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
  const [isEmpty, setIsEmpty] = useState(false);
  const [loader, setloader] = useState(true);
  const [showMessage, setshowMessage] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div>
      {/* ===== Top bar of CreateCourse page ===== */}
      <div className="headCourseBar">
        <h3>Welcome {userInfo.firstName}</h3>
        <h4>
          <Link className="homeLink" to="/home">
            Home
          </Link>
        </h4>
      </div>

      {/* ===== Body part of createCourse page ===== */}
      <div className="mainCeateBody">
        <div className="createCourseBody">
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
          <div className="courseBody">
            <label>
              Course Description: <span className="star">*</span>
            </label>
            <br />
            <textarea
              className="createInputs"
              rows={8}
              placeholder="Course description"
              onChange={(e) => {
                setIsEmpty(false);
                setCourseBody(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="courseImage">
            <label>
              Course Image URL: <span>(optional)</span>
            </label>
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
          {isEmpty && (
            <div style={{ color: "red" }}>Please fill all * fields</div>
          )}
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
              axios
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

      {/* ===== Show Message and Loader part ===== */}
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
