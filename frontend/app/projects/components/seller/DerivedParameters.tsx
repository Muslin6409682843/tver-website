"use client";
import CalculationTable from "./CalculationTable";

type Props = {
  data: any;
};

export default function DerivedParameters({ data }: Props) {
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

    "4–6 ครั้ง/สัปดาห์": 21.7,

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

  // SOC กลาง
  const soc = (high + low) / 2 / 100;

  // fSoc
  const fSoc =
    0.1717 * Math.pow(soc, 3) +
    0.2401 * Math.pow(soc, 2) +
    0.5682 * soc +
    0.5354;

  // DOD
  const dod = (high - low) / 100;

  // fDOD
  const fDod = 0.0001 * Math.pow(dod, 2) + 2e-6 * dod + 1e-7;

  // Temperature
  const temperature = 35;

  // fT
  const fT =
    7e-5 * Math.pow(temperature, 3) -
    0.0029 * Math.pow(temperature, 2) +
    0.0889 * temperature -
    0.4242;

  return (
    <section className="mx-auto mt-10 max-w-7xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900">ค่าคำนวณเบื้องต้น</h2>

      <p className="mt-2 text-gray-600">
        ค่าที่คำนวณจากข้อมูลรถและพฤติกรรมการใช้งาน
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {/* อายุรถ */}
        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">อายุรถ</p>

          <p className="mt-2 text-3xl font-bold text-[#00AAA0]">
            {ageInMonths}
          </p>

          <p className="text-gray-500">เดือน</p>
        </div>

        {/* ความถี่ */}
        <div className="rounded-2xl bg-[#F8FFFE] p-6">
          <p className="text-sm text-gray-500">ความถี่ชาร์จ</p>

          <p className="mt-2 text-3xl font-bold text-[#00AAA0]">
            {frequency.toFixed(2)}
          </p>

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
            {kmPerCharge.toFixed(2)}
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
