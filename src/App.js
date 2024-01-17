import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tickets from "./components/pages/Tickets";
import Agents from "./components/pages/Agents";
import "tailwindcss/tailwind.css";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/" element={<Agents />} />
      </Routes>
    </Router>
  );
}

export default App;
