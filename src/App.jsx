// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// 페이지들
import Home from "./pages/Home.jsx";
import InfoList from "./pages/InfoList.jsx";
import InfoDetail from "./pages/InfoDetail.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminUpload from "./pages/AdminUpload.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/info" element={<InfoList />} />
          <Route path="/info/item" element={<InfoDetail />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
