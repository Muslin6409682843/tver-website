"use client";

import Link from "next/link";
import { Battery, ShoppingCart, Recycle } from "lucide-react";

export default function SecondLifeBatteryPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-5xl text-center">
        {/* Logo */}
        <div className="mx-auto w-20 h-20 rounded-full bg-[#E8FAF8] flex items-center justify-center mb-8">
          <Battery className="w-10 h-10 text-[#00AAA0]" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          ยินดีต้อนรับ!
        </h1>

        <p className="mt-6 text-xl text-gray-600 leading-relaxed">
          โปรแกรมคำนวณ
          <br />
          เพื่อการซื้อขายแบตเตอรี่มือสอง
        </p>

        <h2 className="mt-14 text-2xl font-semibold text-gray-900">
          คุณใช้งานในฐานะใด
        </h2>

        {/* Cards */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Seller */}
          <Link
            href="/projects/second-life-battery/seller"
            className="group order-1 rounded-3xl border border-[#00AAA0]/20 bg-[#F8FFFE] p-10
    hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <Recycle className="mx-auto h-14 w-14 text-[#00AAA0]" />

            <h3 className="mt-6 text-2xl font-bold text-gray-900">ผู้ขาย</h3>

            <p className="mt-3 text-gray-600">ประเมินราคาขายแบตเตอรี่มือสอง</p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#00AAA0] px-5 py-2 text-sm font-medium text-white transition group-hover:scale-105">
              เริ่มต้น
            </div>
          </Link>

          {/* Buyer */}
          <button
            className="group order-2 rounded-3xl border border-gray-200 bg-white p-10
    hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <ShoppingCart className="mx-auto h-14 w-14 text-gray-500 group-hover:text-[#00AAA0]" />

            <h3 className="mt-6 text-2xl font-bold">ผู้ซื้อ</h3>

            <p className="mt-3 text-gray-500">ค้นหาและประเมินราคาแบตเตอรี่</p>

            <span className="mt-8 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-500">
              Coming Soon
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
