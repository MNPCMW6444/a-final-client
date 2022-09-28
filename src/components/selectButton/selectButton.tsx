import Button, { ButtonProps } from "@mui/material/Button";
import blue from "@mui/material/colors/blue";

const buttonSx = (label: string, isSelected: boolean) => ({
  backgroundColor: isSelected ? blue[900] : blue[100],
  color: isSelected ? blue[100] : blue[900],
  border: "0.1vw solid " + label === "red" ? "red" : "blue",
  width: "100%",
  "&:hover": {
    backgroundColor: isSelected ? blue[900] : blue[400],
    color: isSelected ? blue[100] : blue[900],
  },
  "&:active": {
    backgroundColor: blue[900],
    color: blue[100],
  },
});

const selectButton =
  (label: string, isSelected: boolean) => (props: ButtonProps) =>
    (
      <Button {...props} sx={buttonSx(label, isSelected)}>
        {label}
      </Button>
    );
export default selectButton;
