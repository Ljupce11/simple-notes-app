import { Link } from "react-router";

import type { Note } from "../interfaces/interfaces";

type Props = {
  notes: Note[];
};

export const NotesList = ({ notes }: Props) => {
  return (
    <>
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
    </>
  );
};
