import blue from "@mui/material/colors/blue";
import { Dispatch, SetStateAction } from "react";
import { Grid, InputLabel, Switch } from "@mui/material";

interface GenericQuickFilterProps {
  index: number;
  name: string;
  isActive: boolean[];
  setIsActive: Dispatch<SetStateAction<boolean[]>>;
}

const selectedStyle = (isActive: boolean) => ({
  fontSize: "1.2em",
  color: isActive ? blue[900] : "auto",
});

const GenericQuickFilter = ({
  index,
  name,
  isActive,
  setIsActive,
}: GenericQuickFilterProps) => (
  <Grid container alignItems="center">
    <Grid item>
      <InputLabel sx={selectedStyle(isActive[index])}> {name + ":"}</InputLabel>
    </Grid>
    <Grid item>
      <Switch
        onClick={() => {
          const temp = [...isActive];
          temp[index] = !temp[index];
          setIsActive(temp);
        }}
      />{" "}
    </Grid>
  </Grid>
);
export default GenericQuickFilter;
