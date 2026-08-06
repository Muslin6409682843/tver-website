"use client";

import { useState } from "react";

import BatteryGuide from "../../components/seller/BatteryGuide";
import BatteryUploader from "../../components/seller/BatteryUploader";
import BatteryForm from "../../components/seller/BatteryForm";
import ResultSummary from "../../components/seller/ResultSummary";
import DerivedParameters from "../../components/seller/DerivedParameters";
import BatteryPriceSection from "../../components/seller/BatteryPriceSection";
import CarbonReductionSection from "../../components/seller/CarbonReductionSection";

export default function SellerPage() {
  const [showResult, setShowResult] = useState(false);

  const [images, setImages] = useState<File[]>([]);

  const [formData, setFormData] = useState<any>(null);

  // =====================================================
  // Future Capacity Percentage
  // =====================================================

  const [futureCapacityPercentage, setFutureCapacityPercentage] = useState(0);

  const handleCalculate = (data: Record<string, string>) => {
    setShowWarning(false);
    setFormData(data);
    setShowResult(true);

    setTimeout(() => {
      document.getElementById("calculation-result")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const [showWarning, setShowWarning] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#FCFFFE] to-[#F5FCFB] py-20 px-6">
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-red-700">
              ⚠️ ไม่สามารถคำนวณผลลัพธ์ได้
            </h2>

            <p className="mt-4 text-gray-700">
              ข้อมูลที่กรอกไม่สอดคล้องกัน ทำให้ค่า Battery Low ต่ำกว่า 0%
            </p>

            <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-gray-700">
              กรุณาตรวจสอบ
              <ul className="mt-2 list-disc pl-5">
                <li>เลขไมล์สะสม</li>
                <li>Full Range</li>
                <li>ความถี่ในการชาร์จ</li>
                <li>Charge Limit</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setShowWarning(false);
                setShowResult(false);
                setFormData(null);
                setFutureCapacityPercentage(0);
              }}
              className="mt-6 w-full rounded-xl bg-[#00AAA0] py-3 font-semibold text-white"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
      <BatteryGuide />

      <BatteryUploader images={images} setImages={setImages} />

      <BatteryForm onCalculate={handleCalculate} />

      {showResult && (
        <div id="calculation-result" className="mt-12">
          <ResultSummary data={formData} images={images} />

          <DerivedParameters
            data={formData}
            onCalculated={setFutureCapacityPercentage}
            onWarning={setShowWarning}
          />

          {!showWarning && (
            <>
              <BatteryPriceSection
                futureCapacityPercentage={futureCapacityPercentage}
              />

              <CarbonReductionSection
                fullRange={Number(formData.fullRange)}
                futureCapacityPercentage={futureCapacityPercentage}
              />
            </>
          )}
        </div>
      )}
    </main>
  );
}
