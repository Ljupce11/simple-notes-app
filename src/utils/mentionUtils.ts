/**
 * Finds the index of the last '@' symbol before the cursor position
 * @param value - The input string to search in
 * @param cursorPos - The current cursor position
 * @returns The index of the last '@' symbol, or -1 if not found
 */
export const findLastMentionIndex = (
  value: string,
  cursorPos: number,
): number => {
  return value.lastIndexOf("@", cursorPos - 1);
};

/**
 * Filters a list of users based on a search query
 * @param users - Array of usernames to filter
 * @param searchQuery - The search string to filter by
 * @param limit - Maximum number of results to return (default: 5)
 * @returns Filtered array of usernames that start with the search query
 */
export const filterUsers = (
  users: string[],
  searchQuery: string,
  limit = 5,
): string[] => {
  return users
    .filter((user) => user.toLowerCase().startsWith(searchQuery.toLowerCase()))
    .slice(0, limit);
};
