import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import { createContext, useState } from "react";
export const userContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [UserInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("UI")) || {}
  );
  const navigate = useNavigate();

  return (
    <userContext.Provider value={{ token, setToken, UserInfo, setUserInfo }}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {token && <Route path="/home" element={<Home />} />}

          <Route
            path="*"
            element={
              <>
                <h2>No Content On This Path</h2>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Back to login
                </button>
              </>
            }
          />
        </Routes>
      </div>
    </userContext.Provider>
  );
}

export default App;
