import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Item } from "./types/index";
import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";
import { FormProvider } from "./context/FormContext";
import useDataProcessor from "./hooks/useDataProcessor";

function App() {
  const {
    data,
    refresh,
  }: { data: Item[]; refresh: () => Promise<() => void> } = useDataProcessor();

  const [searchValue, setSearchValue] = useState<string>("");

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const commonProps = {
    setDrawerOpen: setDrawerOpen,
    drawerOpen: drawerOpen,
    refresh: refresh,
    searchValue: searchValue,
  };

  return (
    <FormProvider refresh={refresh}>
      <ThemeProvider theme={createTheme()}>
        <ReactNotifications />
        <CssBaseline />
        <TopBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
        <ShowIf show={data && data.length > 0}>
          <CalendarRouter commonProps={commonProps} data={data} />
        </ShowIf>
      </ThemeProvider>
    </FormProvider>
  );
}

const ShowIf = ({ show, children }: { show: boolean; children: JSX.Element }) =>
  show ? children : <></>;

export default App;
