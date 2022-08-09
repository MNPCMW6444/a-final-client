import Button, { ButtonPropsColorOverrides } from "@mui/material/Button";
import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from "@mui/material/styles";
import { Stack } from "@mui/material";

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
    selected: createColor("#ff800081"),
    unselected: createColor("#ff8000d1"),
  },
});

export default function CustomStyles() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" gap={0.1}>
        <Button color="selected" variant="contained" className="selector">
          Task
        </Button>
        <Button color="unselected" variant="contained" className="selector">
          Event
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
