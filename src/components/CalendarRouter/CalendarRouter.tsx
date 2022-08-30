import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenericPage from "../GenericPage/GenericPage";
import data from "../../assets/mock.json";
import { Task, Event } from "../../types/dataTypesInterfaces";
import columnsConfig from "../../config/columns";

interface CalendarRouterProps {
  openModal: (editedItem: any) => boolean;
}

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
                  new Date().toISOString().substring(0, 9)
                : (item as Event).beginningTime.substring(0, 9) ===
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
