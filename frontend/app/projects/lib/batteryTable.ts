export const getBatteryTable = (
  fSoc: number,
  fT: number,
  fDod: number,
  high: number,
  low: number
) => {

  let previousLSlb = 0;
  let previousL = 0;


  return Array.from({ length: 21 }, (_, year) => {

    const N = year * 365;

    const t = N * 24 * 60 * 60;


    // f(t)
    const ft = 4.1375e-10 * t;


    // Calendar aging
    const fCal = ft * fSoc * fT;


    // Cycle aging
    const fCycle = fDod * fSoc * fT * N;


    // total degradation factor
    const fD = fCal + fCycle;



    // L high-low (NB)
    const L =
      (1 - (0.0575 * Math.exp(fD * -121)))
      -
      ((1 - 0.0575) * Math.exp(-fD));



    // L_SLB
    const LSLB =
      1 - ((1 - 0.2) * Math.exp(-fD));



    // Degrade SLB
    let degradeSlb = null;

    if (year > 0) {
      degradeSlb =
        (LSLB - previousLSlb) * 100;
    }



    // Degrade NB
    let degradeNb = null;

    if (year > 0) {
      degradeNb =
        (L - previousL) * 100;
    }



    // SOH
    const sohSlb =
      (1 - LSLB) * 100;


    const sohNb =
      (1 - L) * 100;



    previousLSlb = LSLB;
    previousL = L;



    return {
      year,
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

  });

};