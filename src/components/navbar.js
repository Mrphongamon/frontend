"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [token, setToken] = useState(null); // กำหนด state สำหรับเก็บ token

  useEffect(() => {
    // ดึง token จาก localStorage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // สร้างฟังก์ชัน handleLogout
  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token
    setToken(null); // อัปเดต state
    window.location.href = "/";
  };

  return (
    <nav className="bg-slate-900 text-slate-200 border-b border-slate-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
          >
            black haerd
          </Link>

          {/* Main Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-1"
            >
              หน้าแรก
            </Link>

            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-1"
            >
              เกี่ยวกับ
            </Link>

            <Link
              href="/service"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-1"
            >
              บริการของเรา
            </Link>

            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-1"
            >
              ติดต่อ
            </Link>
          </div>

          {/* Auth Menu (สลับตาม Token) */}
          <div className="flex items-center gap-3">
            {token ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-500 shadow-lg shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-red-500/50"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-blue-500/50"
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}