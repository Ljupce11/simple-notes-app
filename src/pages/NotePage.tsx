import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import { useNotes } from "../hooks/useNotes";

const apiUrl = import.meta.env.VITE_API_URL;

export const NotePage = () => {
  const { id } = useParams();
  const { getNote } = useNotes();
  const [noteBody, setNoteBody] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({
    getNote: "",
    updateNote: "",
  });
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    const noteId = Number(id);
    const cachedNote = getNote(noteId);
    if (cachedNote) {
      setNoteBody(cachedNote.body);
    } else {
      const fetchNote = async () => {
        try {
          const response = await fetch(`${apiUrl}/notes/${noteId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch note");
          }
          const data = await response.json();
          setNoteBody(data.body);
        } catch (error) {
          console.error("Failed to fetch note:", error);
          setError((prev) => ({
            ...prev,
            getNote: "Failed to fetch note",
          }));
        } finally {
          setIsLoading(false);
        }
      };
      fetchNote();
    }
  }, [getNote, id]);

  const updateNote = useCallback(
    async (body: string) => {
      try {
        setIsSaving(true);
        const response = await fetch(`${apiUrl}/notes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body }),
        });
        if (!response.ok) {
          throw new Error("Failed to update note");
        }
      } catch (error) {
        console.error("Failed to update note:", error);
        setError((prev) => ({
          ...prev,
          updateNote: "Failed to update note",
        }));
      } finally {
        setIsSaving(false);
      }
    },
    [id],
  );

  const handleNoteBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteBody(e.target.value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      updateNote(noteBody);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (error.getNote) {
    return (
      <div className="flex flex-col gap-4 bg-red-200 p-4 rounded-lg max-w-2xl mx-auto">
        <p className="text-red-800">{error.getNote}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Note title</h1>
        {isSaving && <p className="text-sm text-gray-500">Saving...</p>}
        {error.updateNote && (
          <p className="text-sm text-red-500">{error.updateNote}</p>
        )}
      </div>
      <textarea
        rows={10}
        className="w-full h-full resize-none border-2 border-gray-300 rounded-lg p-2"
        value={noteBody}
        onChange={handleNoteBodyChange}
      />
    </div>
  );
};
