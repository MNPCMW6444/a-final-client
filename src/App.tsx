import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import PageRouter from "./components/PageRouter";
import BlueLogo from "./components/sidebarComponents/BlueLogo";
import ApplicationTitle from "./components/sidebarComponents/ApplicationTitle";
import Clock from "./components/sidebarComponents/Clock";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material";

const { Sidebar, SidebarItem } = require("react-responsive-sidebar");

function App() {
  const pages = [
    <SidebarItem>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="40vh"
      >
        <Clock />
        <ApplicationTitle />
        <BlueLogo />
      </Grid>
    </SidebarItem>,
    <SidebarItem href="/">Today</SidebarItem>,
    <SidebarItem href="/tasks">All Tasks</SidebarItem>,
    <SidebarItem href="/events">All Events</SidebarItem>,
  ];

  return (
    <>
      <ThemeProvider theme={createTheme()}>
        <ReactNotifications />
        <Sidebar content={pages} background={"orange"} color={"blue"}>
          <PageRouter />
        </Sidebar>
      </ThemeProvider>
    </>
  );
}

export default App;
