import Button, { ButtonProps } from "@mui/material/Button";
import blue from "@mui/material/colors/blue";

const buttonSx = (thisOption: string, selectedOption: string) => ({
  backgroundColor: selectedOption === thisOption ? blue[900] : blue[100],
  color: selectedOption === thisOption ? blue[100] : blue[900],
  border: "0.1vw solid " + thisOption === "red" ? "red" : "blue",
  width: "100%",
  "&:hover": {
    backgroundColor: selectedOption === thisOption ? blue[900] : blue[400],
    color: selectedOption === thisOption ? blue[100] : blue[900],
  },
  "&:active": {
    backgroundColor: blue[900],
    color: blue[100],
  },
});

const selectButton =
  (thisOption: string, selectedOption: string) => (props: ButtonProps) =>
    (
      <Button {...props} sx={buttonSx(thisOption, selectedOption)}>
        {thisOption}
      </Button>
    );
export default selectButton;
