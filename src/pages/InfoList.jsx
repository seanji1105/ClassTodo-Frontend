// src/pages/InfoList.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../main.jsx";

function InfoList() {
  const { grade, class: classNum } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/info/${grade}/${classNum}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [grade, classNum]);

  if (loading) {
    return <div className="p-6">불러오는 중...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">
        {grade}학년 {classNum}반 게시물
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">게시물이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post._id}
              className="border-b pb-2 last:border-b-0 flex justify-between items-center"
            >
              <Link
                to={`/info/${grade}/${classNum}/${post._id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title || "제목 없음"}
              </Link>
              <span className="text-sm text-gray-500">
                {post.date ? new Date(post.date).toLocaleDateString() : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InfoList;
