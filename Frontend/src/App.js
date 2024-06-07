import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import { createContext, useState } from "react";
import NotFound from "./components/NotFound/NotFound";
export const userContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [UserInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("UI")) || {}
  );

  return (
    <userContext.Provider value={{ token, setToken, UserInfo, setUserInfo }}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {token && <Route path="/home" element={<Home />} />}

          {/* This Route for any unassigned path */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </userContext.Provider>
  );
}

export default App;
