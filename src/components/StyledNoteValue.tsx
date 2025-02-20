import { memo } from "react";

import { isMention, splitTextByMentions } from "../utils/textUtils";

export const StyledNoteValue = memo(({ value }: { value: string }) => {
  const parts = splitTextByMentions(value);
  return parts.map((part, index) => {
    const key = index + 1;
    if (isMention(part)) {
      return (
        <span key={key} className="bg-yellow-200 px-[2px]">
          {part}
        </span>
      );
    }
    return <span key={key}>{part}</span>;
  });
});
