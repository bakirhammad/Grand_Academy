import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {" "}
      <h2>No Content At This Path</h2>
      <button
        style={{
          backgroundColor: "black",
          color: "white",
          width: "20%",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/login");
        }}
      >
        Back to login
      </button>
    </div>
  );
};

export default NotFound;
