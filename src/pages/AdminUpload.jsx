// src/pages/AdminUpload.jsx
import React, { useState, useRef } from "react";
import { API_BASE_URL } from "../main.jsx";

function AdminUpload() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    grade: "",
    class: "",
    date: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) formData.append("img", file); // 👈 서버랑 키 맞춤

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      // 서버에서 HTML이 올 수도 있으니 안전하게 처리
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("서버 응답이 올바르지 않습니다:\n" + text);
      }

      if (!res.ok) {
        setMessage(data.message || "업로드 실패");
        return;
      }

      setMessage("✅ 업로드 완료!");
      setForm({ title: "", content: "", grade: "", class: "", date: "" });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      setMessage("업로드 중 오류 발생: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-6">게시물 업로드</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">제목</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">내용</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="5"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">학년</label>
            <input
              type="text"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">반</label>
            <input
              type="text"
              name="class"
              value={form.class}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">날짜</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">이미지 (선택)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="w-full"
          />
        </div>

        {message && <div className="text-sm text-center mt-2">{message}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          업로드
        </button>
      </form>
    </div>
  );
}

export default AdminUpload;
