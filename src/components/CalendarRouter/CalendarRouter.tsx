import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Task, Event, Item } from "../../types/dataTypes";
import columnsConfig from "../../config/columns";
import useDataProcessor from "../../utils/useDataProcessor";
import GenericTable from "../GenericTable/GenericTable";
import { ErrorBoundary } from "react-error-boundary";

interface CalendarRouterProps {
  openModal: (editedItem: Item) => void;
  query: string;
  refresher: number;
}

function ErrorFallback(
  {
    /* error, resetErrorBoundary  */
  }
) {
  return (
    <div role="alert">
      <p style={{ color: "red" }}>There is an error in this component</p>
    </div>
  );
}

const CalendarRouter = ({
  openModal,
  query,
  refresher,
}: CalendarRouterProps) => {
  const data = useDataProcessor(refresher);
  return data ? (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
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
      </ErrorBoundary>
    </Router>
  ) : (
    <p>Loading...</p>
  );
};

export default CalendarRouter;
