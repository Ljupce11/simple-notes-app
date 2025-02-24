/**
 * Calculates the position of the text cursor within a textarea
 * @param textareaRef - Reference to the textarea HTML element
 * @param value - Current text content of the textarea
 * @param cursorPos - Current cursor position (character index) in the text
 * @returns Position of the caret relative to its container
 */

interface CaretPosition {
  top: number;
  left: number;
}

export const calculateCaretPosition = (
  textareaRef: HTMLTextAreaElement,
  value: string,
  cursorPos: number,
): CaretPosition => {
  const rect = textareaRef.getBoundingClientRect();
  const parentRect = textareaRef.parentElement?.getBoundingClientRect() || {
    top: 0,
    left: 0,
  };
  const lines = value.substring(0, cursorPos).split("\n");
  return {
    top: rect.top - parentRect.top + lines.length * 20,
    left: rect.left - parentRect.left + lines[lines.length - 1].length * 8,
  };
};
