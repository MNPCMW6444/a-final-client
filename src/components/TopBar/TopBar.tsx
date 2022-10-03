import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import blue from "@mui/material/colors/blue";
import { Dispatch } from "react";

interface TopBarProps {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<React.SetStateAction<boolean>>;
}

const appBarStyle = {
  width: drawerWidthSettings.autoWidth,
  ml: { sm: `${drawerWidthSettings.width}px` },
};

const searchBarStyle = {
  input: { color: "white" },
  backgroundColor: blue[600],
  borderRadius: "10px",
  width: "200%",
  maxWidth: "350px",
};

const openButtonStyle = { mr: 2, display: { sm: "none" } };

const TopBar = ({
  setQuery,
  query,
  drawerOpen,
  setDrawerOpen,
}: TopBarProps) => (
  <AppBar position="fixed" sx={appBarStyle}>
    <Toolbar>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={openButtonStyle}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" noWrap component="div">
            Blue Calendar
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item width="50%">
            <TextField
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setQuery(e.target.value)}
              placeholder="Search By Title..."
              value={query}
              variant="outlined"
              sx={searchBarStyle}
              autoComplete="off"
            />
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);
export default TopBar;
