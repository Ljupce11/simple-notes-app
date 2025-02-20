export const findLastMentionIndex = (
  value: string,
  cursorPos: number,
): number => {
  return value.lastIndexOf("@", cursorPos - 1);
};

export const filterUsers = (
  users: string[],
  searchQuery: string,
  limit = 5,
): string[] => {
  return users
    .filter((user) => user.toLowerCase().startsWith(searchQuery.toLowerCase()))
    .slice(0, limit);
};
