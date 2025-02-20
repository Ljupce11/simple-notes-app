import { useCreateNote } from "../hooks/useCreateNote";
import { MentionTextarea } from "./MentionTextarea";

export const AddNoteForm = () => {
  const { newNoteBody, setNewNoteBody, isCreatingNote, error, createNote } =
    useCreateNote();

  const handleChangeNewNoteBody = (value: string) => {
    setNewNoteBody(value);
  };

  return (
    <div className="flex justify-center">
      <div className="w-xl bg-white shadow-md rounded-lg p-4">
        <form className="flex flex-col gap-1" onSubmit={createNote}>
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
  );
};
