"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

export default function FormRegister() {
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
          username: form.txt_email,
          password: form.txt_password,
        }),
      });

      // แปลง response ที่ได้กลับมาจาก server ให้เป็น JSON object
      const result = await response.json();

      // เช็ค status code ของ response เพื่อแยกกรณีการแสดงผล
      if (response.ok) {
        // กรณีบันทึกข้อมูลสำเร็จ -> แสดง popup แจ้งเตือนสำเร็จ
        await Swal.fire({
          icon: "success",
          title: `บันทึกสำเร็จ (status: ${response.status})`,
          text: "เพิ่มข้อมูลผู้ใช้เรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#2E75B6",
        });
      } else if (response.status === 400) {
        // status 400 = Bad Request แสดง popup เตือน พร้อมข้อความ error จาก server
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fecc00",
        });
      } else if (response.status >= 500) {
        // status 500 ขึ้นไป = Server Error เกิดปัญหาฝั่งเซิร์ฟเวอร์
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl shadow-indigo-100 border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-8 py-7">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
 
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">
                  ชื่อ
                </label>
                <input
                  type="text"
                  name="txt_firstname"
                  value={form.txt_firstname}
                  onChange={handleChange}
                  className="w-full text-slate-900 border border-slate-300 rounded-lg px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
                  placeholder="firstname"
                  required
                />
              </div>
 
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">
                  นามสกุล
                </label>
                <input
                  type="text"
                  name="txt_lastname"
                  value={form.txt_lastname}
                  onChange={handleChange}
                  className="w-full text-slate-900 border border-slate-300 rounded-lg px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
                  placeholder="lastname"
                  required
                />
              </div>
            </div>
 
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                username
              </label>
              <input
                type="email"
                name="txt_email"
                value={form.txt_email}
                onChange={handleChange}
                className="w-full text-slate-900 border border-slate-300 rounded-lg px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
                placeholder="email"
                required
              />
            </div>
 
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">
                password
              </label>
              <input
                type="password"
                name="txt_password"
                value={form.txt_password}
                onChange={handleChange}
                className="w-full text-slate-900 border border-slate-300 rounded-lg px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
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
 