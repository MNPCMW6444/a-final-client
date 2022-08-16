import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import CalanderRouter from "./components/CalendarRouter/CalendarRouter";
import Clock from "./components/Clock/Clock";
import Grid from "@mui/material/Grid";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import BT from "./assets/BT.png";

const { Sidebar, SidebarItem } = require("react-responsive-sidebar");

function App() {
  const pages = [
    <SidebarItem>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="40%"
      >
        <Clock size="h6" />
        <Typography variant="h4" component="h4">
          Blue Calendar
        </Typography>
        <Box
          component="img"
          sx={{
            height: { xs: "28vw" },
            width: { xs: "28vw" },
            maxHeight: { xs: "250px" },
            maxWidth: { xs: "250px" },
          }}
          alt="Blue Torch Logo"
          src={BT}
        />
      </Grid>
    </SidebarItem>,
    <SidebarItem href="/">Today</SidebarItem>,
    <SidebarItem href="/tasks">All Tasks</SidebarItem>,
    <SidebarItem href="/events">All Events</SidebarItem>,
  ];

  return (
    <ThemeProvider theme={createTheme()}>
      <ReactNotifications />
      <Sidebar content={pages} background={"orange"} color={"blue"}>
        <CalanderRouter />
      </Sidebar>
    </ThemeProvider>
  );
}

export default App;
