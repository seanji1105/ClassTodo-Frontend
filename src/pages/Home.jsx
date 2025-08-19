// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../main.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [classNum, setClassNum] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.error(err));
  }, []);

  const handleRedirect = (e) => {
    e.preventDefault();
    if (grade && classNum) {
      const query = new URLSearchParams({
        school,
        grade,
        class: classNum,
      }).toString();
      navigate(`/info?${query}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">홈</h1>

      {user ? (
        <div className="text-green-600 font-medium">
          ✅ 로그인됨: {user.username}
        </div>
      ) : (
        <div className="text-gray-600">로그인된 계정이 없습니다.</div>
      )}

      <div className="mt-6">
        <form onSubmit={handleRedirect} className="flex gap-2">
          <input
            type="text"
            placeholder="학교명"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="border rounded px-3 py-2 w-32"
          />
          <input
            type="number"
            placeholder="학년"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border rounded px-3 py-2 w-20"
            min="1"
          />
          <input
            type="number"
            placeholder="반"
            value={classNum}
            onChange={(e) => setClassNum(e.target.value)}
            className="border rounded px-3 py-2 w-20"
            min="1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            이동
          </button>
        </form>

        <p className="text-gray-700 mt-4">
          학년/반 별 게시물을 보려면 입력 후 이동하세요.
        </p>
      </div>
    </div>
  );
}

export default Home;
