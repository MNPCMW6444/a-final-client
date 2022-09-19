import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Clock from "../Clock/Clock";
import Link from "@mui/material/Link";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import Typography from "@mui/material/Typography";

import BT from "../../assets/BT.png";

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

export default function SideBar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidthSettings.width,
        },
      }}
      open
    >
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
    </Drawer>
  );
}
