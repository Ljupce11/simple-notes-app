import { useRef } from "react";
import { useMentionDropdown } from "../hooks/useMentionDropdown";

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
    <>
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
        className="border border-gray-300 rounded-lg w-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showDropdown && (
        <ul
          style={{
            top: caretPosition.top + 10,
            left: caretPosition.left,
          }}
          className="absolute shadow-md bg-white rounded-lg border border-gray-300 mt-2 overflow-x-hidden z-1000"
        >
          {filteredUsers.map((user, index) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <li
              key={user}
              onClick={() => handleSelectUser(user)}
              className={`text-sm capitalize px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors ${selectedIndex === index ? "bg-gray-100" : ""}`}
            >
              {user}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
