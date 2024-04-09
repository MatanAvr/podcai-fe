import {
  formatDurationDisplay,
  isOnlyPositiveNumbers,
  isValidEmail,
} from "./Utils";

describe("isValidEmail", () => {
  const functionToTest = isValidEmail;
  // Valid email addresses
  test("validates a valid email address - user@example.com", () => {
    expect(functionToTest("user@example.com")).toBe(true);
  });

  test("validates a valid email address - user123@example.co.uk", () => {
    expect(functionToTest("user123@example.co.uk")).toBe(true);
  });

  test("validates a valid email address - user_name123@example.domain", () => {
    expect(functionToTest("user_name123@example.domain")).toBe(true);
  });

  test("validates a valid email address - user.name+tag@example.com", () => {
    expect(functionToTest("user.name+tag@example.com")).toBe(true);
  });

  test("validates a valid email address - user123@example123.com", () => {
    expect(functionToTest("user123@example123.com")).toBe(true);
  });

  // Invalid email addresses
  test("validates an invalid email address - user name@example.com", () => {
    expect(functionToTest("user name@example.com")).toBe(false);
  });

  test("validates an invalid email address - user@ example.com", () => {
    expect(functionToTest("user@ example.com")).toBe(false);
  });

  test("validates an invalid email address - user@example", () => {
    expect(functionToTest("user@example")).toBe(false);
  });

  test("validates an invalid email address - user@example.c", () => {
    expect(functionToTest("user@example.c")).toBe(false);
  });

  test("validates an invalid email address - user@.example.com", () => {
    expect(functionToTest("user@.example.com")).toBe(false);
  });

  test("validates an invalid email address - (empty)", () => {
    expect(functionToTest("")).toBe(false);
  });
});

describe("formatDurationDisplay", () => {
  const functionToTest = formatDurationDisplay;
  test("formats duration less than a minute", () => {
    expect(functionToTest(45)).toBe("00:45");
  });

  test("formats duration exactly one minute", () => {
    expect(functionToTest(60)).toBe("01:00");
  });

  test("formats duration more than a minute", () => {
    expect(functionToTest(135)).toBe("02:15");
  });

  test("formats duration less than an hour", () => {
    expect(functionToTest(3661)).toBe("01:01:01");
  });

  test("formats duration more than an hour", () => {
    expect(functionToTest(3665)).toBe("01:01:05");
  });

  test("handles single digit minutes and seconds", () => {
    expect(functionToTest(9)).toBe("00:09");
  });

  test("handles single digit minutes and double digit seconds", () => {
    expect(functionToTest(69)).toBe("01:09");
  });

  test("handles double digit minutes and single digit seconds", () => {
    expect(functionToTest(1201)).toBe("20:01");
  });

  test("handles double digit minutes and double digit seconds", () => {
    expect(functionToTest(1342)).toBe("22:22");
  });

  test("handles edge case of zero duration", () => {
    expect(functionToTest(0)).toBe("00:00");
  });
});

describe("isOnlyPositiveNumbers", () => {
  const functionToTest = isOnlyPositiveNumbers;

  // Valid numbers
  test("validates zero", () => {
    expect(functionToTest(0)).toBe(true);
  });

  test("validates positive number", () => {
    expect(functionToTest(1)).toBe(true);
  });
  // Invalid numbers
  test("validates an invalid input - negative number", () => {
    expect(functionToTest(-1)).toBe(false);
  });
  test("validates an invalid input - null", () => {
    expect(functionToTest(null)).toBe(false);
  });
  test("validates an invalid input - undefined", () => {
    expect(functionToTest(undefined)).toBe(false);
  });
  test("validates an invalid input - string", () => {
    expect(functionToTest("")).toBe(false);
  });
  test("validates an invalid input - object", () => {
    expect(functionToTest({})).toBe(false);
  });
  test("validates an invalid input - array", () => {
    expect(functionToTest([])).toBe(false);
  });
});
