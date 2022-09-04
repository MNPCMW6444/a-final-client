import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenericPage from "../GenericPage/GenericPage";
import jsonData from "../../assets/mock.json";
import { Task, Event, Item } from "../../types/dataTypes";
import columnsConfig from "../../config/columns";
import otherColumnConfig from "../../config/otherColumn";

interface CalendarRouterProps {
  openModal: (editedItem: Item) => boolean;
}

const jsonEvents = jsonData.events;
const jsonTasks = jsonData.tasks;
let parsedEvents: Event[];
parsedEvents = jsonEvents.map((event: any) => {
  event.beginningTime = new Date(event.beginningTime).toLocaleString();
  event.endingTime = new Date(event.endingTime).toLocaleString();
  event.notificationDate = new Date(event.notificationDate).toLocaleString();
  event.type = "Event";
  return event;
});
let parsedTasks: Task[];
parsedTasks = jsonTasks.map((task: any) => {
  task.untilDate = new Date(task.untilDate).toLocaleString();
  task.type = "Task";
  return task;
});
const data = {
  events: parsedEvents as Event[],
  tasks: parsedTasks as Task[],
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
                ? (item as Task).untilDate.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
                : (item as Event).beginningTime.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
            )}
            columns={columnsConfig.today}
            otherColumn={otherColumnConfig}
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
            otherColumn={otherColumnConfig}
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
            otherColumn={otherColumnConfig}
          />
        }
      />
    </Routes>
  </Router>
);

export default CalendarRouter;
