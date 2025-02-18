import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useNotes } from "../hooks/useNotes";

const apiUrl = import.meta.env.VITE_API_URL;

export const Home = () => {
  const { notes, updateAllNotes } = useNotes();
  const [isLoading, setIsLoading] = useState(notes.length === 0);
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${apiUrl}/notes`);
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        updateAllNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [updateAllNotes]);

  const handleCreateNote = async () => {
    const newNoteBody = prompt("Enter note body:");
    if (!newNoteBody) {
      return;
    }
    try {
      setIsCreatingNote(true);
      const newNote = {
        body: newNoteBody,
      };
      const response = await fetch(`${apiUrl}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      const data = await response.json();
      updateAllNotes([...notes, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingNote(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-bold text-center">My notes</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <button
          disabled={isCreatingNote}
          type="button"
          onClick={handleCreateNote}
          className="text-gray-400 bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <h2 className="text-3xl">+</h2>
          <p>Create a new note</p>
        </button>
        {notes.map(({ id, body }) => (
          <Link key={id} to={`/note/${id}`}>
            <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Note title</h2>
              <p className="text-gray-600 truncate">{body}</p>
            </div>
          </Link>
        ))}
      </div>
      {notes.length === 0 && (
        <div>
          <p className="text-center text-gray-400">No notes found</p>
          <p className="text-center text-gray-400">
            Create a new note to get started
          </p>
        </div>
      )}
    </div>
  );
};
