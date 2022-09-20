import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Clock from "../Clock/Clock";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import BT from "../../assets/BT.png";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState } from "react";

const boxSx = {
  height: { xs: "28vw" },
  width: { xs: "28vw" },
  maxHeight: { xs: "250px" },
  maxWidth: { xs: "250px" },
};

const SideBar = ({ mobileOpen }: { mobileOpen: boolean }) => {
  const navigateTo = useNavigate();

  const [selected, setSelected] = useState("today");

  const buttonSx = (id: string) => ({
    border: "0.5rem solid white",
    backgroundColor: selected === id ? blue[300] : blue[100],
    color: blue[900],
    width: "200px",
  });

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
        justifyContent="flex-start"
        alignItems="center"
        height="50%"
        wrap="nowrap"
        paddingTop="10%"
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
      <ButtonGroup variant="contained">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Button
              sx={buttonSx("today")}
              onClick={() => {
                navigateTo("/today");
                setSelected("today");
              }}
            >
              Today
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={buttonSx("events")}
              onClick={() => {
                navigateTo("/events");
                setSelected("events");
              }}
            >
              Events
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={buttonSx("tasks")}
              onClick={() => {
                navigateTo("/tasks");
                setSelected("tasks");
              }}
            >
              Tasks
            </Button>
          </Grid>
        </Grid>
      </ButtonGroup>
    </Drawer>
  );
};

export default SideBar;
