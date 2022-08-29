import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodayPage from "../TodayPage/TodayPage";
import EventsPage from "../EventsPage/EventsPage";
import TasksPage from "../TasksPage/TasksPage";

const CalendarRouter = (props: { openModal: (editedItem: any) => boolean }) => (
  <Router>
    <Routes>
      <Route path="/" element={<TodayPage openModal={props.openModal} />} />
      <Route
        path="/tasks"
        element={<TasksPage openModal={props.openModal} />}
      />

      <Route
        path="/events"
        element={<EventsPage openModal={props.openModal} />}
      />
    </Routes>
  </Router>
);

export default CalendarRouter;
