import { Route, Routes } from "react-router";

import { Home } from "./pages/Home";
import { NotePage } from "./pages/NotePage";

function App() {
  return (
    <div className="p-4 lg:p-10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </div>
  );
}

export default App;
