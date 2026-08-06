"use client";

type Props = {
  fullRange: number;
  futureCapacityPercentage: number;
};

export default function CarbonReductionSection({
  fullRange,
  futureCapacityPercentage,
}: Props) {
  // =====================================================
  // สมมติฐานสำหรับ Second-Life Battery
  // =====================================================

  // ระบบ Solar ใช้งานเฉลี่ยประมาณ 300 วัน/ปี
  const OPERATING_DAYS = 300;

  // สมมติว่าแบตเตอรี่ถูกใช้งานจริงเฉลี่ย 35% ของความจุต่อวัน
  // เนื่องจากปริมาณพลังงานจาก Solar และการใช้ไฟฟ้าในแต่ละวันไม่เท่ากัน
  const UTILIZATION_FACTOR = 0.35;

  // ประมาณความจุแบตเตอรี่จากระยะทาง
  // (รถ EV ทั่วไป ~0.15 kWh ต่อ 1 km)
  const KWH_PER_KM = 0.15;

  // Emission Factor ไฟฟ้า
  // kgCO2e / kWh
  const ELECTRICITY_EMISSION_FACTOR = 0.5562;

  // ค่าการดูดซับ CO2 ของต้นไม้
  // kgCO2 / ต้น / 10 ปี
  const TREE_CO2_ABSORPTION_10_YEARS = 100;

  // =====================================================
  // ตรวจสอบข้อมูล
  // =====================================================

  const range = Number(fullRange) || 0;
  const futureCapacity = Number(futureCapacityPercentage) || 0;

  // ประมาณความจุแบตเตอรี่ (kWh)
  const estimatedBatteryCapacity = range * KWH_PER_KM;

  // ความจุที่ยังใช้งานได้
  const usableBatteryCapacity =
    estimatedBatteryCapacity * (futureCapacity / 100);

  // พลังงานที่ใช้ในระบบกักเก็บพลังงานต่อปี
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
      {/* Header */}
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
        <div className="rounded-2xl border border-[#8ED2C9] bg-[#F8FFFE] p-8">
          <p className="text-lg font-semibold text-gray-900">
  ศักยภาพการลด CO₂
  <br />
  <span className="text-base font-medium text-gray-600">
    (กรณีใช้งานเต็มศักยภาพร่วมกับระบบโซลาร์เซลล์)
  </span>
</p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-5xl font-bold text-[#00AAA0]">
              {Math.round(annualCO2Reduction).toLocaleString()}
            </span>

            <span className="text-lg text-gray-600">kgCO₂e / ปี</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            ประมาณการศักยภาพสูงสุดในการลดการปล่อยก๊าซเรือนกระจก จากการนำแบตเตอรี่ Second-Life ไปใช้งานร่วมกับระบบกักเก็บพลังงาน (Battery Energy Storage System: BESS)
          </p>
        </div>

        {/* Trees */}
        <div className="rounded-2xl border border-[#8ED2C9] bg-[#F8FFFE] p-8">
          <p className="text-lg font-semibold text-gray-900">
            ศักยภาพเทียบเท่าการปลูกต้นไม้
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-5xl font-bold text-[#00AAA0]">
              {Math.round(equivalentTrees).toLocaleString()}
            </span>

            <span className="text-lg text-gray-600">ต้น / 10 ปี</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            คำนวณจากปริมาณการลดการปล่อยก๊าซ CO₂ ตามสมมติฐานการใช้งานเต็มศักยภาพตลอดระยะเวลา 10 ปี
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* Calculation Details */}
      {/* ================================================= */}

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {/* Full Range */}
        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">ความจุแบตเตอรี่ (ประมาณ)</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {estimatedBatteryCapacity.toFixed(1)}
          </p>

          <p className="mt-1 text-gray-500">kWh</p>
        </div>

        {/* Usable Range */}
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
          <p>ความจุแบตเตอรี่ (ประมาณ) = ระยะทางเต็มแบต × {KWH_PER_KM} kWh/km</p>

          <p>
            ความจุที่นำกลับมาใช้ได้ = ความจุแบตเตอรี่ × ความสามารถในการใช้งาน
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
          ผลการคำนวณนี้เป็นการประมาณการเชิงทฤษฎี (Theoretical Estimation) โดยสมมติให้แบตเตอรี่ Second-Life ถูกนำไปใช้งานเพื่อกักเก็บพลังงานจากระบบโซลาร์เซลล์อย่างสม่ำเสมอทุกวันตลอดทั้งปี ภายใต้ประสิทธิภาพของแบตเตอรี่ที่คำนวณได้จากระบบ ดังนั้นผลลัพธ์จึงแสดง ศักยภาพสูงสุดในการลดการปล่อยก๊าซเรือนกระจก ในทางปฏิบัติ การใช้งานจริงมักมีวันที่ผลิตไฟฟ้าไม่เต็มกำลัง วันที่ไม่มีการใช้งาน และข้อจำกัดของระบบ ทำให้ปริมาณ CO₂ ที่ลดได้จริงอาจต่ำกว่าค่าประมาณนี้ ทั้งนี้ควรพิจารณาร่วมกับการออกแบบและการใช้งานระบบโซลาร์เซลล์ของผู้ใช้งานปลายทาง
        </p>
      </div>
    </section>
  );
}
