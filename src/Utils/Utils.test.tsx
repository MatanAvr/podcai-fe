import { formatDurationDisplay, isValidEmail } from "./Utils";

describe("isValidEmail", () => {
  // Valid email addresses
  test("validates a valid email address - user@example.com", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  test("validates a valid email address - user123@example.co.uk", () => {
    expect(isValidEmail("user123@example.co.uk")).toBe(true);
  });

  test("validates a valid email address - user_name123@example.domain", () => {
    expect(isValidEmail("user_name123@example.domain")).toBe(true);
  });

  test("validates a valid email address - user.name+tag@example.com", () => {
    expect(isValidEmail("user.name+tag@example.com")).toBe(true);
  });

  test("validates a valid email address - user123@example123.com", () => {
    expect(isValidEmail("user123@example123.com")).toBe(true);
  });

  // Invalid email addresses
  test("validates an invalid email address - user name@example.com", () => {
    expect(isValidEmail("user name@example.com")).toBe(false);
  });

  test("validates an invalid email address - user@ example.com", () => {
    expect(isValidEmail("user@ example.com")).toBe(false);
  });

  test("validates an invalid email address - user@example", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });

  test("validates an invalid email address - user@example.c", () => {
    expect(isValidEmail("user@example.c")).toBe(false);
  });

  test("validates an invalid email address - user@.example.com", () => {
    expect(isValidEmail("user@.example.com")).toBe(false);
  });
});

describe("formatDurationDisplay", () => {
  test("formats duration less than a minute", () => {
    expect(formatDurationDisplay(45)).toBe("00:45");
  });

  test("formats duration exactly one minute", () => {
    expect(formatDurationDisplay(60)).toBe("01:00");
  });

  test("formats duration more than a minute", () => {
    expect(formatDurationDisplay(135)).toBe("02:15");
  });

  test("formats duration less than an hour", () => {
    expect(formatDurationDisplay(3661)).toBe("01:01:01");
  });

  test("formats duration more than an hour", () => {
    expect(formatDurationDisplay(3665)).toBe("01:01:05");
  });

  test("handles single digit minutes and seconds", () => {
    expect(formatDurationDisplay(9)).toBe("00:09");
  });

  test("handles single digit minutes and double digit seconds", () => {
    expect(formatDurationDisplay(69)).toBe("01:09");
  });

  test("handles double digit minutes and single digit seconds", () => {
    expect(formatDurationDisplay(1201)).toBe("20:01");
  });

  test("handles double digit minutes and double digit seconds", () => {
    expect(formatDurationDisplay(1342)).toBe("22:22");
  });

  test("handles edge case of zero duration", () => {
    expect(formatDurationDisplay(0)).toBe("00:00");
  });
});
