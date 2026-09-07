import { EARNED_INCOME_TAX_12M_BASE_2026, EARNED_INCOME_TAX_TABLE_2026 } from "../data/earned-income-tax-table-2026.ts";

export const SALARY_DEDUCTION_RULES = {
  2026: {
    label: "2026 Korea employee withholding estimate",
    effectiveDate: "2026-07-01",
    nationalPension: {
      employeeRate: 0.0475,
      minimumMonthlyIncome: 410_000,
      maximumMonthlyIncome: 6_590_000,
    },
    healthInsurance: {
      employeeRate: 0.0719 / 2,
    },
    longTermCare: {
      rateOnHealthInsurance: 0.009448 / 0.0719,
    },
    employmentInsurance: {
      employeeRate: 0.009,
    },
    incomeTax: {
      minimumMonthlySalary: 995_000,
      maximumTableMonthlySalary: 12_000_000,
      maximumDependents: 10,
      childAdjustment: {
        oneChild: 12_500,
        twoChildren: 29_160,
        eachAdditionalChild: 25_000,
      },
    },
  },
} as const;

export type SalaryNetInput = {
  annualSalary: number;
  monthlyNonTaxable: number;
  dependents: number;
  childrenUnder20: number;
};

export type SalaryNetResult = {
  annualSalary: number;
  monthlyGross: number;
  monthlyNonTaxable: number;
  monthlyEligibleIncome: number;
  dependents: number;
  childrenUnder20: number;
  nationalPension: number;
  healthInsurance: number;
  longTermCareInsurance: number;
  employmentInsurance: number;
  earnedIncomeTax: number;
  localIncomeTax: number;
  totalDeductions: number;
  monthlyNet: number;
  annualNet: number;
  takeHomeRate: number;
  pensionBase: number;
};

const floorToTen = (amount: number) => Math.floor(Math.max(0, amount) / 10) * 10;
const floorToThousand = (amount: number) => Math.floor(Math.max(0, amount) / 1_000) * 1_000;
const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);
const asNonNegativeNumber = (value: number) => Number.isFinite(value) ? Math.max(0, value) : 0;

export const convertManwonToWon = (manwon: number) => asNonNegativeNumber(manwon) * 10_000;

export const getChildTaxAdjustment2026 = (childrenUnder20: number) => {
  const children = Math.max(0, Math.floor(childrenUnder20));
  const { childAdjustment } = SALARY_DEDUCTION_RULES[2026].incomeTax;
  if (children === 0) return 0;
  if (children === 1) return childAdjustment.oneChild;
  return childAdjustment.twoChildren + (children - 2) * childAdjustment.eachAdditionalChild;
};

export const calculateEarnedIncomeTax2026 = (monthlyTaxableSalary: number, dependents: number, childrenUnder20: number) => {
  const rules = SALARY_DEDUCTION_RULES[2026].incomeTax;
  const salary = asNonNegativeNumber(monthlyTaxableSalary);
  const dependentCount = clamp(Math.floor(dependents), 1, rules.maximumDependents);
  let tableTax = 0;

  if (salary >= rules.maximumTableMonthlySalary) {
    const base = EARNED_INCOME_TAX_12M_BASE_2026[dependentCount - 1];
    tableTax = Math.floor(base + (salary - rules.maximumTableMonthlySalary) * 0.2);
  } else if (salary >= rules.minimumMonthlySalary) {
    const salaryInThousands = salary / 1_000;
    const row = EARNED_INCOME_TAX_TABLE_2026.find(([minimum, maximum]) => salaryInThousands >= minimum && salaryInThousands < maximum);
    tableTax = row?.[dependentCount + 1] ?? 0;
  }

  return Math.max(0, tableTax - getChildTaxAdjustment2026(childrenUnder20));
};

export const calculateSalaryNet = (input: SalaryNetInput): SalaryNetResult => {
  const rules = SALARY_DEDUCTION_RULES[2026];
  const annualSalary = asNonNegativeNumber(input.annualSalary);
  const monthlyGross = annualSalary / 12;
  const monthlyNonTaxable = Math.min(asNonNegativeNumber(input.monthlyNonTaxable), monthlyGross);
  const monthlyEligibleIncome = Math.max(0, monthlyGross - monthlyNonTaxable);
  const dependents = clamp(Math.floor(input.dependents), 1, rules.incomeTax.maximumDependents);
  const childrenUnder20 = clamp(Math.floor(input.childrenUnder20), 0, dependents);
  const pensionBase = clamp(
    floorToThousand(monthlyEligibleIncome),
    rules.nationalPension.minimumMonthlyIncome,
    rules.nationalPension.maximumMonthlyIncome,
  );
  const nationalPension = floorToTen(pensionBase * rules.nationalPension.employeeRate);
  const healthInsurance = floorToTen(monthlyEligibleIncome * rules.healthInsurance.employeeRate);
  const longTermCareInsurance = floorToTen(healthInsurance * rules.longTermCare.rateOnHealthInsurance);
  const employmentInsurance = floorToTen(monthlyEligibleIncome * rules.employmentInsurance.employeeRate);
  const earnedIncomeTax = calculateEarnedIncomeTax2026(monthlyEligibleIncome, dependents, childrenUnder20);
  const localIncomeTax = floorToTen(earnedIncomeTax * 0.1);
  const totalDeductions = nationalPension + healthInsurance + longTermCareInsurance + employmentInsurance + earnedIncomeTax + localIncomeTax;
  const monthlyNet = Math.max(0, monthlyGross - totalDeductions);

  return {
    annualSalary,
    monthlyGross,
    monthlyNonTaxable,
    monthlyEligibleIncome,
    dependents,
    childrenUnder20,
    nationalPension,
    healthInsurance,
    longTermCareInsurance,
    employmentInsurance,
    earnedIncomeTax,
    localIncomeTax,
    totalDeductions,
    monthlyNet,
    annualNet: monthlyNet * 12,
    takeHomeRate: monthlyGross === 0 ? 0 : (monthlyNet / monthlyGross) * 100,
    pensionBase,
  };
};
