"use client";

type BatteryFormProps = {
  onCalculate: (data: Record<string, string>) => void;
};

export default function BatteryForm({ onCalculate }: BatteryFormProps) {
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 2010 + 1 },
    (_, i) => currentYear - i,
  );

  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const brands = [
    "BYD",
    "Tesla",
    "MG",
    "NETA",
    "GWM",
    "AION",
    "Deepal",
    "ORA",
    "Volvo",
    "BMW",
    "Mercedes-Benz",
    "Hyundai",
    "Kia",
    "Nissan",
    "Audi",
    "Porsche",
    "อื่น ๆ",
  ];

  const chargeOptions = [
    { value: "ทุกวัน", label: "ทุกวัน" },
    { value: "วันเว้นวัน", label: "วันเว้นวัน" },
    { value: "2–3 ครั้ง/สัปดาห์", label: "2–3 ครั้ง/สัปดาห์" },
    { value: "1 ครั้ง/สัปดาห์", label: "1 ครั้ง/สัปดาห์" },
    { value: "2–3 ครั้ง/เดือน", label: "2–3 ครั้ง/เดือน" },
    { value: "1 ครั้ง/เดือน", label: "1 ครั้ง/เดือน" },
  ];

  const chargeLimitOptions = [
    { value: "100", label: "100%" },
    { value: "95", label: "95%" },
    { value: "90", label: "90%" },
    { value: "85", label: "85%" },
    { value: "80", label: "80%" },
    { value: "75", label: "75%" },
    { value: "70", label: "70%" },
    { value: "65", label: "65%" },
    { value: "60", label: "60%" },
    { value: "55", label: "55%" },
    { value: "50", label: "50%" },
  ];

  return (
    <section className="mx-auto mt-10 max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900">กรอกข้อมูลรถยนต์</h2>

      <p className="mt-3 text-gray-600">
        กรุณากรอกข้อมูลให้ครบถ้วน (<span className="text-red-500">*</span>{" "}
        บังคับกรอก)
      </p>

      <form
        className="mt-8"
        onSubmit={(e) => {
          e.preventDefault();

          const form = new FormData(e.currentTarget);

          const data = Object.fromEntries(form.entries()) as Record<
            string,
            string
          >;

          onCalculate(data);
        }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Brand */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              ยี่ห้อรถ <span className="text-red-500">*</span>
            </label>

            <select
              required
              defaultValue=""
              name="brand"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#00AAA0] focus:ring-2 focus:ring-[#00AAA0]/20"
            >
              <option value="" disabled>
                เลือกยี่ห้อรถ
              </option>

              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          {/* Model */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              รุ่นรถ <span className="text-red-500">*</span>
            </label>

            <input
              required
              type="text"
              name="model"
              placeholder="เช่น Atto 3"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#00AAA0] focus:ring-2 focus:ring-[#00AAA0]/20"
            />
          </div>
          {/* Year */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              ปีที่ออกรถ (ค.ศ.) <span className="text-red-500">*</span>
            </label>

            <select
              required
              defaultValue=""
              name="year"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#00AAA0] focus:ring-2 focus:ring-[#00AAA0]/20"
            >
              <option value="" disabled>
                เลือกปี
              </option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {/* Month */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              เดือนที่ออกรถ <span className="text-red-500">*</span>
            </label>

            <select
              required
              defaultValue=""
              name="month"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#00AAA0] focus:ring-2 focus:ring-[#00AAA0]/20"
            >
              <option value="" disabled>
                เลือกเดือน
              </option>

              {months.map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          {/* Charge Frequency */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              ปกติคุณชาร์จแบตเตอรี่บ่อยแค่ไหน{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              required
              defaultValue=""
              name="chargeFrequency"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#00AAA0] focus:ring-2 focus:ring-[#00AAA0]/20"
            >
              <option value="" disabled>
                เลือกความถี่ในการชาร์จ
              </option>

              {chargeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Charge Limit */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              ปกติคุณชาร์จแบตเตอรี่ถึงระดับกี่% ก่อนหยุดชาร์จ{" "}
              <span className="text-red-500">*</span>
            </label>

            <select
              required
              defaultValue=""
              name="chargeLimit"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#00AAA0] focus:ring-2 focus:ring-[#00AAA0]/20"
            >
              <option value="" disabled>
                เลือกระดับการชาร์จ
              </option>

              {chargeLimitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Mileage */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              เลขไมล์สะสมของรถ (กม.) <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              name="mileage"
              required
              min="0"
              placeholder="เช่น 65,000"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#00AAA0] focus:ring-2 focus:ring-[#00AAA0]/20"
            />
          </div>
          {/* Full Range */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              ระยะทางที่รถวิ่งได้เมื่อแบตเตอรี่เต็ม 100% (km)
              <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              name="fullRange"
              required
              min="0"
              placeholder="เช่น 400"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#00AAA0] focus:ring-2 focus:ring-[#00AAA0]/20"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="rounded-2xl bg-[#00AAA0] px-12 py-4 text-lg font-semibold text-white transition hover:bg-[#00958c] hover:shadow-lg"
          >
            คำนวณประสิทธิภาพแบตเตอรี่
          </button>
        </div>
      </form>
    </section>
  );
}
