import { useEffect, useState } from "react";

import { calculateCaretPosition } from "../utils/caretUtils";
import { filterUsers, findLastMentionIndex } from "../utils/mentionUtils";
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
    const lastAtIndex = findLastMentionIndex(value, cursorPos);

    if (lastAtIndex !== -1) {
      const searchQuery = value.substring(lastAtIndex + 1, cursorPos);
      const filtered = filterUsers(users, searchQuery, 5);
      setFilteredUsers(filtered);
      setShowDropdown(filtered.length > 0);

      if (textareaRef.current) {
        setCaretPosition(
          calculateCaretPosition(textareaRef.current, value, cursorPos),
        );
      }
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectUser = (user: string) => {
    const cursorPos = textareaRef.current?.selectionStart || 0;
    const lastAtIndex = findLastMentionIndex(textAreaValue, cursorPos);

    if (lastAtIndex !== -1) {
      const newText = `${textAreaValue.substring(0, lastAtIndex + 1)}${user} ${textAreaValue.substring(cursorPos)}`;
      onChangeValue(newText);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showDropdown) {
      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredUsers.length);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setSelectedIndex(
            (prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length,
          );
          break;
        }
        case "Enter": {
          e.preventDefault();
          handleSelectUser(filteredUsers[selectedIndex]);
          break;
        }
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
