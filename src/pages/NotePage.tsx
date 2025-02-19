import { Link, useParams } from "react-router";

import { MentionTextarea } from "../components/MentionTextarea";
import { useDebounce } from "../hooks/useDebounce";
import { useFetchSingleNote } from "../hooks/useFetchSingleNote";
import { useSaveNote } from "../hooks/useSaveNote";
import { ChevronLeftIcon } from "../icons/ChevronLeftIcon";

export const NotePage = () => {
  const { id } = useParams();
  const { noteBody, setNoteBody, isLoading, fetchNoteError } =
    useFetchSingleNote(id);
  const { saveNote, isSaving, error: saveError } = useSaveNote(id);

  const debouncedUpdateNote = useDebounce(saveNote, 1000);

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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm p-1.5"
          >
            <ChevronLeftIcon />
          </Link>
          <h2 className="text-2xl font-bold">Edit note</h2>
        </div>
        {isSaving && <p className="text-sm text-gray-500">Saving...</p>}
        {saveError && <p className="text-sm text-red-500">{saveError}</p>}
      </div>
      <MentionTextarea value={noteBody} onChangeValue={handleNoteBodyChange} />
    </div>
  );
};
