import Button from "@mui/material/Button";
import blue from "@mui/material/colors/blue";
import { Dispatch, SetStateAction } from "react";

interface GenericQuickFilterProps {
  index: number;
  name: string;
  isActive: boolean[];
  setIsActive: Dispatch<SetStateAction<boolean[]>>;
}

const selectedStyle = (isActive: boolean) =>
  isActive
    ? {
        backgroundColor: blue[200],
        "&:hover": { backgroundColor: blue[200] },
        "&:active": { backgroundColor: blue[200] },
      }
    : {
        backgroundColor: blue[50],
        "&:hover": { backgroundColor: blue[100] },
        "&:active": { backgroundColor: blue[100] },
      };

const GenericQuickFilter = ({
  index,
  name,
  isActive,
  setIsActive,
}: GenericQuickFilterProps) => (
  <Button
    sx={selectedStyle(isActive[index])}
    onClick={() => {
      const temp = [...isActive];
      temp[index] = !temp[index];
      setIsActive(temp);
    }}
  >
    {name}
  </Button>
);
export default GenericQuickFilter;
