import { memo } from "react";

import type { Note } from "../interfaces/interfaces";
import { NoteCard } from "./NoteCard";

interface Props {
  notes: Note[];
}

export const NotesList = memo(({ notes }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {notes.map(({ id, body }) => (
          <NoteCard key={id} id={id} body={body} />
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
    </>
  );
});
