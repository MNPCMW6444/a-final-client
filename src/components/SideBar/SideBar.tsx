import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Clock from "../Clock/Clock";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import Typography from "@mui/material/Typography";
import BT from "../../assets/BT.png";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PageTypes } from "../../utils/enums";
import selectButton from "../CalendarButton/CalendarButton";

import { useDispatch } from "react-redux";
import { navigate } from "../../store/reducers/itemsReducer";

interface SideBarProps {
  pageType: PageTypes;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const boxSx = {
  height: { xs: "28vw" },
  width: { xs: "28vw" },
  maxHeight: { xs: "200px" },
  maxWidth: { xs: "200px" },
};

const mobileBarSx = {
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidthSettings.width,
  },
};

const wideBarSx = {
  display: { xs: "none", sm: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidthSettings.width,
  },
};

const SideBar = ({ pageType, drawerOpen, setDrawerOpen }: SideBarProps) => {
  const navigateTo = useNavigate();
  const [selected, setSelected] = useState(pageType);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dispatch(navigate(pageType)));
  }, [dispatch, pageType]);

  const drawer = (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        height="50%"
        wrap="nowrap"
        paddingTop="10%"
      >
        <Clock />
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
          {Object.values(PageTypes).map((option, index) => {
            const SelectButton = selectButton(option, selected === option);
            return (
              <Grid key={index} item width="80%">
                <SelectButton
                  onClick={() => {
                    navigateTo("/" + option);
                    setSelected(option);
                    dispatch(navigate(option));
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </ButtonGroup>
    </>
  );

  return (
    <Box component="nav" sx={boxSx} aria-label="mailbox folders">
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={mobileBarSx}
      >
        {drawer}
      </Drawer>
      <Drawer variant="permanent" sx={wideBarSx} open>
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideBar;
