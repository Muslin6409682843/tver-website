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
    <section className="mx-auto mb-10 max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold">
        สรุปข้อมูล
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div>
          <strong>ยี่ห้อรถ</strong>

          <p>{data.brand}</p>
        </div>

        <div>
          <strong>รุ่นรถ</strong>

          <p>{data.model}</p>
        </div>

        <div>
          <strong>ปีที่ออกรถ</strong>

          <p>{data.year}</p>
        </div>

        <div>
          <strong>เดือน</strong>

          <p>{data.month}</p>
        </div>

        <div>
          <strong>เลขไมล์</strong>

          <p>{data.mileage} km</p>
        </div>

        <div>
  <strong>ระยะทางเต็มแบต (Full Range)</strong>

  <p>{data.fullRange} km</p>
</div>

        <div>
          <strong>ความถี่การชาร์จ</strong>

          <p>{data.chargeFrequency}</p>
        </div>

        <div>
          <strong>หยุดชาร์จที่</strong>

          <p>{data.chargeLimit}%</p>
        </div>

      </div>

      {images.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">

          {images.map((image, index) => (
            <Image
              key={index}
              src={URL.createObjectURL(image)}
              alt=""
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