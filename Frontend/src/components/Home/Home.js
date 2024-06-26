import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { userContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const defaultCourseImage = require("../../assest/defaultCourseImage.jpg");

const Home = () => {
  const { token, setToken, userInfo } = useContext(userContext);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/course/getAllCourse", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setCourses(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="homeMian">
      {/* ===== Top bar of home page ===== */}
      <div className="headBar">
        <h3>
          Welcome{" "}
          {userInfo.firstName.replace(
            userInfo.firstName[0],
            userInfo.firstName[0].toUpperCase()
          )}
        </h3>
        <h4
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.clear();
            setToken("");
            navigate("/login");
          }}
        >
          Logout
        </h4>
      </div>

      {/* ===== Title part of home page ===== */}
      <div className="headTitle">
        <div className="headBg">
          <div className="headContent">
            <h2 className="title">Grand Academy</h2>
            <p className="subtitle">Your free courses</p>
            {userInfo.userRole === "T" && (
              <button
                className="ceateButton"
                onClick={() => {
                  navigate("/createCourse");
                }}
              >
                Create your course
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===== Body part of home page ===== */}
      <div className="homeBody">
        {courses.length !== 0 ? (
          <>
            {courses.map((course, i) => {
              return (
                <div
                  key={course._id}
                  className="theSingleCourse"
                  onClick={() => {
                    navigate(`/course/${course._id}`);
                  }}
                >
                  <div>
                    {/* ----- image of course in Home ----- */}
                    <img
                      className="courseImage"
                      src={course.courseImage || defaultCourseImage}
                    />

                    <div className="coursBody">
                      {/* ----- title and duration of course ----- */}
                      <div className="curserTitle">
                        <h3>{course.courseTitle}</h3>
                        <p>{course.courseDuration} hrs</p>
                      </div>

                      {/* ----- teacher of course ----- */}
                      <h4>
                        {userInfo.userId === course.teacher._id ? (
                          <p>Your course</p>
                        ) : (
                          <p>
                            By: {course.teacher.firstName}{" "}
                            {course.teacher.lastName}
                          </p>
                        )}
                      </h4>
                      {/* --------------------------------- */}
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </>
        ) : // If No courses available yet
        userInfo.userRole === "T" ? (
          <div className="teacherNote">
            {" "}
            <h4>Please Create Your First Course For Students.</h4>
          </div>
        ) : (
          <div className="StudentNote">
            <h4>No courses available, please wait until teachers publish.</h4>
          </div>
        )}
      </div>
      {/* ===== End line of body part ===== */}
    </div>
  );
};

export default Home;
