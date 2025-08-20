// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        ClassTodo
      </Link>

      <div className="flex gap-4">
        <Link
          to="/admin/login"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          관리자 로그인
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
