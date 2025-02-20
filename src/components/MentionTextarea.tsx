import { useRef } from "react";

import { useMentionDropdown } from "../hooks/useMentionDropdown";
import { StyledNoteValue } from "./StyledNoteValue";

type Props = {
  rows?: number;
  disabled?: boolean;
  value: string;
  onChangeValue: (value: string) => void;
};

export const MentionTextarea = ({
  rows = 10,
  disabled,
  value,
  onChangeValue,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    showDropdown,
    filteredUsers,
    caretPosition,
    selectedIndex,
    handleChange,
    handleSelectUser,
    handleKeyDown,
  } = useMentionDropdown(
    textareaRef as React.RefObject<HTMLTextAreaElement>,
    onChangeValue,
    value,
  );

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full z-1 p-2 font-normal text-transparent bg-white pointer-events-none whitespace-pre-wrap">
        <StyledNoteValue value={value} />
      </div>
      <textarea
        required
        rows={rows}
        value={value}
        ref={textareaRef}
        disabled={disabled}
        id="note-body"
        name="note-body"
        aria-label="Note body"
        placeholder="Enter your note here..."
        className="relative p-2 bg-transparent font-normal border border-gray-300 rounded-lg w-full z-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showDropdown && (
        <ul
          aria-label="User mentions suggestions"
          style={{
            top: caretPosition.top,
            left: caretPosition.left,
          }}
          className="absolute shadow-md bg-white rounded-lg border border-gray-300 mt-4 overflow-x-hidden z-1000"
        >
          {filteredUsers.map((user, index) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <li
              aria-selected={selectedIndex === index}
              key={user}
              onClick={() => handleSelectUser(user)}
              className={`text-sm capitalize px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors ${selectedIndex === index ? "bg-gray-100" : ""}`}
            >
              {user}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
