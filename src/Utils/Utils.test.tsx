import {
  formatDurationDisplay,
  isOnlyPositiveNumbers,
  isValidEmail,
} from "./Utils";

describe("isValidEmail", () => {
  const functionToTest = isValidEmail;
  // Valid email addresses
  const validEmails = [
    "user@example.com",
    "user123@example.co.uk",
    "user_name123@example.domain",
    "user.name+tag@example.com",
    "user123@example123.com",
  ];
  validEmails.forEach((email) => {
    test(`Valid email: ${email}`, () => {
      expect(functionToTest(email)).toBe(true);
    });
  });

  // Invalid email addresses
  const invalidEmails = [
    "user name@example.com",
    "user@ example.com",
    "user@example",
    "user@example.c",
    "user@.example.com",
    "",
  ];
  invalidEmails.forEach((email) => {
    test(`Invalid email: ${email}`, () => {
      expect(functionToTest(email)).toBe(false);
    });
  });
});

describe("formatDurationDisplay", () => {
  const functionToTest = formatDurationDisplay;
  test("Formats duration less than a minute", () => {
    expect(functionToTest(45)).toBe("00:45");
  });

  test("Formats duration exactly one minute", () => {
    expect(functionToTest(60)).toBe("01:00");
  });

  test("Formats duration more than a minute", () => {
    expect(functionToTest(135)).toBe("02:15");
  });

  test("Formats duration less than an hour", () => {
    expect(functionToTest(3661)).toBe("01:01:01");
  });

  test("Formats duration more than an hour", () => {
    expect(functionToTest(3665)).toBe("01:01:05");
  });

  test("Handles single digit minutes and seconds", () => {
    expect(functionToTest(9)).toBe("00:09");
  });

  test("Handles single digit minutes and double digit seconds", () => {
    expect(functionToTest(69)).toBe("01:09");
  });

  test("Handles double digit minutes and single digit seconds", () => {
    expect(functionToTest(1201)).toBe("20:01");
  });

  test("Handles double digit minutes and double digit seconds", () => {
    expect(functionToTest(1342)).toBe("22:22");
  });

  test("Handles edge case of zero duration", () => {
    expect(functionToTest(0)).toBe("00:00");
  });
});

describe("isOnlyPositiveNumbers", () => {
  const functionToTest = isOnlyPositiveNumbers;

  // Valid numbers
  test("Validates zero", () => {
    expect(functionToTest(0)).toBe(true);
  });

  test("Validates positive number", () => {
    expect(functionToTest(1)).toBe(true);
  });
  // Invalid numbers
  test("Validates an invalid input - negative number", () => {
    expect(functionToTest(-1)).toBe(false);
  });
  test("Validates an invalid input - null", () => {
    expect(functionToTest(null)).toBe(false);
  });
  test("Validates an invalid input - undefined", () => {
    expect(functionToTest(undefined)).toBe(false);
  });
  test("Validates an invalid input - string", () => {
    expect(functionToTest("")).toBe(false);
  });
  test("Validates an invalid input - object", () => {
    expect(functionToTest({})).toBe(false);
  });
  test("Validates an invalid input - array", () => {
    expect(functionToTest([])).toBe(false);
  });
});
