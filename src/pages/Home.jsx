// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../index.jsx";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 로그인 여부 확인 (세션 기반)
    fetch(`${API_BASE_URL}/`, {
      credentials: "include", // 세션 쿠키 포함
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.error(err));
  }, []);

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
        <p className="text-gray-700">
          학년/반 별 게시물을 보려면 주소창에 직접
          <br />
          <code className="bg-gray-100 px-2 py-1 rounded">/info/1/1</code> 같은
          경로로 접속하세요. (예: 1학년 1반)
        </p>
      </div>
    </div>
  );
}

export default Home;
