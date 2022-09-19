import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Task, Event, Item } from "../../types/dataTypes";
import columnsConfig from "../../config/columns";
import useDataProcessor from "../../utils/useDataProcessor";
import GenericTable from "../GenericTable/GenericTable";
import { ErrorBoundary } from "react-error-boundary";
import Box from "@mui/material/Box";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import Toolbar from "@mui/material/Toolbar";
import SideBar from "../SideBar/SideBar";

interface CalendarRouterProps {
  openModal: (editedItem: Item) => void;
  query: string;
  refresher: number;
  refresh: () => void;
}

function ErrorFallback() {
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
  refresh,
}: CalendarRouterProps) => {
  const data = useDataProcessor(refresher);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "5%",
          width: drawerWidthSettings.autoWidth,
          overflowX: "scroll",
        }}
      >
        {data ? (
          <>
            <Toolbar />
            <Router>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {}}
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <GenericTable
                        refresh={refresh}
                        query={query}
                        openModal={openModal}
                        data={[...data.events, ...data.tasks].filter(
                          (item: Item) =>
                            item.type === "Task"
                              ? (item as Task).untilDate.substring(0, 9) ===
                                new Date().toLocaleString().substring(0, 9)
                              : (item as Event).beginningTime.substring(
                                  0,
                                  9
                                ) ===
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
                        refresh={refresh}
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
                        refresh={refresh}
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
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Box>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidthSettings.width }, flexShrink: { sm: 0 } }}
      >
        <SideBar />
      </Box>
    </>
  );
};

export default CalendarRouter;
