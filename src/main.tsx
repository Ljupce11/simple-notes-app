import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { NotesProvider } from "./context/NotesProvider.tsx";
import { UsersProvider } from "./context/UsersProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </UsersProvider>
    </BrowserRouter>
  </StrictMode>,
);
