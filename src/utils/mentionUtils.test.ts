import { describe, expect, it } from "vitest";
import { filterUsers, findLastMentionIndex } from "./mentionUtils";

describe("findLastMentionIndex", () => {
  it("should find the last @ symbol before cursor position", () => {
    expect(findLastMentionIndex("Hello @user", 11)).toBe(6);
    expect(findLastMentionIndex("Hello @user @john", 12)).toBe(6);
    expect(findLastMentionIndex("Hello @user @john", 17)).toBe(12);
  });

  it("should return -1 when no @ symbol is found", () => {
    expect(findLastMentionIndex("Hello user", 10)).toBe(-1);
    expect(findLastMentionIndex("", 0)).toBe(-1);
  });
});

describe("filterUsers", () => {
  const users = ["john", "jane", "jack", "james", "jessica", "jerry"];

  it("should filter users based on search query", () => {
    expect(filterUsers(users, "j")).toEqual([
      "john",
      "jane",
      "jack",
      "james",
      "jessica",
    ]);
    expect(filterUsers(users, "ja")).toEqual(["jane", "jack", "james"]);
    expect(filterUsers(users, "je")).toEqual(["jessica", "jerry"]);
  });

  it("should respect the limit parameter", () => {
    expect(filterUsers(users, "j", 3)).toEqual(["john", "jane", "jack"]);
    expect(filterUsers(users, "j", 2)).toEqual(["john", "jane"]);
  });

  it("should be case insensitive", () => {
    expect(filterUsers(users, "J")).toEqual([
      "john",
      "jane",
      "jack",
      "james",
      "jessica",
    ]);
    expect(filterUsers(users, "JA")).toEqual(["jane", "jack", "james"]);
  });

  it("should return empty array when no matches found", () => {
    expect(filterUsers(users, "z")).toEqual([]);
  });
});
