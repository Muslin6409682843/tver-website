"use client";

import { Leaf, Cloud, Sparkles } from "lucide-react";

type Props = {
  batteryCapacity: number;
  futureCapacityPercentage: number;
};

export default function CarbonReductionSection({
  batteryCapacity,
  futureCapacityPercentage,
}: Props) {
  // =====================================================
  // สมมติฐานสำหรับ Second-Life Battery
  // =====================================================

  // ระบบ Solar ใช้งานเฉลี่ยประมาณ 300 วัน/ปี
  const OPERATING_DAYS = 300;

  // สมมติว่าแบตเตอรี่ถูกใช้งานจริงเฉลี่ย 35% ของความจุต่อวัน
  const UTILIZATION_FACTOR = 0.35;

  // Emission Factor ไฟฟ้า
  // kgCO2e / kWh
  const ELECTRICITY_EMISSION_FACTOR = 0.5562;

  // ค่าการดูดซับ CO2 ของต้นไม้
  // kgCO2 / ต้น / 10 ปี
  const TREE_CO2_ABSORPTION_10_YEARS = 100;

  // =====================================================
  // ตรวจสอบข้อมูล
  // =====================================================

  const actualBatteryCapacity = Number(batteryCapacity) || 0;

  const futureCapacity = Number(futureCapacityPercentage) || 0;

  // =====================================================
  // ความจุที่ยังสามารถนำกลับมาใช้งานได้
  // =====================================================

  const usableBatteryCapacity = actualBatteryCapacity * (futureCapacity / 100);

  // =====================================================
  // พลังงานที่ใช้ในระบบกักเก็บพลังงานต่อปี
  // =====================================================

  const annualEnergy =
    usableBatteryCapacity * OPERATING_DAYS * UTILIZATION_FACTOR;

  // =====================================================
  // CO2 ที่หลีกเลี่ยงได้ต่อปี
  // =====================================================

  const annualCO2Reduction = annualEnergy * ELECTRICITY_EMISSION_FACTOR;

  // =====================================================
  // CO2 ที่ลดได้ตลอด 10 ปี
  // =====================================================

  const totalCO2Reduction10Years = annualCO2Reduction * 10;

  // =====================================================
  // เทียบเท่าการปลูกต้นไม้
  // =====================================================

  const equivalentTrees =
    totalCO2Reduction10Years / TREE_CO2_ABSORPTION_10_YEARS;

  return (
    <section className="mx-auto mt-10 max-w-7xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <h2 className="text-3xl font-bold text-gray-900">
        ผลประโยชน์ด้านสิ่งแวดล้อม
      </h2>

      <p className="mt-2 text-gray-600">
        ประมาณการการลดการปล่อยก๊าซเรือนกระจกจากการนำแบตเตอรี่
        มาใช้งานต่อในรูปแบบ Second-Life
      </p>

      {/* ================================================= */}
      {/* Main Result */}
      {/* ================================================= */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* CO2 */}

        <div className="relative overflow-hidden rounded-2xl border border-[#8ED2C9] bg-[#F8FFFE] p-8">
          <Cloud
            className="absolute right-5 top-5 text-[#00AAA0]/15"
            size={70}
          />

          <Sparkles
            className="absolute bottom-5 right-8 text-[#00AAA0]/10"
            size={30}
          />

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00AAA0]/10">
            <Cloud className="text-[#00AAA0]" size={28} />
          </div>

          <p className="text-lg font-semibold text-gray-900">
            ศักยภาพการลด CO₂
          </p>

          <p className="mt-1 text-sm text-gray-500">
            (กรณีใช้งานเต็มศักยภาพร่วมกับระบบโซลาร์เซลล์)
          </p>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-5xl font-bold text-[#00AAA0]">
              {Math.round(annualCO2Reduction).toLocaleString()}
            </span>

            <span className="text-lg text-gray-600">kgCO₂e / ปี</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            ประมาณการจากความจุแบตเตอรี่ที่สามารถนำกลับมาใช้งาน
            ในระบบกักเก็บพลังงาน (Second-Life Battery Energy Storage)
          </p>
        </div>

        {/* Trees */}

        <div className="relative overflow-hidden rounded-2xl border border-[#8ED2C9] bg-[#F8FFFE] p-8">
          <Leaf
            className="absolute right-5 top-5 text-green-500/15"
            size={70}
          />

          <Leaf
            className="absolute bottom-5 right-8 rotate-12 text-green-600/10"
            size={34}
          />

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
            <Leaf className="text-green-600" size={28} />
          </div>

          <p className="text-lg font-semibold text-gray-900">
            เทียบเท่าการปลูกต้นไม้
          </p>

          <p className="mt-1 text-sm text-gray-500">
            (กรณีใช้งานเต็มศักยภาพร่วมกับระบบโซลาร์เซลล์)
          </p>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-5xl font-bold text-green-600">
              {Math.round(equivalentTrees).toLocaleString()}
            </span>

            <span className="text-lg text-gray-600">ต้น / 10 ปี</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            เทียบจากปริมาณ CO₂ ที่ลดได้สะสมตลอดระยะเวลา 10 ปี
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* Calculation Details */}
      {/* ================================================= */}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {/* Battery Capacity */}

        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">ความจุแบตเตอรี่</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {actualBatteryCapacity.toFixed(1)}
          </p>

          <p className="mt-1 text-gray-500">kWh</p>
        </div>

        {/* Usable Capacity */}

        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">ความจุที่นำกลับมาใช้ได้</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {usableBatteryCapacity.toFixed(1)}
          </p>

          <p className="mt-1 text-gray-500">kWh</p>
        </div>

        {/* Future Capacity */}

        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">
            ความสามารถในการใช้งานในอีก 10 ปี
          </p>

          <p className="mt-2 text-3xl font-bold text-[#00AAA0]">
            {futureCapacity}%
          </p>

          <p className="mt-1 text-gray-500">เมื่อเทียบกับแบตเตอรี่ใหม่</p>
        </div>
      </div>

      {/* ================================================= */}
      {/* Calculation */}
      {/* ================================================= */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <p className="text-lg font-semibold text-gray-900">หลักการคำนวณ</p>

        <div className="mt-4 space-y-2 text-sm leading-relaxed text-gray-500">
          <p>
            ความจุที่นำกลับมาใช้ได้ = ความจุแบตเตอรี่จริง ×
            ความสามารถในการใช้งาน
          </p>

          <p>
            พลังงานที่นำกลับมาใช้ต่อปี = ความจุที่นำกลับมาใช้ได้ ×{" "}
            {OPERATING_DAYS} วัน/ปี × {(UTILIZATION_FACTOR * 100).toFixed(0)}%
          </p>

          <p>
            CO₂ ที่ลดได้ต่อปี = พลังงาน × {ELECTRICITY_EMISSION_FACTOR}{" "}
            kgCO₂e/kWh
          </p>

          <p>
            ต้นไม้เทียบเท่า = CO₂ ที่ลดได้ตลอด 10 ปี ÷{" "}
            {TREE_CO2_ABSORPTION_10_YEARS}
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* Note */}
      {/* ================================================= */}

      <div className="mt-6 rounded-2xl bg-gray-50 p-5">
        <p className="text-sm leading-relaxed text-gray-500">
          <span className="font-semibold text-gray-700">หมายเหตุ:</span>{" "}
          ผลการคำนวณนี้เป็นการประมาณการเชิงทฤษฎี (Theoretical Estimation)
          โดยสมมติให้แบตเตอรี่ Second-Life
          ถูกนำไปใช้งานเพื่อกักเก็บพลังงานจากระบบโซลาร์เซลล์
          อย่างสม่ำเสมอทุกวันตลอดทั้งปี
          ภายใต้ประสิทธิภาพของแบตเตอรี่ที่คำนวณได้จากระบบ
          ดังนั้นผลลัพธ์จึงแสดงศักยภาพสูงสุดในการลดการปล่อยก๊าซเรือนกระจก
          ในทางปฏิบัติ การใช้งานจริงมักมีวันที่ผลิตไฟฟ้าไม่เต็มกำลัง
          วันที่ไม่มีการใช้งาน และข้อจำกัดของระบบ ทำให้ปริมาณ CO₂
          ที่ลดได้จริงอาจต่ำกว่าค่าประมาณนี้
          ทั้งนี้ควรพิจารณาร่วมกับการออกแบบและการใช้งานระบบโซลาร์เซลล์
          ของผู้ใช้งานปลายทาง
        </p>
      </div>
    </section>
  );
}
