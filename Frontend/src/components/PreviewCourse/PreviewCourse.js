import React from "react";
import { useParams } from "react-router-dom";

const PreviewCourse = () => {
  const { id } = useParams();

  return <div>PreviewCourse</div>;
};

export default PreviewCourse;
