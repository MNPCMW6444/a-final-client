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
import { PageTypes } from "../../utils/enums";
import selectButton from "../selectButton/selectButton";

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
    width: "200px",
    backgroundColor: selected === id ? blue[900] : blue[100],
    color: selected === id ? blue[100] : blue[900],
    "&:hover": {
      backgroundColor: selected === id ? blue[900] : blue[400],
      color: selected === id ? blue[100] : blue[900],
    },
    "&:active": {
      backgroundColor: blue[900],
      color: blue[100],
    },
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
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          height="20vh"
        >
          {Object.values(PageTypes).map((option) => {
            const SelectButton = selectButton(option, selected);
            return (
              <Grid item width="80%">
                <SelectButton
                  onClick={() => {
                    navigateTo("/" + option);
                    setSelected(option);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </ButtonGroup>
    </Drawer>
  );
};

export default SideBar;
