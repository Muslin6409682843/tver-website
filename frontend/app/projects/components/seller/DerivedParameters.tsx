"use client";

import { useEffect, useState } from "react";
import CalculationTable from "./CalculationTable";
import { getBatteryTable } from "../../lib/batteryTable";

type Props = {
  data: any;
  onCalculated: (futureCapacityPercentage: number) => void;
  onWarning: (warning: boolean) => void;
};

export default function DerivedParameters({
  data,
  onCalculated,
  onWarning,
}: Props) {
  if (!data) return null;

  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const year = Number(data.year);
  const month = Number(data.month);

  // -------------------------
  // อายุรถ (เดือน)
  // -------------------------

  const ageInMonths = (currentYear - year) * 12 + (currentMonth - month);

  // -------------------------
  // ความถี่ชาร์จ (ครั้ง/เดือน)
  // -------------------------

  const frequencyMap: Record<string, number> = {
    ทุกวัน: 30.44,
    วันเว้นวัน: 15.22,
    "2–3 ครั้ง/สัปดาห์": 10.9,
    "1 ครั้ง/สัปดาห์": 4.3,
    "2–3 ครั้ง/เดือน": 2.5,
    "1 ครั้ง/เดือน": 1,
    "น้อยกว่า 1 ครั้ง/เดือน": 0.5,
  };

  const frequency = frequencyMap[data.chargeFrequency] ?? 0;

  // -------------------------
  // จำนวนครั้งชาร์จทั้งหมด
  // -------------------------

  const totalCharge = ageInMonths * frequency;

  // -------------------------
  // km ต่อการชาร์จ
  // -------------------------

  const mileage = Number(data.mileage);

  const kmPerCharge = totalCharge > 0 ? mileage / totalCharge : 0;

  // -------------------------
  // Battery Low
  // -------------------------

  const high = Number(data.chargeLimit);

  const fullRange = Number(data.fullRange);

  const low = fullRange > 0 ? high - (kmPerCharge / fullRange) * 100 : 0;

  const isInvalidData = low < 0;

  useEffect(() => {
    onWarning(isInvalidData);
  }, [isInvalidData, onWarning]);

  // -------------------------
  // SOC กลาง
  // -------------------------

  const soc = (high + low) / 2 / 100;

  // -------------------------
  // fSoc
  // -------------------------

  const fSoc =
    0.1717 * Math.pow(soc, 3) +
    0.2401 * Math.pow(soc, 2) +
    0.5682 * soc +
    0.5354;

  // -------------------------
  // DOD
  // -------------------------

  const dod = (high - low) / 100;

  // -------------------------
  // fDOD
  // -------------------------

  const fDod = 0.0001 * Math.pow(dod, 2) + 2e-6 * dod + 1e-7;

  // -------------------------
  // Temperature
  // -------------------------

  const temperature = 35;

  // -------------------------
  // fT
  // -------------------------

  const fT =
    7e-5 * Math.pow(temperature, 3) -
    0.0029 * Math.pow(temperature, 2) +
    0.0889 * temperature -
    0.4242;

  // =====================================================
  // คำนวณ SOH SLB ของอายุรถปัจจุบัน
  // =====================================================

  const batteryTable = getBatteryTable(fSoc, fT, fDod, high, low, ageInMonths);

  // =====================================================
  // อายุรถปัจจุบัน
  // =====================================================

  const currentYears = Math.floor(ageInMonths / 12);

  // =====================================================
  // ฟังก์ชันคำนวณ SOH จากอายุเป็นเดือน
  // ใช้สูตรเดียวกับ getBatteryTable
  // =====================================================

  const calculateSOH = (months: number) => {
    const calculationYears = months / 12;

    const N = calculationYears * 365;

    const t = N * 24 * 60 * 60;

    const ft = 4.1375e-10 * t;

    const fCal = ft * fSoc * fT;

    const fCycle = fDod * fSoc * fT * N;

    const fD = fCal + fCycle;

    // SOH NB
    const L = 1 - 0.0575 * Math.exp(fD * -121) - (1 - 0.0575) * Math.exp(-fD);

    // SOH SLB
    const LSLB = 1 - (1 - 0.2) * Math.exp(-fD);

    const sohSlb = (1 - LSLB) * 100;

    const sohNb = (1 - L) * 100;

    return {
      sohSlb,
      sohNb,
    };
  };

  // =====================================================
  // คำนวณพื้นที่ใต้กราฟ
  //
  // NB  : ปี 0 → ปี 10
  // SLB : อายุรถปัจจุบัน → อายุรถปัจจุบัน + 10 ปี
  //
  // ทั้งสองกรณีมีระยะเวลาใช้งานที่นำมาเปรียบเทียบ = 10 ปี
  // =====================================================

  // -----------------------------------------------------
  // 1. พื้นที่ใต้กราฟของแบตเตอรี่ใหม่
  //    เริ่มตั้งแต่ปี 0 → ปี 10
  // -----------------------------------------------------

  const nbRows = batteryTable.filter(
    (row) => row.calculationMonths >= 0 && row.calculationMonths <= 120,
  );

  let areaNb = 0;

  for (let i = 0; i < nbRows.length - 1; i++) {
    const current = nbRows[i];
    const next = nbRows[i + 1];

    const deltaYears =
      (next.calculationMonths - current.calculationMonths) / 12;

    areaNb += ((current.sohNb + next.sohNb) / 2) * deltaYears;
  }

  // -----------------------------------------------------
  // 2. พื้นที่ใต้กราฟของแบตเตอรี่เก่า
  //    เริ่มจากอายุรถปัจจุบัน → อีก 10 ปี
  // -----------------------------------------------------

  const slbStartMonths = ageInMonths;
  const slbEndMonths = ageInMonths + 120;

  const slbRows = batteryTable.filter(
    (row) =>
      row.calculationMonths >= slbStartMonths &&
      row.calculationMonths <= slbEndMonths,
  );

  let areaSlb = 0;

  for (let i = 0; i < slbRows.length - 1; i++) {
    const current = slbRows[i];
    const next = slbRows[i + 1];

    const deltaYears =
      (next.calculationMonths - current.calculationMonths) / 12;

    areaSlb += ((current.sohSlb + next.sohSlb) / 2) * deltaYears;
  }

  // -----------------------------------------------------
  // 3. เปรียบเทียบพื้นที่ใต้กราฟ
  // -----------------------------------------------------

  const futureCapacityPercentage =
    areaNb > 0 ? Math.round((areaSlb / areaNb) * 100) : 0;

  useEffect(() => {
    onCalculated(futureCapacityPercentage);
  }, [futureCapacityPercentage, onCalculated]);

  const currentRow =
    batteryTable.find((row) => row.year === currentYears) ?? batteryTable[0];

  const currentSohSlb = Math.round(currentRow.sohSlb);

  return (
    <section className="mx-auto mt-10 max-w-7xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* ================================================= */}
      {/* ค่าคำนวณเบื้องต้น */}
      {/* ================================================= */}

      <h2 className="text-3xl font-bold text-gray-900">ค่าคำนวณเบื้องต้น</h2>

      <p className="mt-2 text-gray-600">
        ค่าที่คำนวณจากข้อมูลรถและพฤติกรรมการใช้งาน
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {/* อายุรถ */}
        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">อายุแบตเตอรี่</p>

          <p className="mt-2 text-3xl font-bold text-[#00AAA0]">
            {ageInMonths}
          </p>

          <p className="text-gray-500">เดือน</p>
        </div>

        {/* ความถี่ */}
        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">ความถี่ชาร์จ</p>

          <p className="mt-2 text-3xl font-bold text-[#00AAA0]">{frequency.toFixed(0)}</p>

          <p className="text-gray-500">ครั้ง/เดือน</p>
        </div>

        {/* Cycle */}
        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">จำนวนครั้งที่ชาร์จ</p>

          <p className="mt-2 text-3xl font-bold text-[#00AAA0]">
            {totalCharge.toFixed(0)}
          </p>

          <p className="text-gray-500">ครั้ง</p>
        </div>

        {/* km charge */}
        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">กิโลเมตรต่อการชาร์จ</p>

          <p className="mt-2 text-3xl font-bold text-[#00AAA0]">
            {kmPerCharge.toFixed(0)}
          </p>

          <p className="text-gray-500">km / charge</p>
        </div>

        {/* Low */}
        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">Battery Low</p>

          <p className="mt-2 text-3xl font-bold text-[#00AAA0]">
            {Math.round(low)}
          </p>

          <p className="text-gray-500">%</p>
        </div>
      </div>

      {/* ================================================= */}
      {/* ผลการประเมินแบตเตอรี่ปัจจุบัน */}
      {/* ================================================= */}

      <div className="mt-10">
        <h2 className="text-3xl font-bold text-gray-900">
          ผลการประเมินแบตเตอรี่ปัจจุบัน
        </h2>

        <p className="mt-2 text-gray-600">
          ผลการประเมินจากค่า SOH ของแบตเตอรี่ใช้แล้ว
        </p>

        <div className="mt-8 rounded-2xl border border-[#8ED2C9] bg-[#F8FFFE] p-6">
          <p className="text-xl font-semibold leading-relaxed text-gray-900">
            ปัจจุบันแบตเตอรี่ใช้แล้วมีประสิทธิภาพอยู่ที่{" "}
            <span className="text-3xl font-bold text-[#00AAA0]">
              {currentSohSlb}%
            </span>{" "}
            เมื่อเทียบกับแบตเตอรี่ใหม่
          </p>

          <p className="mt-2 text-sm text-gray-500">
            อ้างอิงจากค่า SOH SLB ณ อายุรถปัจจุบัน {currentYears} ปี{" "}
            {ageInMonths % 12} เดือน
          </p>
        </div>
      </div>

      {/* ================================================= */}
      {/* การเก็บประจุในอนาคต 10 ปี */}
      {/* ================================================= */}
      <div className="mt-6 rounded-2xl border border-[#8ED2C9] bg-[#F8FFFE] p-6">
        <p className="text-xl font-semibold leading-relaxed text-gray-900">
          หากนำแบตเตอรี่เก่าลูกนี้มาใช้งานต่ออีก 10 ปี
          ความสามารถในการเก็บประจุโดยรวมจะอยู่ที่ประมาณ{" "}
          <span className="text-3xl font-bold text-[#00AAA0]">
            {futureCapacityPercentage}%
          </span>
          <br />
          <span className="text-xl font-semibold text-gray-900">
            เมื่อเทียบกับแบตเตอรี่ใหม่ที่เริ่มใช้งานวันนี้
          </span>
        </p>

        <p className="mt-2 text-sm text-gray-500">
          เปรียบเทียบพื้นที่ใต้กราฟ SOH ของแบตเตอรี่เก่าในช่วง 10 ปีข้างหน้า
          กับแบตเตอรี่ใหม่ในช่วง 10 ปีแรกของการใช้งาน
        </p>
      </div>

      {/* ================================================= */}
      {/* ตารางคำนวณอายุแบตเตอรี่ */}
      {/* ================================================= */}

      <CalculationTable
        fSoc={fSoc}
        fT={fT}
        fDod={fDod}
        high={high}
        low={low}
        ageInMonths={ageInMonths}
      />
    </section>
  );
}
