export const getBatteryTable = (
  fSoc: number,
  fT: number,
  fDod: number,
  high: number,
  low: number,
  ageInMonths: number
) => {
  // อายุรถปัจจุบันเป็นปีเต็ม + เดือน
  const currentYears = Math.floor(ageInMonths / 12);
  const currentMonths = ageInMonths % 12;

  // อายุสูงสุด = อายุรถปัจจุบัน + 10 ปี
  const endYear = currentYears + 10;

  let previousLSlb = 0;
  let previousL = 0;

  return Array.from(
    { length: endYear + 1 },
    (_, yearIndex) => {
      // -------------------------
      // Year ที่แสดง
      // -------------------------

      const displayYear =
        yearIndex === 0
          ? 0
          : yearIndex;

      const displayMonth =
        yearIndex === 0
          ? 0
          : currentMonths;

      // -------------------------
      // อายุจริงสำหรับการคำนวณ
      // -------------------------

      const calculationMonths =
        yearIndex === 0
          ? 0
          : yearIndex * 12 + currentMonths;

      const calculationYears =
        calculationMonths / 12;

      // -------------------------
      // จำนวนวัน
      // -------------------------

      const N = calculationYears * 365;

      // -------------------------
      // เวลาเป็นวินาที
      // -------------------------

      const t = N * 24 * 60 * 60;

      // -------------------------
      // f(t)
      // -------------------------

      const ft = 4.1375e-10 * t;

      // -------------------------
      // Calendar aging
      // -------------------------

      const fCal = ft * fSoc * fT;

      // -------------------------
      // Cycle aging
      // -------------------------

      const fCycle =
        fDod * fSoc * fT * N;

      // -------------------------
      // Total degradation
      // -------------------------

      const fD = fCal + fCycle;

      // -------------------------
      // L high-low (NB)
      // -------------------------

      const L =
        (1 - 0.0575 * Math.exp(fD * -121)) -
        ((1 - 0.0575) * Math.exp(-fD));

      // -------------------------
      // L_SLB
      // -------------------------

      const LSLB =
        1 - ((1 - 0.2) * Math.exp(-fD));

      // -------------------------
      // Degrade SLB
      // -------------------------

      let degradeSlb = null;

      if (yearIndex > 0) {
        degradeSlb =
          (LSLB - previousLSlb) * 100;
      }

      // -------------------------
      // Degrade NB
      // -------------------------

      let degradeNb = null;

      if (yearIndex > 0) {
        degradeNb =
          (L - previousL) * 100;
      }

      // -------------------------
      // SOH
      // -------------------------

      const sohSlb =
        (1 - LSLB) * 100;

      const sohNb =
        (1 - L) * 100;

      previousLSlb = LSLB;
      previousL = L;

      return {
        year: displayYear,
        month: displayMonth,

        calculationMonths,

        N,
        t,

        ft,

        fCal,
        fCycle,

        fD,

        L,

        LSLB,

        degradeSlb,
        degradeNb,

        sohSlb,
        sohNb,
      };
    }
  );
};