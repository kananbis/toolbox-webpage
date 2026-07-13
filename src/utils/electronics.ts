export const capacitanceFactors: Record<string, number> = {
  pF: 1e-12,
  nF: 1e-9,
  uF: 1e-6,
  mF: 1e-3,
  F: 1,
};

export const resistanceFactors: Record<string, number> = {
  ohm: 1,
  kohm: 1e3,
  Mohm: 1e6,
};

export const frequencyFactors: Record<string, number> = {
  Hz: 1,
  kHz: 1e3,
  MHz: 1e6,
  GHz: 1e9,
};

export const wavelengthFactors: Record<string, number> = {
  m: 1,
  cm: 1e-2,
  mm: 1e-3,
  um: 1e-6,
  nm: 1e-9,
};

export const inductanceFactors: Record<string, number> = {
  nH: 1e-9,
  uH: 1e-6,
  mH: 1e-3,
  H: 1,
};

export const speedOfLight = 299_792_458;

const awgChassisAmpacity: Record<number, number> = {
  [-3]: 380,
  [-2]: 328,
  [-1]: 283,
  0: 245,
  1: 211,
  2: 181,
  3: 158,
  4: 135,
  5: 118,
  6: 101,
  7: 89,
  8: 73,
  9: 64,
  10: 55,
  11: 47,
  12: 41,
  13: 35,
  14: 32,
  15: 28,
  16: 22,
  17: 19,
  18: 16,
  19: 14,
  20: 11,
  21: 9,
  22: 7,
  23: 4.7,
  24: 3.5,
  25: 2.7,
  26: 2.2,
  27: 1.7,
  28: 1.4,
  29: 1.2,
  30: 0.86,
  31: 0.7,
  32: 0.53,
  33: 0.43,
  34: 0.33,
  35: 0.27,
  36: 0.21,
  37: 0.17,
  38: 0.13,
  39: 0.11,
  40: 0.09,
};

export function awgToMetrics(awg: number) {
  const diameterInch = 0.005 * 92 ** ((36 - awg) / 39);
  const diameterMm = diameterInch * 25.4;
  const circularMils = (diameterInch * 1000) ** 2;
  const areaMm2 = Math.PI * (diameterMm / 2) ** 2;
  const resistanceOhmPerMeter = 0.017241 / areaMm2;
  const referenceAmpacity = awgChassisAmpacity[awg];

  return { diameterInch, diameterMm, areaMm2, circularMils, resistanceOhmPerMeter, referenceAmpacity };
}
