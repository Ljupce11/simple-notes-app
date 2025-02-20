import { useEffect, useState } from "react";

import { useUsers } from "./useUsers";

export const useMentionDropdown = (
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  onChangeValue: (value: string) => void,
  textAreaValue: string,
) => {
  const { users } = useUsers();
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);
  const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (showDropdown) setSelectedIndex(0);
  }, [showDropdown]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChangeValue(value);

    const cursorPos = e.target.selectionStart;
    const lastAtIndex = value.lastIndexOf("@", cursorPos - 1);

    if (lastAtIndex !== -1) {
      const searchQuery = value.substring(lastAtIndex + 1, cursorPos);
      const filtered = users
        .filter((user) =>
          user.toLowerCase().startsWith(searchQuery.toLowerCase()),
        )
        .slice(0, 5);
      setFilteredUsers(filtered);
      setShowDropdown(filtered.length > 0);

      if (textareaRef.current) {
        const rect = textareaRef.current.getBoundingClientRect();
        const parentRect =
          textareaRef.current.parentElement?.getBoundingClientRect() || {
            top: 0,
            left: 0,
          };

        const lines = value.substring(0, cursorPos).split("\n");
        setCaretPosition({
          top: rect.top - parentRect.top + lines.length * 20,
          left:
            rect.left - parentRect.left + lines[lines.length - 1].length * 8,
        });
      }
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectUser = (user: string) => {
    const cursorPos = textareaRef.current?.selectionStart || 0;
    const lastAtIndex = textAreaValue.lastIndexOf("@", cursorPos - 1);

    if (lastAtIndex !== -1) {
      const newText = `${textAreaValue.substring(0, lastAtIndex + 1)}${user} ${textAreaValue.substring(cursorPos)}`;
      onChangeValue(newText);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showDropdown) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredUsers.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSelectUser(filteredUsers[selectedIndex]);
      }
    }
  };

  return {
    showDropdown,
    filteredUsers,
    caretPosition,
    selectedIndex,
    handleChange,
    handleSelectUser,
    handleKeyDown,
  };
};
