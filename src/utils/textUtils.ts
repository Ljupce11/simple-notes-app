export const splitTextByMentions = (value: string): string[] => {
  return value.split(/(@\w+)/g);
};

export const isMention = (text: string): boolean => {
  return text.startsWith("@");
};
