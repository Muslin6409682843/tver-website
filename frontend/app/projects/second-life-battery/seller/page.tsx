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
    setFormData(data);
    setShowResult(true);

    setTimeout(() => {
      document.getElementById("calculation-result")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-[#FCFFFE] to-[#F5FCFB] py-20 px-6">
      <BatteryGuide />

      <BatteryUploader images={images} setImages={setImages} />

      <BatteryForm onCalculate={handleCalculate} />

      {showResult && (
        <div id="calculation-result" className="mt-12">
          <ResultSummary data={formData} images={images} />

          <DerivedParameters
            data={formData}
            onCalculated={setFutureCapacityPercentage}
          />

          <BatteryPriceSection
            futureCapacityPercentage={futureCapacityPercentage}
          />

          <CarbonReductionSection
  fullRange={Number(formData.fullRange)}
  futureCapacityPercentage={futureCapacityPercentage}
/>
        </div>
      )}
    </main>
  );
}
