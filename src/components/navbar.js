import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-slate-200 border-b border-slate-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - เพิ่มเอฟเฟกต์ให้ขยายตัวนิดๆ (scale-105) เวลาเอาเมาส์ชี้ */}
          <Link 
            href="/" 
            className="text-2xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
          >
            black haerd
          </Link>

          {/* Menu - เพิ่ม transform hover:-translate-y-1 เพื่อให้ลอยขึ้น */}
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

          {/* CTA Button - เพิ่มการลอยขึ้น, ขยายขนาดนิดหน่อย, และเพิ่มแสงเงาให้สว่างขึ้น */}
          <div className="flex items-center">
            <Link
              href="/register"
              className="ml-4 px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-blue-500/50"
            >
              สมัครสมาชิก
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
