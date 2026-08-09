import Image from "next/image";

export default function BatteryGuide() {
  return (
    <section className="mx-auto mt-10 max-w-7xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Heading */}
      <div className="text-center">
        <span className="inline-flex rounded-full bg-[#E8FAF8] px-4 py-1 text-sm font-medium text-[#00AAA0]">
          ขั้นตอนที่ 1
        </span>

        <h1 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl">
          ตรวจสอบข้อมูลแบตเตอรี่
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          โปรดตรวจสอบแบตเตอรี่ของคุณและกรอกข้อมูลให้แม่นยำที่สุด
          เพื่อให้ระบบสามารถประเมินราคาซื้อขายได้ใกล้เคียงความเป็นจริง
        </p>
      </div>

      {/* Example Image */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
        <Image
          src="/images/battery-guide.png"
          alt="Battery Specification Guide"
          width={1400}
          height={800}
          className="w-full object-cover"
        />
      </div>

      {/* Tips */}
      <div className="mt-10 rounded-2xl bg-[#F8FFFE] p-6">
        <h2 className="font-semibold text-gray-900">
          แนวทางการตรวจสอบข้อมูล
        </h2>

        <ul className="mt-4 space-y-3 text-gray-600">
          <li>• ตรวจสอบสติกเกอร์หรือป้ายข้อมูลบนแบตเตอรี่</li>
          <li>• ตรวจสอบรุ่น (Model) และผู้ผลิต (Manufacturer)</li>
          <li>• ตรวจสอบแรงดันไฟฟ้า (Voltage)</li>
          <li>• ตรวจสอบความจุ (Capacity)</li>
          <li>• หากข้อมูลไม่ชัดเจน สามารถอัปโหลดรูปเพื่อเปรียบเทียบภายหลังได้</li>
        </ul>
      </div>
    </section>
  );
}