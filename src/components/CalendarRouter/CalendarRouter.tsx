import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Task, Event, Item } from "../../types/index";
import columnsConfig from "../../config/columns";
import GenericTable from "../GenericTable/GenericTable";
import { ErrorBoundary } from "react-error-boundary";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import { ItemTypes, PageTypes } from "../../utils/enums";
import { Dispatch, SetStateAction } from "react";

interface CalendarRouterProps {
  commonProps: {
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
    query: string;
    drawerOpen: boolean;
  };
  data: Item[];
}

const errorStyle = { color: "red" };

const ErrorFallback = () => (
  <Box>
    <Typography sx={errorStyle}>There is an error in this component</Typography>
  </Box>
);

const CalendarRouter = ({ commonProps, data }: CalendarRouterProps) => {
  const defaultElement = (
    <GenericTable
      commonProps={commonProps}
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
                      commonProps={commonProps}
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
                      commonProps={commonProps}
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
