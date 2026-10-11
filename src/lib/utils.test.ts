import { afterEach, describe, expect, it } from "vitest";
import { formatDate, parseDate } from "./utils";

describe("parseDate", () => {
  it("parses a dd/mm/yyyy date", () => {
    expect(parseDate("15/05/2000")).toEqual(new Date(2000, 4, 15));
  });

  it("rejects other formats", () => {
    for (const value of ["", "garbage", "15-05-2000", "2000/05/15", "5/5/2000", "15/05/00"])
      expect(parseDate(value), value).toBeNull();
  });

  it("rejects dates that don't exist instead of rolling them over", () => {
    expect(parseDate("31/02/2000")).toBeNull();
    expect(parseDate("29/02/2023")).toBeNull();
    expect(parseDate("00/01/2000")).toBeNull();
    expect(parseDate("01/13/2000")).toBeNull();
  });

  it("accepts 29 February in a leap year", () => {
    expect(parseDate("29/02/2024")).toEqual(new Date(2024, 1, 29));
  });
});

describe("formatDate", () => {
  const originalTimeZone = process.env.TZ;

  afterEach(() => {
    process.env.TZ = originalTimeZone;
  });

  it("formats as dd/mm/yyyy with leading zeros", () => {
    expect(formatDate(new Date(2000, 0, 5))).toBe("05/01/2000");
  });

  it("round-trips with parseDate", () => {
    expect(formatDate(parseDate("15/05/2000")!)).toBe("15/05/2000");
  });

  // The date picker returns local midnight, which is the previous day in
  // Algeria for anyone east of it. The day picked must be the day saved.
  it("keeps the calendar day in any time zone", () => {
    for (const timeZone of ["Pacific/Kiritimati", "Europe/Paris", "America/Los_Angeles"]) {
      process.env.TZ = timeZone;
      expect(formatDate(new Date(2000, 4, 15)), timeZone).toBe("15/05/2000");
    }
  });
});
