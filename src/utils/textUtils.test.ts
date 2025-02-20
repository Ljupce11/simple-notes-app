import { describe, expect, it } from "vitest";
import { isMention, splitTextByMentions } from "./textUtils";

describe("splitTextByMentions", () => {
  it("should split text with mentions correctly", () => {
    expect(splitTextByMentions("Hello @john how are you?")).toEqual([
      "Hello ",
      "@john",
      " how are you?",
    ]);
  });

  it("should handle multiple mentions", () => {
    expect(splitTextByMentions("Hi @jane and @john!")).toEqual([
      "Hi ",
      "@jane",
      " and ",
      "@john",
      "!",
    ]);
  });

  it("should handle text without mentions", () => {
    expect(splitTextByMentions("Hello world")).toEqual(["Hello world"]);
  });

  it("should handle empty string", () => {
    expect(splitTextByMentions("")).toEqual([""]);
  });
});

describe("isMention", () => {
  it("should return true for strings starting with @", () => {
    expect(isMention("@user")).toBe(true);
    expect(isMention("@john123")).toBe(true);
  });

  it("should return false for strings not starting with @", () => {
    expect(isMention("user")).toBe(false);
    expect(isMention("user@example.com")).toBe(false);
    expect(isMention("")).toBe(false);
  });
});
