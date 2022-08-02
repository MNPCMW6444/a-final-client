import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Today from "./pages/Today";
import Tasks from "./pages/Tasks";
import Events from "./pages/Events";
import "./Body.css";

export default function Body() {
  return (
    <div className="body">
      <Router>
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
    </div>
  );
}
