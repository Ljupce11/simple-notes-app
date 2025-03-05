import { memo } from "react";
import { Link } from "react-router";

interface Props {
  id: number;
  body: string;
}

export const NoteCard = memo(({ id, body }: Props) => (
  <Link to={`/note/${id}`}>
    <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow h-full">
      <h2 className="text-lg font-semibold mb-2">Note title</h2>
      <p className="text-gray-500 truncate">{body}</p>
    </div>
  </Link>
));
