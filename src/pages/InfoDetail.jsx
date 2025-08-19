// src/pages/InfoDetail.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../main.jsx";

function InfoDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return setLoading(false);

    fetch(`${API_BASE_URL}/info/item?id=${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-6">불러오는 중...</div>;
  }

  if (!post) {
    return <div className="p-6 text-red-600">게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title || "제목 없음"}</h1>
      <div className="text-sm text-gray-500 mb-4">
        {post.date ? new Date(post.date).toLocaleString() : ""}
      </div>

      {post.img && (
        <img
          src={`${API_BASE_URL}/uploads/${post.img}`}
          alt="첨부 이미지"
          className="max-h-80 object-contain mb-4 rounded"
        />
      )}

      <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
    </div>
  );
}

export default InfoDetail;
