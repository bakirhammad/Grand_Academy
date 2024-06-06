const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Grand_Academy")
  .then((res) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error From db connection : ", err);
  });
