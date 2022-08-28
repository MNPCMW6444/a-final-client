import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenericPage from "../GenericPage/GenericPage";
import TasksPage from "../TasksPage/TasksPage";
import EventsPage from "../EventsPage/EventsPage";

const CalendarRouter = (props: { openModal: (editedItem: any) => boolean }) => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <GenericPage openModal={props.openModal} type="all" time="today" />
        }
      />
      <Route
        path="/tasks"
        element={
          <TasksPage openModal={props.openModal} type="tasks" time="all" />
        }
      />
      <Route
        path="/events"
        element={
          <EventsPage openModal={props.openModal} type="events" time="all" />
        }
      />
    </Routes>
  </Router>
);

export default CalendarRouter;
