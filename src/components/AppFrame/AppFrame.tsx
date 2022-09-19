import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Clock from "../Clock/Clock";
import React from "react";
import BT from "../../assets/BT.png";
import Link from "@mui/material/Link";
import CalendarRouter from "../CalendarRouter/CalendarRouter";
import { useState } from "react";
import { Item } from "../../types/dataTypes";
import TopBar from "../TopBar/TopBar";
import drawerWidthSettings from "../../config/drawerWidthSettings";

const boxSx = {
  height: { xs: "28vw" },
  width: { xs: "28vw" },
  maxHeight: { xs: "250px" },
  maxWidth: { xs: "250px" },
};

const linkSx = {
  textDecoration: "unset",
  color: "black",
  fontWeight: 900,
};

interface AppFrameProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  openModal: (editedItem: Item) => void;
  refresher: number;
  refresh: () => void;
}
export default function AppFrame({
  query,
  setQuery,
  openModal,
  refresher,
  refresh,
}: AppFrameProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="70%"
        wrap="nowrap"
      >
        <Clock size="h6" />
        <Grid item>
          <Typography variant="h4" component="h4">
            Blue Calendar
          </Typography>
        </Grid>
        <Grid item>
          <Box component="img" sx={boxSx} alt="Blue Torch Logo" src={BT} />
        </Grid>
      </Grid>
      <Divider />
      <List>
        <Link href="/" sx={linkSx}>
          <ListItem key={"Today"} disablePadding>
            <ListItemButton>
              <ListItemText primary={"Today"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/events" sx={linkSx}>
          <ListItem key={"Events"} disablePadding>
            <ListItemButton>
              <ListItemText primary={"All Events"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/tasks" sx={linkSx}>
          <ListItem key={"Tasks"} disablePadding>
            <ListItemButton>
              <ListItemText primary={"All Tasks"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar query={query} setQuery={setQuery} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidthSettings.width }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidthSettings.width,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidthSettings,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "5%",
          width: drawerWidthSettings.autoWidth,
          overflowX: "scroll",
        }}
      >
        <Toolbar />
        <CalendarRouter
          openModal={openModal}
          query={query}
          refresher={refresher}
          refresh={refresh}
        />
      </Box>
    </Box>
  );
}
