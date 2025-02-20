import { useParams } from "react-router";

import { MentionTextarea } from "../components/MentionTextarea";
import { NoteHeader } from "../components/NoteHeader";
import { useDebounce } from "../hooks/useDebounce";
import { useFetchSingleNote } from "../hooks/useFetchSingleNote";
import { useSaveNote } from "../hooks/useSaveNote";

export const NotePage = () => {
  const { id } = useParams();
  const { saveNote, isSaving, error: saveError } = useSaveNote(id);
  const debouncedUpdateNote = useDebounce(saveNote, 700);
  const { noteBody, setNoteBody, isLoading, fetchNoteError } =
    useFetchSingleNote(id);

  const handleNoteBodyChange = (value: string) => {
    setNoteBody(value);
    debouncedUpdateNote(value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (fetchNoteError) {
    return (
      <div className="flex flex-col gap-4 bg-red-200 p-4 rounded-lg max-w-2xl mx-auto">
        <p className="text-red-800">{fetchNoteError}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg max-w-2xl mx-auto">
      <NoteHeader isSaving={isSaving} saveError={saveError} />
      <MentionTextarea value={noteBody} onChangeValue={handleNoteBodyChange} />
    </div>
  );
};
