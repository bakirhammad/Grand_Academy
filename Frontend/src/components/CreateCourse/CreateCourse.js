import React, { useContext } from "react";
import "./CreateCourse.css";
import { userContext } from "../../App";
import { Link } from "react-router-dom";

const CreateCourse = () => {
  const { userInfo } = useContext(userContext);
  return (
    <div>
      {/* ===== Top bar of CreateCourse page ===== */}
      <div className="headCourseBar">
        <h3>Welcome {userInfo.firstName}</h3>
        <h4>
          <Link className="homeLink" to="/home">Home</Link>
        </h4>
      </div>
    </div>
  );
};

export default CreateCourse;
