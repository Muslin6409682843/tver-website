"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedBatteryProject() {
  return (
    <section className="relative overflow-hidden bg-[#02191C] py-28">

      {/* Background Glow */}
      <div className="absolute left-[-150px] top-0 h-[500px] w-[500px] rounded-full bg-[#00AAA0]/20 blur-[150px]" />
      <div className="absolute right-[-200px] bottom-[-150px] h-[550px] w-[550px] rounded-full bg-[#8ED2C9]/10 blur-[170px]" />

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

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-20 px-6 lg:flex-row">

        {/* Left */}
        <div className="flex-1">

          <div className="inline-flex rounded-full border border-[#00AAA0]/30 bg-[#00AAA0]/10 px-5 py-2 text-sm font-semibold tracking-wide text-[#8ED2C9]">
            Featured Project
          </div>

          <h2 className="mt-8 text-4xl font-bold leading-tight text-white md:text-5xl">
            โครงการ
            <span className="block text-[#00AAA0]">
              แบตเตอรี่มือสอง
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
            ส่งเสริมการนำแบตเตอรี่รถยนต์ไฟฟ้าที่หมดอายุการใช้งานกลับมาใช้ประโยชน์
            ในระบบกักเก็บพลังงาน (Second Life Battery) เพื่อสร้างคุณค่าจากทรัพยากร
            ลดของเสีย และสนับสนุนการลดการปล่อยก๊าซเรือนกระจกอย่างยั่งยืน
          </p>

          <Link
            href="/projects/second-life-battery"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#00AAA0] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#00C5BA]"
          >
            ดูรายละเอียดโครงการ

            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Right */}
        <div className="flex flex-1 justify-center">

          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-0 rounded-[36px] bg-[#00AAA0]/20 blur-3xl" />

            {/* Glass Card */}
            <div className="relative rounded-[36px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,.45)]">

              {/* Circle */}
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00AAA0]/15 blur-[70px]" />

              <Image
                src="/images/ev-battery.png"
                alt="Second Life Battery"
                width={520}
                height={520}
                priority
                className="relative z-10 select-none"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}