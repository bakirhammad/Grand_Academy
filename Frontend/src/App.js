import { Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import { createContext, useState } from "react";
export const userContext = createContext();

function App() {
  const [token, setToken] = useState("");
  const [UserInfo, setUserInfo] = useState({});

  return (
    <userContext.Provider value={{ token, setToken, UserInfo, setUserInfo }}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {token && <Route path="/home" element={<Home />} />}

          <Route path="*" element={<h2>No Content On This Path</h2>} />
        </Routes>
      </div>
    </userContext.Provider>
  );
}

export default App;
