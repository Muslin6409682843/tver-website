"use client";

import { useState } from "react";
import { getBatteryTable } from "../../lib/batteryTable";

type Props = {
  fSoc: number;
  fT: number;
  fDod: number;
  high: number;
  low: number;
  ageInMonths: number;
};

export default function CalculationTable({
  fSoc,
  fT,
  fDod,
  high,
  low,
  ageInMonths,
}: Props) {
  const [showTable, setShowTable] = useState(false);

  const batteryTable = getBatteryTable(fSoc, fT, fDod, high, low, ageInMonths);

  return (
    <section className="mx-auto mt-10 max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            ตารางคำนวณอายุแบตเตอรี่
          </h2>

          <p className="mt-2 text-gray-600">
            ตารางแสดงอายุรถปัจจุบันและการคาดการณ์อีก 10 ปี
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowTable((prev) => !prev)}
          className="shrink-0 rounded-xl bg-[#00AAA0] px-6 py-3 font-semibold text-white transition hover:bg-[#008f87]"
        >
          {showTable ? "ซ่อนตาราง" : "แสดงตาราง"}
        </button>
      </div>

      {/* Table */}
      {showTable && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead className="bg-[#F8FFFE]">
              <tr>
                <th className="w-[160px] min-w-[160px] whitespace-nowrap border-b px-6 py-4 text-left">
  Year
</th>

                <th className="border-b px-6 py-4 text-left">N</th>

                <th className="border-b px-6 py-4 text-left">t</th>

                <th className="border-b px-6 py-4 text-left">f_t</th>

                <th className="border-b px-6 py-4 text-left">f_cal</th>

                <th className="border-b px-6 py-4 text-left">f_cycle</th>

                <th className="border-b px-6 py-4 text-left">f_d</th>

                <th className="border-b px-6 py-4 text-left">
                  L{high}-{Math.round(low)}
                </th>

                <th className="border-b px-6 py-4 text-left">L_SLB</th>

                <th className="border-b px-6 py-4 text-left">
                  Degrade SLB@{high}-{Math.round(low)}%
                </th>

                <th className="border-b px-6 py-4 text-left">
                  Degrade NB@{high}-{Math.round(low)}%
                </th>

                <th className="border-b px-6 py-4 text-left">
                  SOH SLB@{high}-{Math.round(low)}%
                </th>

                <th className="border-b px-6 py-4 text-left">
                  SOH NB@{high}-{Math.round(low)}%
                </th>
              </tr>
            </thead>

            <tbody>
              {batteryTable.map((row) => (
                <tr key={row.year} className="hover:bg-[#F8FFFE]">
                  <td className="w-[160px] min-w-[160px] whitespace-nowrap border-b px-6 py-4 font-semibold">
  {row.year} ปี {row.month} เดือน
</td>

                  <td className="border-b px-6 py-4">
                    {row.N.toLocaleString()}
                  </td>

                  <td className="border-b px-6 py-4">
                    {row.t.toLocaleString()}
                  </td>

                  <td className="border-b px-6 py-4">{row.ft.toFixed(5)}</td>

                  <td className="border-b px-6 py-4 font-semibold text-[#00AAA0]">
                    {row.fCal.toFixed(4)}
                  </td>

                  <td className="border-b px-6 py-4 font-semibold text-[#00AAA0]">
                    {row.fCycle.toFixed(5)}
                  </td>

                  <td className="border-b px-6 py-4 font-semibold text-[#00AAA0]">
                    {row.fD.toFixed(5)}
                  </td>

                  <td className="border-b px-6 py-4 font-semibold text-[#00AAA0]">
                    {row.L.toFixed(5)}
                  </td>

                  <td className="border-b px-6 py-4 font-semibold text-[#00AAA0]">
                    {row.LSLB.toFixed(5)}
                  </td>

                  <td className="border-b px-6 py-4 font-semibold text-[#00AAA0]">
                    {row.degradeSlb !== null
                      ? `${Math.round(row.degradeSlb)}%`
                      : "-"}
                  </td>

                  <td className="border-b px-6 py-4 font-semibold text-[#00AAA0]">
                    {row.degradeNb !== null
                      ? `${row.degradeNb.toFixed(2)}%`
                      : "-"}
                  </td>

                  <td className="border-b px-6 py-4 font-semibold text-[#00AAA0]">
                    {Math.round(row.sohSlb)}%
                  </td>

                  <td className="border-b px-6 py-4 font-semibold text-[#00AAA0]">
                    {Math.round(row.sohNb)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
