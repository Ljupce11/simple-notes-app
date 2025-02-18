import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useNotes } from "../hooks/useNotes";

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrlWithSession = import.meta.env.VITE_API_URL_WITH_SESSION;
export const Home = () => {
  const { notes, updateAllNotes } = useNotes();
  const [isLoading, setIsLoading] = useState(notes.length === 0);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteBody, setNewNoteBody] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${apiUrlWithSession}/notes`);
        // const response2 = await fetch(`${apiUrl}/users`);
        // console.log(response2);

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

  const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsCreatingNote(true);
      const newNote = {
        body: newNoteBody,
      };
      const response = await fetch(`${apiUrlWithSession}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      const data = await response.json();
      updateAllNotes([...notes, data]);
      setNewNoteBody("");
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
      <div className="flex justify-center">
        <div className="w-xl bg-white shadow-md rounded-lg p-4">
          <form className="flex flex-col gap-4" onSubmit={handleCreateNote}>
            <textarea
              id="new-note-body"
              name="new-note-body"
              aria-label="New note body"
              placeholder="Enter your note here..."
              className="border border-gray-300 rounded-lg w-full h-32 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isCreatingNote}
              value={newNoteBody}
              required
              onChange={(e) => setNewNoteBody(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isCreatingNote}
            >
              {isCreatingNote ? "Adding note..." : "Add note"}
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map(({ id, body }) => (
          <Link key={id} to={`/note/${id}`}>
            <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
              <h2 className="text-lg font-semibold mb-2">Note title</h2>
              <p className="text-gray-500 truncate">{body}</p>
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
