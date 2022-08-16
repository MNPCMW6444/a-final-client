import Button from "@mui/material/Button";
import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from "@mui/material/styles";
import { Stack } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

declare module "@mui/material/styles" {
  interface CustomPalette {
    unselected: PaletteColorOptions;
    selected: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    selected: true;
    unselected: true;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    unselected: createColor("#ff800081"),
    selected: createColor("#ff8000d1"),
  },
});

const Selectors = (props: {
  itemType: string;
  setItemType: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" gap={0.1}>
        <Button
          color={props.itemType === "Task" ? "selected" : "unselected"}
          variant="contained"
          className="selector"
          onClick={() => props.setItemType("Task")}
        >
          Task
        </Button>
        <Button
          color={props.itemType === "Event" ? "selected" : "unselected"}
          variant="contained"
          className="selector"
          onClick={() => props.setItemType("Event")}
        >
          Event
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default Selectors;
