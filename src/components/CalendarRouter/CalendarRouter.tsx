import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenericPage from "../GenericPage/GenericPage";
import jsonData from "../../assets/mock.json";
import { Task, Event, Item } from "../../types/dataTypes";
import columnsConfig from "../../config/columns";

interface CalendarRouterProps {
  openModal: (editedItem: any) => boolean;
}

const jsonEvents = jsonData.events;
const jsonTasks = jsonData.tasks;
let parsedEvents: any[];
parsedEvents = jsonEvents.map((event: any) => {
  event.beginningTime = new Date(event.beginningTime);
  event.endingTime = new Date(event.endingTime);
  event.notificationDate = new Date(event.notificationDate);
  return event;
});
let parsedTasks: any[];
parsedTasks = jsonTasks.map((task: any) => {
  task.untilDate = new Date(task.untilDate);
  return task;
});
const data = {
  events: jsonEvents as Item[],
  tasks: jsonTasks as Item[],
};

const CalendarRouter = (props: CalendarRouterProps) => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <GenericPage
            openModal={props.openModal}
            data={[...data.events, ...data.tasks].filter((item) =>
              (item as Task).priority
                ? (item as Task).untilDate.toISOString().substring(0, 9) ===
                  new Date().toISOString().substring(0, 9)
                : (item as Event).beginningTime
                    .toISOString()
                    .substring(0, 9) ===
                  new Date().toISOString().substring(0, 9)
            )}
            columns={columnsConfig.today}
          />
        }
      />
      <Route
        path="/tasks"
        element={
          <GenericPage
            openModal={props.openModal}
            data={data.tasks}
            columns={columnsConfig.tasks}
          />
        }
      />

      <Route
        path="/events"
        element={
          <GenericPage
            openModal={props.openModal}
            data={data.events}
            columns={columnsConfig.events}
          />
        }
      />
    </Routes>
  </Router>
);

export default CalendarRouter;
