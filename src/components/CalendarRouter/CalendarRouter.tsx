import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import columnsConfig from "../../config/columns";
import GenericPage from "../GenericPage/GenericPage";
import { ErrorBoundary } from "react-error-boundary";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import { PageTypes } from "../../utils/enums";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Item } from "../../types";
import { useDispatch } from "react-redux";
import { setAllItems } from "../../store/reducers/itemsReducer";

interface CalendarRouterProps {
  commonProps: {
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
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
    <GenericPage
      columns={columnsConfig.get(PageTypes.today)}
      commonProps={commonProps}
    />
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllItems(data));
  });

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
                  <GenericPage
                    columns={columnsConfig.get(PageTypes.tasks)}
                    commonProps={commonProps}
                  />
                }
              />
              <Route
                path={PageTypes.events}
                element={
                  <GenericPage
                    columns={columnsConfig.get(PageTypes.events)}
                    commonProps={commonProps}
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
