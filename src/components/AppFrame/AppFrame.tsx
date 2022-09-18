import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
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
import SearchBar from "@mkyy/mui-search-bar";

const drawerWidth = 240;
const autoWidth = { sm: `calc(100% - ${drawerWidth}px)` };

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
}
export default function AppFrame({
  query,
  setQuery,
  openModal,
  refresher,
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

  const topBar = (
    <AppBar
      position="fixed"
      sx={{
        width: autoWidth,
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          wrap="nowrap"
          spacing={5}
        >
          <Grid item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" noWrap component="div">
              Blue Calendar
            </Typography>
          </Grid>
          <Grid item>
            <SearchBar
              placeholder="Search By Title..."
              value={query}
              style={{ color: "black" }}
              width="100%"
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {topBar}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
              width: drawerWidth,
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
              width: drawerWidth,
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
          width: autoWidth,
          overflowX: "scroll",
        }}
      >
        <Toolbar />
        <CalendarRouter
          openModal={openModal}
          query={query}
          refresher={refresher}
        />
      </Box>
    </Box>
  );
}
