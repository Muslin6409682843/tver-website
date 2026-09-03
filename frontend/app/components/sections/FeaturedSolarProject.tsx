"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sun, Calculator, Wrench, Handshake } from "lucide-react";

export default function FeaturedSolarProject() {
  return (
    <section className="relative overflow-hidden bg-[#241006] py-28">
      {/* Background Glow */}
      <div className="absolute left-[-150px] top-0 h-[500px] w-[500px] rounded-full bg-[#FF8C00]/15 blur-[150px]" />

      <div className="absolute right-[-200px] bottom-[-150px] h-[550px] w-[550px] rounded-full bg-[#FFB347]/10 blur-[170px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#ffffff 1px,transparent 1px),
            linear-gradient(to bottom,#ffffff 1px,transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-20 px-6 lg:flex-row">
        {/* ================= LEFT ================= */}
        <div className="flex-1">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFB347]/30 bg-[#FFB347]/10 px-5 py-2 text-sm font-semibold tracking-wide text-[#FFD08A]">
            Solar Energy
          </div>

          {/* Heading */}
          <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-5xl">
            บริการ
            <span className="block bg-gradient-to-r from-[#FFB347] to-[#FF7A5A] bg-clip-text text-transparent">
              Solar Cell
            </span>
          </h2>

          {/* Description */}
          <p className="mt-8 max-w-xl text-lg leading-8 text-orange-100/70">
            คำนวณขนาดระบบ Solar Cell ที่เหมาะสมกับการใช้งาน
            พร้อมประเมินจำนวนแผงและกำลังการผลิตไฟฟ้า
            เพื่อช่วยวางแผนการติดตั้งระบบพลังงานแสงอาทิตย์
            ให้เหมาะสมกับความต้องการและการใช้พลังงาน
          </p>

          {/* CTA */}
          <Link
            href="/projects/solar-cell"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#FF8C00] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#FF9D1A]"
          >
            ดูรายละเอียดบริการ
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-[520px]">
            {/* Solar Image */}
            <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/5 shadow-xl">
              <div className="relative aspect-[1.7/1]">
                <Image
                  src="/images/solar-roof.png"
                  alt="Solar Cell Installation"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />

                {/* Image Badge */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#FF8C00]/90 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                  Solar Energy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
