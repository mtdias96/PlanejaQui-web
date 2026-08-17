import { describe, expect, it } from "vitest";
import {
  calculateMonthProgress,
  calculateRemainingDays,
  calculateSplitRatio,
  formatSignedPercent,
} from "./compute";

describe("Dashboard compute functions", () => {
  it("calculates month progress percentage accurately", () => {
    expect(calculateMonthProgress(17, 31)).toBeCloseTo(54.838, 2);
    expect(calculateMonthProgress(0, 31)).toBe(0);
    expect(calculateMonthProgress(31, 31)).toBe(100);
    expect(calculateMonthProgress(35, 31)).toBe(100);
    expect(calculateMonthProgress(15, 0)).toBe(0);
  });

  it("calculates remaining days correctly", () => {
    expect(calculateRemainingDays(17, 31)).toBe(14);
    expect(calculateRemainingDays(31, 31)).toBe(0);
    expect(calculateRemainingDays(32, 31)).toBe(0);
  });

  it("calculates split ratio between free cash and reserved cash", () => {
    const { freeRatio, reservedRatio } = calculateSplitRatio(314258, 1344258);
    expect(freeRatio).toBeCloseTo(23.378, 2);
    expect(reservedRatio).toBeCloseTo(76.621, 2);
    expect(freeRatio + reservedRatio).toBeCloseTo(100, 2);
  });

  it("formats signed percentages correctly", () => {
    expect(formatSignedPercent(-12)).toBe("-12%");
    expect(formatSignedPercent(8)).toBe("+8%");
    expect(formatSignedPercent(0)).toBe("0%");
  });
});
