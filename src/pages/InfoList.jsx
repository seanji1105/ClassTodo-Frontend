// src/pages/InfoList.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../main.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function InfoList() {
  const [searchParams] = useSearchParams();
  const school = searchParams.get("school") || "";
  const grade = searchParams.get("grade") || "";
  const classNum = searchParams.get("class") || "";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams({
      school,
      grade,
      class: classNum,
    }).toString();
    fetch(`${API_BASE_URL}/info?${query}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [school, grade, classNum]);

  // 날짜별 수행평가만 모으기
  const examByDate = useMemo(() => {
    const map = {};
    posts.forEach((post) => {
      if (!post.date) return;

      // 수행평가 여부 판별 규칙 👉 여기 필요에 맞게 고치면 됨
      // 예시: point 존재하면 수행평가라고 가정
      if (post.point) {
        const dateKey = new Date(post.date).toDateString();
        if (!map[dateKey]) map[dateKey] = [];
        map[dateKey].push(post);
      }
    });
    return map;
  }, [posts]);

  if (loading) return <div className="p-6">불러오는 중...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">
        {school && `${school} - `}
        {grade}학년 {classNum}반 게시물
      </h1>

      {/* 달력 */}
      <Calendar
        onClickDay={(value) => setSelectedDate(value)}
        tileClassName={({ date }) => {
          const key = date.toDateString();
          return examByDate[key] ? "bg-red-300 rounded-full" : null;
        }}
      />

      {/* 날짜 선택 시 해당 수행평가 보여주기 */}
      {selectedDate && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            {selectedDate.toLocaleDateString()} 수행평가
          </h2>
          {examByDate[selectedDate.toDateString()] ? (
            <ul className="space-y-2">
              {examByDate[selectedDate.toDateString()].map((post) => (
                <li key={post._id}>
                  <Link
                    to={`/info/item?id=${post._id}`}
                    className="text-red-600 hover:underline"
                  >
                    {post.name || "제목 없음"} ({post.subject})
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">수행평가가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default InfoList;
