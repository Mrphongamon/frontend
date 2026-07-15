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
          username: form.txt_username,
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
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md border">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">ฟอร์มสมัครสมาชิก</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 flex flex-col">
          <div>
            <label className="text-black block mb-2">กรุณาระบุชื่อ</label>
            <input
              type="text"
              name="txt_firstname"
              value={form.txt_firstname}
              onChange={handleChange}
              className="w-full border text-black border-black rounded-md px-4 py-2"
              placeholder="firstname"
              required
            />
          </div>

          <div>
            <label className="text-black block mb-2">กรุณาระบุนามสกุล</label>
            <input
              type="text"
              name="txt_lastname"
              value={form.txt_lastname}
              onChange={handleChange}
              className="w-full border text-black border-black rounded-md px-4 py-2"
              placeholder="lastname"
              required
            />
          </div>

          <div>
            <label className="text-black block mb-2">username</label>
            <input
              type="text"
              name="txt_username"
              value={form.txt_username}
              onChange={handleChange}
              className="w-full border text-black border-black rounded-md px-4 py-2"
              placeholder="username"
              required
            />
          </div>

          <div>
            <label className="text-black block mb-2">password</label>
            <input
              type="password"
              name="txt_password"
              value={form.txt_password}
              onChange={handleChange}
              className="w-full border text-black border-black rounded-md px-4 py-2"
              placeholder="password"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
