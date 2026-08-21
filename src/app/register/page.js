"use client";

import React, { useState } from "react";

import Swal from "sweetalert2";

export default function FormRegister() {
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_username: "", 
    txt_password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.itdev.cmtc.ac.th/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: form.txt_firstname,
          lastname: form.txt_lastname,
          username: form.txt_username,
          password: form.txt_password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: `บันทึกสำเร็จ (status: ${response.status})`,
          text: "เพิ่มข้อมูลผู้ใช้เรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#2E75B6",
        });
        setForm({ txt_firstname: "", txt_lastname: "", txt_email: "", txt_password: "" });
      } else if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fecc00",
        });
      } else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: `ระบบขัดข้อง (status: ${response.status})`,
          text: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้งในภายหลัง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950" 
        : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    }`}>
      
      <div className="w-full max-w-xl flex flex-col gap-4">
        
        {/* ปรับปรุงใหม่: ปุ่มสลับธีมแบบเด่นชัดเจน วางไว้เหนือกรงฟอร์มหลัก */}
        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-xl active:scale-95 transition-all duration-200 border-2 ${
              darkMode 
                ? "bg-amber-400 border-amber-300 text-slate-900 hover:bg-amber-300 shadow-amber-500/10 animate-pulse" 
                : "bg-slate-900 border-slate-800 text-white hover:bg-slate-800 shadow-slate-950/20"
            }`}
          >
            {darkMode ? (
              <>
                {/* ไอคอนดวงอาทิตย์สีเข้ม */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
                <span>เปิดโหมดสว่าง (Light)</span>
              </>
            ) : (
              <>
                {/* ไอคอนดวงจันทร์สีขาว */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
                <span>เปิดโหมดมืด (Dark)</span>
              </>
            )}
          </button>
        </div>

        {/* Form Card */}
        <div className={`backdrop-blur rounded-2xl shadow-xl transition-all duration-300 border border-solid ${
          darkMode 
            ? "bg-slate-900/95 shadow-indigo-950/20 border-slate-800" 
            : "bg-white/90 shadow-indigo-100 border-slate-200"
        }`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-7 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  ฟอร์มสมัครสมาชิก
                </h1>
                <p className="text-blue-100 text-sm mt-0.5">
                  กรอกข้อมูลด้านล่างเพื่อสร้างบัญชีผู้ใช้ใหม่
                </p>
              </div>
            </div>
          </div>
 
          {/* Form Elements */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={`text-sm font-medium block mb-1.5 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                  ชื่อ
                </label>
                <input
                  type="text"
                  name="txt_firstname"
                  value={form.txt_firstname}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-2.5 outline-none transition focus:ring-2 placeholder:text-slate-400 ${
                    darkMode 
                      ? "text-white bg-slate-800 border-slate-700 focus:border-indigo-500 focus:ring-indigo-950" 
                      : "text-slate-900 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                  placeholder="firstname"
                  required
                />
              </div>
 
              <div>
                <label className={`text-sm font-medium block mb-1.5 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                  นามสกุล
                </label>
                <input
                  type="text"
                  name="txt_lastname"
                  value={form.txt_lastname}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-2.5 outline-none transition focus:ring-2 placeholder:text-slate-400 ${
                    darkMode 
                      ? "text-white bg-slate-800 border-slate-700 focus:border-indigo-500 focus:ring-indigo-950" 
                      : "text-slate-900 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                  placeholder="lastname"
                  required
                />
              </div>
            </div>
 
            <div>
              <label className={`text-sm font-medium block mb-1.5 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                username (username)
              </label>
              <input
                type="text"
                name="txt_username"
                value={form.txt_username}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2.5 outline-none transition focus:ring-2 placeholder:text-slate-400 ${
                  darkMode 
                    ? "text-white bg-slate-800 border-slate-700 focus:border-indigo-500 focus:ring-indigo-950" 
                    : "text-slate-900 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
                placeholder="ชื่อผู้ใช้"
                required
              />
            </div>
 
            <div>
              <label className={`text-sm font-medium block mb-1.5 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                รหัสผ่าน (Password)
              </label>
              <input
                type="password"
                name="txt_password"
                value={form.txt_password}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2.5 outline-none transition focus:ring-2 placeholder:text-slate-400 ${
                  darkMode 
                    ? "text-white bg-slate-800 border-slate-700 focus:border-indigo-500 focus:ring-indigo-950" 
                    : "text-slate-900 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                }`}
                placeholder="password"
                required
              />
            </div>
            
            <div className="pt-3">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-150"
              >
                บันทึกข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}