import { Route, Routes } from "react-router";

import { Home } from "./pages/Home";

function App() {
  return (
    <div className="h-screen bg-blue-100 p-10">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
