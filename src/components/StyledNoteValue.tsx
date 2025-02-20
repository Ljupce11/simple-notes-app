import { memo } from "react";

export const StyledNoteValue = memo(({ value }: { value: string }) => {
  const parts = value.split(/(@\w+)/g);
  return parts.map((part, index) => {
    const key = index + 1;
    if (part.startsWith("@")) {
      return (
        <span key={key} className="bg-yellow-200 px-[2px]">
          {part}
        </span>
      );
    }
    return <span key={key}>{part}</span>;
  });
});
