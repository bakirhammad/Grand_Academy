import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import { createContext, useState } from "react";
import NotFound from "./components/NotFound/NotFound";
import PreviewCourse from "./components/PreviewCourse/PreviewCourse";
import CreateCourse from "./components/CreateCourse/CreateCourse";
export const userContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("UI")) || {}
  );

  return (
    <userContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {token && <Route path="/home" element={<Home />} />}
          {token && <Route path="/course/:id" element={<PreviewCourse />} />}
          {token && userInfo.userRole === "T" && <Route path="createCourse" element={<CreateCourse />} />}

          {/* This Route for any unassigned path */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </userContext.Provider>
  );
}

export default App;
