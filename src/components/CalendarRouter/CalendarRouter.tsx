import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import columnsConfig from "../../config/columns";
import GenericTable from "../GenericTable/GenericTable";
import { ErrorBoundary } from "react-error-boundary";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import { PageTypes } from "../../utils/enums";
import { Dispatch, SetStateAction } from "react";

interface CalendarRouterProps {
  commonProps: {
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
    searchValue: string;
    drawerOpen: boolean;
  };
}

const errorStyle = { color: "red" };

const ErrorFallback = () => (
  <Box>
    <Typography sx={errorStyle}>There is an error in this component</Typography>
  </Box>
);

const CalendarRouter = ({ commonProps }: CalendarRouterProps) => {
  const defaultElement = (
    <GenericTable
      commonProps={commonProps}
      columns={columnsConfig.get(PageTypes.today)}
      route="today"
    />
  );

  return (
    <>
      <Toolbar />
      <Router>
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
                    columns={columnsConfig.get(PageTypes.events)}
                    route="events"
                  />
                }
              />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
    </>
  );
};

export default CalendarRouter;
