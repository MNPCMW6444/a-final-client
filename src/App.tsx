import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";
import { FormProvider } from "./context/FormContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, getItemsStatus } from "./store/reducers";

function App() {
  const [searchValue, setSearchValue] = useState<string>("");

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const commonProps = {
    setDrawerOpen: setDrawerOpen,
    drawerOpen: drawerOpen,
    searchValue: searchValue,
  };

  const itemstatus = useSelector(getItemsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (itemstatus === "idle") {
      dispatch(fetchData() as any);
    }
  }, [itemstatus, dispatch]);

  return (
    <FormProvider>
      <ThemeProvider theme={createTheme()}>
        <ReactNotifications />
        <CssBaseline />
        <TopBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
        <CalendarRouter commonProps={commonProps} />
      </ThemeProvider>
    </FormProvider>
  );
}
/* 
const ShowIf = ({ show, children }: { show: boolean; children: JSX.Element }) =>
  show ? children : <></>; */

export default App;
