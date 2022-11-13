import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";
import { FormProvider } from "./context/FormContext";

const colorMap = new Map();
colorMap.set("Red", "🔴");
colorMap.set("Orange", "🟠");
colorMap.set("Yellow", "🟡");
colorMap.set("Green", "🟢");
colorMap.set("Blue", "🔵");
colorMap.set("Purple", "🟣");
colorMap.set("Black", "⚫️");
colorMap.set("White", "⚪️");
colorMap.set("Brown", "🟤");

function App() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const commonProps = {
    setDrawerOpen: setDrawerOpen,
    drawerOpen: drawerOpen,
  };

  return (
    <FormProvider>
      <ThemeProvider theme={createTheme()}>
        <ReactNotifications />
        <CssBaseline />
        <TopBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <CalendarRouter commonProps={commonProps} />
      </ThemeProvider>
    </FormProvider>
  );
}

export default App;
