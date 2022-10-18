import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useContext, useState } from "react";
import { Item } from "./types/index";
import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";
import useDataProcessor from "./hooks/useDataProcessor";
import FormContext from "./context/FormContext";

function App() {
  const [query, setQuery] = useState<string>("");

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const { data }: { data: Item[] } = useDataProcessor();

  const commonProps = {
    setDrawerOpen: setDrawerOpen,
    drawerOpen: drawerOpen,
    query: query,
  };

  const { form } = useContext(FormContext);

  return (
    <ThemeProvider theme={createTheme()}>
      <ReactNotifications />
      <> {form}</>
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
  );
}

export default App;
