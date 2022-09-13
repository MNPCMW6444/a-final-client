import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, ThemeProvider } from "@mui/material";

import { useState } from "react";

import AppFrame from "./components/AppFrame/AppFrame";

function App() {
  const [query, setQuery] = useState<string>("");

  return (
    <ThemeProvider theme={createTheme()}>
      <ReactNotifications />
      <AppFrame query={query} setQuery={setQuery} />
    </ThemeProvider>
  );
}

export default App;
