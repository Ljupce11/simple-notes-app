import { AddNoteForm } from "../components/AddNoteForm";
import { NotesList } from "../components/NotesList";
import { useFetchNotes } from "../hooks/useFetchNotes";

export const Home = () => {
  const { notes, isFetchingNotes } = useFetchNotes();

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
      <AddNoteForm />
      <NotesList notes={notes} />
    </div>
  );
};
