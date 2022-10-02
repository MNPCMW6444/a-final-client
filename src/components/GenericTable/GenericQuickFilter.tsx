import Button from "@mui/material/Button";
import blue from "@mui/material/colors/blue";
import { Dispatch, SetStateAction } from "react";

interface GenericQuickFilterProps {
  index: number;
  name: string;
  isActive: boolean[];
  setIsActive: Dispatch<SetStateAction<boolean[]>>;
}

const selectedStyle = { backgroundColor: blue[100] };

const GenericQuickFilter = ({
  index,
  name,
  isActive,
  setIsActive,
}: GenericQuickFilterProps) => (
  <Button
    sx={isActive[index] ? selectedStyle : undefined}
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
