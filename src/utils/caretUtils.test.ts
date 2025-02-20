import { describe, expect, it } from "vitest";
import { calculateCaretPosition } from "./caretUtils";

describe("calculateCaretPosition", () => {
  it("should calculate correct caret position for single line text", () => {
    const mockTextarea = {
      getBoundingClientRect: () => ({
        top: 100,
        left: 100,
      }),
      parentElement: {
        getBoundingClientRect: () => ({
          top: 50,
          left: 50,
        }),
      },
    } as unknown as HTMLTextAreaElement;

    const position = calculateCaretPosition(mockTextarea, "Hello", 5);

    expect(position).toEqual({
      top: 70, // (100 - 50) + (1 line * 20)
      left: 90, // (100 - 50) + (5 chars * 8)
    });
  });

  it("should calculate correct caret position for multi-line text", () => {
    const mockTextarea = {
      getBoundingClientRect: () => ({
        top: 100,
        left: 100,
      }),
      parentElement: {
        getBoundingClientRect: () => ({
          top: 50,
          left: 50,
        }),
      },
    } as unknown as HTMLTextAreaElement;

    const position = calculateCaretPosition(mockTextarea, "Hello\nWorld", 7);

    expect(position).toEqual({
      top: 90, // (100 - 50) + (2 lines * 20)
      left: 58, // (100 - 50) + (2 chars * 8)
    });
  });
});
