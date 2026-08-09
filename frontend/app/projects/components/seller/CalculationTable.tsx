"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

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
  const [showChart, setShowChart] = useState(false);

  const batteryTable = getBatteryTable(fSoc, fT, fDod, high, low, ageInMonths);

  // -------------------------
  // ข้อมูลสำหรับกราฟ
  // -------------------------

  const chartData = batteryTable.map((row) => ({
    year: row.year,
    sohSlb: Math.round(row.sohSlb),
    sohNb: Math.round(row.sohNb),
  }));

  return (
    <section className="mt-10">
      {/* ================================================= */}
      {/* ตารางรายละเอียดการคำนวณ */}
      {/* ================================================= */}

      <div className="rounded-3xl border border-[#8ED2C9] bg-[#F8FFFE] p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold leading-relaxed text-gray-900">
              ตารางรายละเอียดการคำนวณ
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              รายละเอียดค่าการเสื่อมสภาพและประสิทธิภาพแบตเตอรี่ตามอายุรถ
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

        {/* ================================================= */}
        {/* Table */}
        {/* ================================================= */}

        {showTable && (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
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
      </div>

      {/* ================================================= */}
      {/* กราฟประสิทธิภาพแบตเตอรี่ */}
      {/* ================================================= */}

      <div className="mt-6 rounded-3xl border border-[#8ED2C9] bg-[#F8FFFE] p-8">
        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold leading-relaxed text-gray-900">
              กราฟประสิทธิภาพแบตเตอรี่
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              เปรียบเทียบ SOH ของแบตเตอรี่ใช้แล้วกับแบตเตอรี่ใหม่ตามอายุรถ
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowChart((prev) => !prev)}
            className="shrink-0 rounded-xl bg-[#00AAA0] px-6 py-3 font-semibold text-white transition hover:bg-[#008f87]"
          >
            {showChart ? "ซ่อนกราฟ" : "แสดงกราฟ"}
          </button>
        </div>

        {/* ================================================= */}
        {/* Chart */}
        {/* ================================================= */}

        {showChart && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-4">
              <p className="font-semibold text-gray-900">
                SOH ตามอายุแบตเตอรี่
              </p>

              <p className="mt-1 text-sm text-gray-500">
                เปรียบเทียบ SOH ของแบตเตอรี่ใช้แล้วและแบตเตอรี่ใหม่ในช่วง 10 ปี
                โดย Year 0 คือจุดเริ่มต้นการใช้งาน ณ ปัจจุบัน
              </p>
            </div>

            <div className="h-[460px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 55,
                    right: 30,
                    left: 20,
                    bottom: 45,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  {/* X Axis */}

                  <XAxis
                    dataKey="year"
                    label={{
                      value: "Year",
                      position: "insideBottom",
                      offset: -25,
                    }}
                  />

                  {/* Y Axis */}

                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    tickFormatter={(value) => `${value}%`}
                    label={{
                      value: "SOH",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />

                  {/* Tooltip */}

                  <Tooltip
                    formatter={(value, name) => [
                      `${value}%`,
                      name === "sohSlb" ? "SOH SLB" : "SOH NB",
                    ]}
                    labelFormatter={(label) => `Year ${label}`}
                  />

                  {/* Legend */}

                  <Legend
                    verticalAlign="top"
                    align="right"
                    height={35}
                    wrapperStyle={{
                      paddingBottom: "10px",
                    }}
                    formatter={(value) =>
                      value === "sohSlb" ? "SOH SLB" : "SOH NB"
                    }
                  />

                  {/* ================================================= */}
                  {/* SOH SLB */}
                  {/* ================================================= */}

                  <Line
                    type="monotone"
                    dataKey="sohSlb"
                    name="sohSlb"
                    stroke="#FF7A5A"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#FF7A5A",
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#FF7A5A",
                    }}
                  />

                  {/* ================================================= */}
                  {/* SOH NB */}
                  {/* ================================================= */}

                  <Line
                    type="monotone"
                    dataKey="sohNb"
                    name="sohNb"
                    stroke="#00AAA0"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#00AAA0",
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#00AAA0",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
