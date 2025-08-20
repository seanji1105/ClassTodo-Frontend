// src/pages/AdminUpload.jsx
import React, { useState, useRef } from "react";
import { API_BASE_URL } from "../main.jsx";

function AdminUpload() {
  const [form, setForm] = useState({
    school: "",
    grade: "",
    class: "",
    subject: "",
    name: "",
    point: "",
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
      if (file) formData.append("img", file);

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

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
      setForm({
        grade: "",
        class: "",
        subject: "",
        name: "",
        point: "",
        date: "",
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      setMessage("업로드 중 오류 발생: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-md rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-6">수행노트 업로드</h1>
      <h2 className="text-lg text-gray-600 mb-4">관리자</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">학교</label>
            <input
              type="text"
              name="school"
              value={form.school}
              onChange={handleChange}
              placeholder="예: --고"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">학년</label>
            <input
              type="text"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              placeholder="예: 1"
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
              placeholder="예: 3"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">과목</label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">선택</option>
            <option value="국어">국어</option>
            <option value="수학">수학</option>
            <option value="영어">영어</option>
            <option value="한국사">한국사</option>
            <option value="사회">사회</option>
            <option value="과학">과학</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">수행 주제</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="수행 주제를 입력하세요"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">상세 내용</label>
          <input
            type="text"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="수행 내용을 입력하세요"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">점수</label>
          <input
            type="text"
            name="point"
            value={form.point}
            onChange={handleChange}
            placeholder="예: 90"
            className="w-full border rounded px-3 py-2"
          />
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

        {message && (
          <div className="text-sm text-center mt-2 text-blue-600">
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          제출
        </button>
      </form>
    </div>
  );
}

export default AdminUpload;
