import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenericPage from "../GenericPage/GenericPage";
import { Task, Event, Item } from "../../types/dataTypes";
import columnsConfig from "../../config/columns";
import otherColumnConfig from "../../config/otherColumn";
import { data } from "./dataProcessor";

interface CalendarRouterProps {
  openModal: (editedItem: Item) => boolean;
}

const CalendarRouter = (props: CalendarRouterProps) => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <GenericPage
            openModal={props.openModal}
            data={[...data.events, ...data.tasks].filter((item: Item) =>
              item.type === "Task"
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
