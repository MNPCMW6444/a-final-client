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

  const [query, setQuery] = useState<string>("");

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const commonProps = {
    setDrawerOpen: setDrawerOpen,
    drawerOpen: drawerOpen,
    refresh: refresh,
    query: query,
  };

  return (
    <FormProvider refresh={refresh}>
      <ThemeProvider theme={createTheme()}>
        <ReactNotifications />
        <CssBaseline />
        <TopBar
          query={query}
          setQuery={setQuery}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
        {data && data.length > 0 && (
          <CalendarRouter commonProps={commonProps} data={data} />
        )}
      </ThemeProvider>
    </FormProvider>
  );
}

export default App;
