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
import { Typography } from "@mui/material";
import { ItemTypes, PageTypes } from "../../utils/enums";

interface CalendarRouterProps {
  openModal: (editedItem: Item) => void;
  query: string;
  refresher: number;
  refresh: () => void;
}

const errorStyle = { color: "red" };

const navigationStyle = {
  width: { sm: drawerWidthSettings.width },
  flexShrink: { sm: 0 },
};

const ErrorFallback = () => (
  <Box>
    <Typography sx={errorStyle}>There is an error in this component</Typography>
  </Box>
);

const CalendarRouter = ({
  openModal,
  query,
  refresher,
  refresh,
}: CalendarRouterProps) => {
  const data = useDataProcessor(refresher);
  return (
    <>
      <Toolbar />
      <Router>
        {data ? (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
            <Routes>
              <Route path="/">
                <Route
                  path="*"
                  element={
                    <GenericTable
                      refresh={refresh}
                      query={query}
                      openModal={openModal}
                      data={[...data.events, ...data.tasks].filter(
                        (item: Item) =>
                          item.type === ItemTypes.task
                            ? (item as Task).untilDate.substring(0, 9) ===
                              new Date().toLocaleString().substring(0, 9)
                            : (item as Event).beginningTime.substring(0, 9) ===
                              new Date().toLocaleString().substring(0, 9)
                      )}
                      columns={columnsConfig.get(PageTypes.today)}
                    />
                  }
                />
                <Route
                  path={PageTypes.tasks}
                  element={
                    <GenericTable
                      refresh={refresh}
                      query={query}
                      openModal={openModal}
                      data={data.tasks}
                      columns={columnsConfig.get(PageTypes.tasks)}
                    />
                  }
                />
                <Route
                  path={PageTypes.events}
                  element={
                    <GenericTable
                      refresh={refresh}
                      query={query}
                      openModal={openModal}
                      data={data.events}
                      columns={columnsConfig.get(PageTypes.events)}
                    />
                  }
                />
              </Route>
            </Routes>
          </ErrorBoundary>
        ) : (
          <Typography>Loading...</Typography>
        )}
        <Box component="nav" sx={navigationStyle}>
          <SideBar />
        </Box>
      </Router>
    </>
  );
};

export default CalendarRouter;
