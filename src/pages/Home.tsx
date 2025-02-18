import { useState } from "react";
import { Link } from "react-router";

// const apiUrl = import.meta.env.VITE_API_URL;

export const Home = () => {
  const [notes] = useState<any[]>([
    {
      id: 1,
      title: "Note 1",
      content: "Content 1",
    },
    {
      id: 2,
      title: "Note 2",
      content: "Content 2",
    },
  ]);
  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       const response = await fetch(`${apiUrl}/notes`);
  //       const data = await response.json();
  //       setNotes(data);
  //     } catch (error) {
  //       console.error("Error loading notes:", error);
  //     }
  //   };
  //   fetchNotes();
  // }, []);

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-bold text-center">My notes</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="text-gray-400 bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow text-center">
          <h2 className="text-3xl">+</h2>
          <p>Create a new note</p>
        </div>
        {notes.map(({ id, title, content }) => (
          <Link key={id} to={`/notes/${id}`}>
            <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-600 truncate">{content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
