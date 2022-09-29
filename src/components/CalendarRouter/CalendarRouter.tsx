import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Task, Event, Item } from "../../types/dataTypes";
import columnsConfig from "../../config/columns";
import useDataProcessor from "../../utils/useDataProcessor";
import GenericTable from "../GenericTable/GenericTable";
import { ErrorBoundary } from "react-error-boundary";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import { ItemTypes, PageTypes } from "../../utils/enums";
import { Dispatch, SetStateAction } from "react";

interface CalendarRouterProps {
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  openModal: (editedItem: Item) => void;
  query: string;
  refresher: number;
  refresh: () => void;
  drawerOpen: boolean;
}

const errorStyle = { color: "red" };

const ErrorFallback = () => (
  <Box>
    <Typography sx={errorStyle}>There is an error in this component</Typography>
  </Box>
);

const CalendarRouter = ({
  setDrawerOpen,
  openModal,
  query,
  refresher,
  refresh,
  drawerOpen,
}: CalendarRouterProps) => {
  const data = useDataProcessor(refresher);

  const defaultElement = (
    <GenericTable
      setDrawerOpen={setDrawerOpen}
      drawerOpen={drawerOpen}
      refresh={refresh}
      query={query}
      openModal={openModal}
      data={(data as Item[]).filter((item: Item) =>
        item.type === ItemTypes.task
          ? (item as Task).untilDate.substring(0, 9) ===
            new Date().toLocaleString().substring(0, 9)
          : (item as Event).beginningTime.substring(0, 9) ===
            new Date().toLocaleString().substring(0, 9)
      )}
      columns={columnsConfig.get(PageTypes.today)}
      route="today"
    />
  );

  return (
    <>
      <Toolbar />
      <Router>
        {data.length > 0 ? (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
            <Routes>
              <Route path="/">
                <Route path="/" element={defaultElement} />
                <Route path="*" element={defaultElement} />
                <Route
                  path={PageTypes.tasks}
                  element={
                    <GenericTable
                      setDrawerOpen={setDrawerOpen}
                      drawerOpen={drawerOpen}
                      refresh={refresh}
                      query={query}
                      openModal={openModal}
                      data={(data as Item[]).filter(
                        (item: Item) => item.type === ItemTypes.task
                      )}
                      columns={columnsConfig.get(PageTypes.tasks)}
                      route="tasks"
                    />
                  }
                />
                <Route
                  path={PageTypes.events}
                  element={
                    <GenericTable
                      setDrawerOpen={setDrawerOpen}
                      drawerOpen={drawerOpen}
                      refresh={refresh}
                      query={query}
                      openModal={openModal}
                      data={(data as Item[]).filter(
                        (item: Item) => item.type === ItemTypes.event
                      )}
                      columns={columnsConfig.get(PageTypes.events)}
                      route="events"
                    />
                  }
                />
              </Route>
            </Routes>
          </ErrorBoundary>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Router>
    </>
  );
};

export default CalendarRouter;
