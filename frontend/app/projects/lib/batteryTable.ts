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

  // ตารางแสดง Year 0 → Year 10
  const totalYears = 10;

  let previousLSlb = 0;
  let previousL = 0;

  return Array.from(
    { length: totalYears + 1 },
    (_, yearIndex) => {
      // -------------------------
      // Year ที่แสดง
      // -------------------------

      const displayYear = yearIndex;

      // Year 0 แสดง 0 เดือน
      // หลังจากนั้นใช้เดือนเดียวกับอายุปัจจุบัน
      const displayMonth =
        yearIndex === 0
          ? 0
          : currentMonths;

      // -------------------------
      // อายุจริงสำหรับ SLB
      // เริ่มจากอายุแบตปัจจุบัน
      // -------------------------

      const slbCalculationMonths =
        ageInMonths + yearIndex * 12;

      const slbCalculationYears =
        slbCalculationMonths / 12;

      // -------------------------
      // อายุจริงสำหรับ NB
      // เริ่มจากแบตใหม่ 0 ปี
      // -------------------------

      const nbCalculationMonths =
        yearIndex * 12;

      const nbCalculationYears =
        nbCalculationMonths / 12;

      // =====================================================
      // NB
      // =====================================================

      const nbN = nbCalculationYears * 365;

      const nbT = nbN * 24 * 60 * 60;

      const nbFt = 4.1375e-10 * nbT;

      const nbFCal =
        nbFt * fSoc * fT;

      const nbFCycle =
        fDod * fSoc * fT * nbN;

      const nbFD =
        nbFCal + nbFCycle;

      const L =
        (1 - 0.0575 * Math.exp(nbFD * -121)) -
        ((1 - 0.0575) * Math.exp(-nbFD));

      const sohNb =
        (1 - L) * 100;

      // =====================================================
      // SLB
      // =====================================================

      const slbN =
        slbCalculationYears * 365;

      const slbT =
        slbN * 24 * 60 * 60;

      const slbFt =
        4.1375e-10 * slbT;

      const slbFCal =
        slbFt * fSoc * fT;

      const slbFCycle =
        fDod * fSoc * fT * slbN;

      const slbFD =
        slbFCal + slbFCycle;

      const LSLB =
        1 - ((1 - 0.2) * Math.exp(-slbFD));

      const sohSlb =
        (1 - LSLB) * 100;

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

      previousLSlb = LSLB;
      previousL = L;

      return {
        // อายุที่ใช้แสดงในตาราง
        year: displayYear,
        month: displayMonth,

        // อายุจริงของ SLB
        calculationMonths: slbCalculationMonths,

        // อายุจริงของ NB
        nbCalculationMonths,

        // ค่า N / t / f ต่าง ๆ
        // ให้แสดงค่าของ SLB
        N: slbN,
        t: slbT,
        ft: slbFt,
        fCal: slbFCal,
        fCycle: slbFCycle,
        fD: slbFD,

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