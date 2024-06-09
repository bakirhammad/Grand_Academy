import axios from "axios";
import "./PreviewCourse.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../App";
import Loader from "../Extra/Loader";
const defaultCourseImage = require("../../assest/defaultCourseImage.jpg");

const PreviewCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo, token } = useContext(userContext);
  const [course, setCourse] = useState("");

  const [loader, setloader] = useState(true);
  const [showMessage, setshowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/course/getOne/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setCourse(result.data.result);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  return (
    <div>
      {/* ===== Top bar of PreviewCourse page ===== */}
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

      {/* ===== Body part ===== */}
      {course ? (
        // Check untile data reach from server
        <div className="previewMainBody">
          <div className="previewSubBody">
            {/* -------- image of course ------ */}
            <img
              className="previewImage"
              src={course.courseImage || defaultCourseImage}
            />

            {/* -------- Teacher Name ------ */}
            <div className="topPreviewCourse">
              {course.teacher._id === userInfo.userId ? (
                <h4>My Course</h4>
              ) : (
                <h4>
                  By {course.teacher.firstName} {course.teacher.lastName}
                </h4>
              )}

              {/* -------- Update button if same teacher ------ */}
              {userInfo.userRole === "T" &&
                course.teacher._id === userInfo.userId && (
                  <button className="updateButton">Update Course</button>
                )}

              {/* ---- time of published course, will shown here when update button is hiddin --- */}
              {(userInfo.userRole === "T" || "S") &&
                course.teacher._id !== userInfo.userId && (
                  <p>
                    {" "}
                    {course.courseDate
                      .split("T")
                      .shift()
                      .split("-")
                      .reverse()
                      .join(".")}
                  </p>
                )}
            </div>

            {/* --- time of published course, will shown here when update button is Shown --- */}
            {userInfo.userRole === "T" &&
              course.teacher._id === userInfo.userId && (
                <p>
                  {" "}
                  {course.courseDate
                    .split("T")
                    .shift()
                    .split("-")
                    .reverse()
                    .join(".")}
                </p>
              )}

            {/* ----- course title and duration --------- */}
            <div className="topPreviewCourse">
              <h2>{course.courseTitle}</h2>
              <h4>{course.courseDuration} hrs</h4>
            </div>
            {/* ----- course description -------- */}
            <div className="courseBody">{course.courseBody}</div>

            {/* -------- Delete button if Same teacher ------ */}
            {userInfo.userRole === "T" &&
              course.teacher._id === userInfo.userId && (
                <button
                  className="deleteButton"
                  onClick={() => {
                    setshowMessage(true);
                    //  Send the Delete req to Server
                    axios
                      .delete(
                        `http://localhost:5000/course/deleteCourse/${id}`,
                        {
                          headers: { Authorization: `Bearer ${token}` },
                        }
                      )
                      .then((result) => {
                        setMessage(result.data.message);
                        setloader(false);
                      })
                      .catch((err) => {
                        setMessage(err.response.data.message);
                        setloader(false);
                      });
                  }}
                >
                  Delete Course
                </button>
              )}
          </div>
        </div>
      ) : (
        <div className="waitingPage">
          {" "}
          <Loader />{" "}
        </div>
      )}

      {/* ===== Show Message and Loader when click on Delete button ===== */}
      {showMessage && (
        <div className="C">
          <div className="D">
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

export default PreviewCourse;
