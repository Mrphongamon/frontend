"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

const API_URL = "https://api.itdev.cmtc.ac.th/users";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);  //กำหนด state เช็ค login

useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsAuth(true);
    fetchUsers();
  }, []);

  // ดึงข้อมูลผู้ใช้ทั้งหมด
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถโหลดข้อมูลผู้ใช้ได้",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชั่นลบข้อมูล (Delete)
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "ยืนยันการลบ?",
      text: `คุณต้องการลบผู้ใช้ "${name}" (ID: ${id}) ใช่หรือไม่?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await Swal.fire({
            icon: "success",
            title: "ลบสำเร็จ!",
            text: "ลบข้อมูลผู้ใช้งานเรียบร้อยแล้ว",
            timer: 1500,
            showConfirmButton: false,
          });
          fetchUsers(); // รีโหลดข้อมูลในตารางใหม่
        } else {
          throw new Error(`Status ${response.status}`);
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          icon: "error",
          title: "ลบไม่สำเร็จ",
          text: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์",
        });
      }
    }
  };

  if (isLoading) {
    if (!isAuth) return null;  //เช้คค่า login
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600 font-medium">กำลังโหลดข้อมูลผู้ใช้...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">จัดการข้อมูลผู้ใช้งาน</h1>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm transition"
          >
            รีเฟรชข้อมูล
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-sm">
                <th className="p-4">ID</th>
                <th className="p-4">ชื่อ</th>
                <th className="p-4">นามสกุล</th>
                <th className="p-4">Username</th>
                <th className="p-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
              {users.length > 0 ? (
                users.map((item) => {
                  const firstName = item.firstname || item.first_name || "";
                  const lastName = item.lastname || item.last_name || "";
                  return (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono">{item.id}</td>
                      <td className="p-4">{firstName || "-"}</td>
                      <td className="p-4">{lastName || "-"}</td>
                      <td className="p-4">{item.username || "-"}</td>
                      <td className="p-4 text-center flex justify-center gap-2">
                        {/* ปุ่มแก้ไข: ส่งไปยัง /users/[id] */}
                        <Link
                          href={`/users/${item.id}`}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition text-xs font-medium"
                        >
                          แก้ไข
                        </Link>
                        {/* ปุ่มลบ */}
                        <button
                          onClick={() => handleDelete(item.id, `${firstName} ${lastName}`)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition text-xs font-medium"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">
                    ไม่พบข้อมูลผู้ใช้งาน
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}