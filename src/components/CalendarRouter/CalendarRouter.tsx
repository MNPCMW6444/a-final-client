import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Task, Event, Item } from "../../types/dataTypes";
import columnsConfig from "../../config/columns";
import useDataProcessor from "../../utils/useDataProcessor";
import GenericTable from "../GenericTable/GenericTable";

interface CalendarRouterProps {
  openModal: (editedItem: Item) => boolean;
  query: string;
}

const CalendarRouter = ({ openModal, query }: CalendarRouterProps) => {
  const data = useDataProcessor();
  debugger;
  return data ? (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <GenericTable
              query={query}
              openModal={openModal}
              data={[...data.events, ...data.tasks].filter((item: Item) =>
                item.type === "Task"
                  ? (item as Task).untilDate.substring(0, 9) ===
                    new Date().toLocaleString().substring(0, 9)
                  : (item as Event).beginningTime.substring(0, 9) ===
                    new Date().toLocaleString().substring(0, 9)
              )}
              columns={columnsConfig.get("today")}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <GenericTable
              query={query}
              openModal={openModal}
              data={data.tasks}
              columns={columnsConfig.get("tasks")}
            />
          }
        />
        <Route
          path="/events"
          element={
            <GenericTable
              query={query}
              openModal={openModal}
              data={data.events}
              columns={columnsConfig.get("events")}
            />
          }
        />
      </Routes>
    </Router>
  ) : (
    <p>Loading...</p>
  );
};

export default CalendarRouter;
