import { memo } from "react";
import { Link } from "react-router";

import { ChevronLeftIcon } from "../icons/ChevronLeftIcon";

type Props = {
  isSaving: boolean;
  saveError: string;
};

export const NoteHeader = memo(({ isSaving, saveError }: Props) => {
  return (
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
  );
});
