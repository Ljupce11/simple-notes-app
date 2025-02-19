import { Link } from "react-router";

import { MentionTextarea } from "../components/MentionTextarea";
import { useCreateNote } from "../hooks/useCreateNote";
import { useFetchNotes } from "../hooks/useFetchNotes";

export const Home = () => {
  const { notes, isFetchingNotes } = useFetchNotes();
  const { newNoteBody, setNewNoteBody, isCreatingNote, error, createNote } =
    useCreateNote();

  const handleChangeNewNoteBody = (value: string) => {
    setNewNoteBody(value);
  };

  if (isFetchingNotes) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Fetching notes...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-bold text-center">My notes</p>
      <div className="flex justify-center">
        <div className="w-xl bg-white shadow-md rounded-lg p-4">
          <form className="flex flex-col gap-4" onSubmit={createNote}>
            <MentionTextarea
              rows={5}
              disabled={isCreatingNote}
              value={newNoteBody}
              onChangeValue={handleChangeNewNoteBody}
            />
            {error && <p className="text-red-500">{error}</p>}
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
