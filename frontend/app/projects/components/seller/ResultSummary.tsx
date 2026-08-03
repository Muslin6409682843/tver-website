"use client";

import Image from "next/image";

type Props = {
  data: any;
  images: File[];
};

export default function ResultSummary({
  data,
  images,
}: Props) {
  if (!data) return null;

  return (
    <section className="mx-auto mb-10 max-w-7xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900">
        สรุปข้อมูล
      </h2>

      <p className="mt-2 text-gray-600">
        ข้อมูลรถและแบตเตอรี่ที่ใช้ในการประเมิน
      </p>

      {/* ข้อมูล */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div>
          <strong>ยี่ห้อรถ</strong>
          <p className="mt-1">{data.brand}</p>
        </div>

        <div>
          <strong>รุ่นรถ</strong>
          <p className="mt-1">{data.model}</p>
        </div>

        <div>
          <strong>ปีที่ออกรถ</strong>
          <p className="mt-1">{data.year}</p>
        </div>

        <div>
          <strong>เดือน</strong>
          <p className="mt-1">{data.month}</p>
        </div>

        <div>
          <strong>เลขไมล์</strong>
          <p className="mt-1">{data.mileage} km</p>
        </div>

        <div>
          <strong>ระยะทางเต็มแบต (Full Range)</strong>
          <p className="mt-1">{data.fullRange} km</p>
        </div>

        <div>
          <strong>ความถี่การชาร์จ</strong>
          <p className="mt-1">{data.chargeFrequency}</p>
        </div>

        <div>
          <strong>หยุดชาร์จที่</strong>
          <p className="mt-1">{data.chargeLimit}%</p>
        </div>

      </div>

      {/* รูปภาพ */}
      {images.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">

          {images.map((image, index) => (
            <Image
              key={index}
              src={URL.createObjectURL(image)}
              alt={`รูปแบตเตอรี่ ${index + 1}`}
              width={250}
              height={250}
              className="aspect-square rounded-xl object-cover"
            />
          ))}

        </div>
      )}

    </section>
  );
}