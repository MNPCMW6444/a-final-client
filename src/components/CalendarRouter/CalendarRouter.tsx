import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenericPage from "../GenericPage/GenericPage";

const CalendarRouter = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenericPage type="all" time="today" />} />
        <Route
          path="/tasks"
          element={<GenericPage type="tasks" time="all" />}
        />
        <Route
          path="/events"
          element={<GenericPage type="events" time="all" />}
        />
      </Routes>
    </Router>
  );
};

export default CalendarRouter;
