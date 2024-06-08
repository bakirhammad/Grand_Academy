import React, { useContext, useState } from "react";
import "./CreateCourse.css";
import { userContext } from "../../App";
import { Link } from "react-router-dom";

const CreateCourse = () => {
  const { userInfo } = useContext(userContext);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseBody, setBourseBody] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [courseDuration, setCourseDuration] = useState("");

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
          <input className="createInputs" placeholder="Course title" />
      
        </div>    <br />

        <div className="courseDuration">
          <label>
            Course Duration: <span className="star">*</span>
          </label>
          <br />
          <input className="createInputs" placeholder="Number of hourse ex: 120" />
        </div><br />

        <div className="courseBody">
          <label>
            Course Description: <span className="star">*</span>
          </label>
          <br />
          <textarea className="createInputs" rows={8} placeholder="Course description" />
        </div><br />

        <div className="courseImage">
          <label>
            Course Image URL: <span>(optional)</span>
          </label>
          <br />
          <input className="createInputs" placeholder="Paste URT" />
        </div><br />

        <button>Create The Course</button>
      </div>
      </div>
      {/* ===== End the Body ===== */}
    </div>
  );
};

export default CreateCourse;
