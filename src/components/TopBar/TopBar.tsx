import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBar from "@mkyy/mui-search-bar";
import IconButton from "@mui/material/IconButton";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Typography from "@mui/material/Typography";

interface TopBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function TopBar({ setQuery, query }: TopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: drawerWidthSettings.autoWidth,
        ml: { sm: `${drawerWidthSettings.width}px` },
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
}
