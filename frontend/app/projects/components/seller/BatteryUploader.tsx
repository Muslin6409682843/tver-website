"use client";

import { useRef } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";

type BatteryUploaderProps = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function BatteryUploader({
  images,
  setImages,
}: BatteryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const selected = Array.from(files).filter((file) =>
      ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
    );

    setImages((prev) => [...prev, ...selected].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="mx-auto mt-10 max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          อัปโหลดรูปแบตเตอรี่
        </h2>

        <p className="mt-3 text-gray-600">
          โปรดอัปโหลดรูปแบตเตอรี่ที่มองเห็นสเปกชัดเจน
          <br />
          รองรับไฟล์ JPG, JPEG และ PNG (สูงสุด 5 รูป)
        </p>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="mt-10 cursor-pointer rounded-2xl border-2 border-dashed border-[#00AAA0]/40 bg-[#F8FFFE] p-12 text-center transition hover:border-[#00AAA0]"
      >
        <Upload className="mx-auto h-12 w-12 text-[#00AAA0]" />

        <h3 className="mt-5 text-xl font-semibold text-gray-900">
          ลากไฟล์มาวางที่นี่
        </h3>

        <p className="mt-2 text-gray-500">
          หรือคลิกเพื่อเลือกรูปจากคอมพิวเตอร์
        </p>

        <button
          type="button"
          className="mt-6 rounded-full bg-[#00AAA0] px-6 py-3 text-white transition hover:bg-[#00938b]"
        >
          เลือกรูป
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        {images.length} / 5 รูป
      </div>

      {images.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt={`Battery ${index + 1}`}
                width={300}
                height={300}
                className="aspect-square w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full bg-white p-2 shadow transition hover:bg-red-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="absolute bottom-0 w-full bg-black/60 px-2 py-1 text-center text-xs text-white">
                {image.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="mt-10 flex flex-col items-center text-gray-400">
          <ImageIcon className="h-12 w-12" />
          <p className="mt-3">ยังไม่มีรูปที่อัปโหลด</p>
        </div>
      )}
    </section>
  );
}
