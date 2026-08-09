"use client";

type Props = {
  futureCapacityPercentage: number;
  newBatteryPrice: number;
};

export default function BatteryPriceSection({
  futureCapacityPercentage,
  newBatteryPrice,
}: Props) {
  const batteryValue =
    newBatteryPrice * (futureCapacityPercentage / 100);

  const discountFactor = 0.2;

  const discountAmount =
    batteryValue * discountFactor;

  const recommendedPrice =
    batteryValue - discountAmount;

  return (
    <section className="mx-auto mt-10 max-w-7xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <h2 className="text-3xl font-bold text-gray-900">
        ราคาประเมินแบตเตอรี่
      </h2>

      <p className="mt-2 text-gray-600">
        ประเมินราคาจากราคาแบตเตอรี่ใหม่ในตลาด
        และประสิทธิภาพของแบตเตอรี่ใช้แล้ว
      </p>

      <div className="mt-8">
        {/* ================================================= */}
        {/* ราคาแบตเตอรี่ใหม่ */}
        {/* ================================================= */}

        <div className="flex flex-col gap-2 border-b border-gray-200 pb-5 md:flex-row md:items-center md:justify-between">
          <p className="text-lg font-semibold text-gray-900">
            ราคาแบตเตอรี่ใหม่ในตลาด
          </p>

          <p className="text-2xl font-bold text-gray-900">
            {newBatteryPrice.toLocaleString()} บาท
          </p>
        </div>

        {/* ================================================= */}
        {/* มูลค่าแบตเตอรี่เก่า */}
        {/* ================================================= */}

        <div className="mt-5 flex flex-col gap-2 border-b border-gray-200 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              มูลค่าแบตเตอรี่เก่า
            </p>

            <p className="mt-1 text-sm text-gray-500">
              แบตเตอรี่เก่าตลอด 10 ปีใช้งานข้างหน้า คิดเป็น{" "}
              {futureCapacityPercentage}% ของแบตเตอรี่ใหม่
            </p>
          </div>

          <p className="text-2xl font-bold text-[#00AAA0]">
            {batteryValue.toLocaleString()} บาท
          </p>
        </div>

        {/* ================================================= */}
        {/* Discount Factor */}
        {/* ================================================= */}

        <div className="mt-5 flex flex-col gap-2 border-b border-gray-200 pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Discount Factor
            </p>

            <p className="mt-1 text-sm text-gray-500">
              ส่วนลด {discountFactor * 100}%
            </p>
          </div>

          <p className="text-2xl font-bold text-[#FF7A5A]">
            - {discountAmount.toLocaleString()} บาท
          </p>
        </div>

        {/* ================================================= */}
        {/* ราคาขายจริง */}
        {/* ================================================= */}

        <div className="mt-8 rounded-2xl border-2 border-[#00AAA0] bg-white p-6">
          <p className="text-lg font-semibold text-gray-900">
            ราคาขายจริงที่แนะนำ
          </p>

          <p className="mt-2 text-4xl font-bold text-[#00AAA0]">
            {recommendedPrice.toLocaleString()} บาท
          </p>

          <p className="mt-2 text-sm text-gray-500">
            ราคาประเมินหลังหัก Discount Factor{" "}
            {discountFactor * 100}%
          </p>
        </div>
      </div>
    </section>
  );
}