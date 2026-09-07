import assert from "node:assert/strict";
import { calculateEarnedIncomeTax2026, calculateSalaryNet, convertManwonToWon, SALARY_DEDUCTION_RULES } from "../src/utils/salary-net.ts";

const salaryCases = [30_000_000, 40_000_000, 50_000_000, 60_000_000, 80_000_000, 100_000_000];

for (const annualSalary of salaryCases) {
  const result = calculateSalaryNet({ annualSalary, monthlyNonTaxable: 0, dependents: 1, childrenUnder20: 0 });
  assert.ok(result.monthlyNet > 0, `${annualSalary}: monthly net pay should be positive`);
  assert.equal(result.monthlyGross - result.totalDeductions, result.monthlyNet);
  assert.equal(result.totalDeductions, result.nationalPension + result.healthInsurance + result.longTermCareInsurance + result.employmentInsurance + result.earnedIncomeTax + result.localIncomeTax);
}

const nonTaxable = calculateSalaryNet({ annualSalary: 60_000_000, monthlyNonTaxable: 200_000, dependents: 1, childrenUnder20: 0 });
const taxable = calculateSalaryNet({ annualSalary: 60_000_000, monthlyNonTaxable: 0, dependents: 1, childrenUnder20: 0 });
assert.ok(nonTaxable.totalDeductions < taxable.totalDeductions, "non-taxable income should reduce deductions");

assert.equal(convertManwonToWon(8_200), 82_000_000);
assert.equal(convertManwonToWon(20), 200_000);
const uiUnitRegression = calculateSalaryNet({ annualSalary: convertManwonToWon(8_200), monthlyNonTaxable: convertManwonToWon(20), dependents: 1, childrenUnder20: 0 });
const wonUnitRegression = calculateSalaryNet({ annualSalary: 82_000_000, monthlyNonTaxable: 200_000, dependents: 1, childrenUnder20: 0 });
assert.deepEqual(uiUnitRegression, wonUnitRegression, "만원 UI input must preserve all existing won-based deduction results");

const largerFamily = calculateSalaryNet({ annualSalary: 60_000_000, monthlyNonTaxable: 0, dependents: 3, childrenUnder20: 2 });
assert.ok(largerFamily.earnedIncomeTax < taxable.earnedIncomeTax, "dependents and children should reduce withholding tax");

const belowPensionFloor = calculateSalaryNet({ annualSalary: 1_000_000, monthlyNonTaxable: 0, dependents: 1, childrenUnder20: 0 });
assert.equal(belowPensionFloor.pensionBase, SALARY_DEDUCTION_RULES[2026].nationalPension.minimumMonthlyIncome);

const abovePensionCeiling = calculateSalaryNet({ annualSalary: 120_000_000, monthlyNonTaxable: 0, dependents: 1, childrenUnder20: 0 });
assert.equal(abovePensionCeiling.pensionBase, SALARY_DEDUCTION_RULES[2026].nationalPension.maximumMonthlyIncome);
assert.equal(abovePensionCeiling.nationalPension, 313_020);

assert.equal(calculateEarnedIncomeTax2026(2_000_000, 1, 0), 5_590);
assert.equal(calculateEarnedIncomeTax2026(12_000_000, 1, 0), 1_315_000);
assert.equal(calculateEarnedIncomeTax2026(12_500_000, 1, 0), 1_415_000);

console.log(`salary-net tests passed: ${salaryCases.length} salary cases and statutory boundaries`);
