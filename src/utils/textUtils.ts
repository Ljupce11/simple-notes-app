/**
 * Splits a text string into an array of substrings, separating @ mentions from regular text
 * @param value - The input string to split
 * @returns An array of strings where @ mentions are separated from other text
 * @example
 * splitTextByMentions("Hello @user how are you") // ["Hello ", "@user", " how are you"]
 */
export const splitTextByMentions = (value: string): string[] => {
  return value.split(/(@\w+)/g);
};

/**
 * Checks if a text string is a mention (starts with @)
 * @param text - The text to check
 * @returns True if the text is a mention, false otherwise
 * @example
 * isMention("@user") // true
 * isMention("hello") // false
 */
export const isMention = (text: string): boolean => {
  return text.startsWith("@");
};
