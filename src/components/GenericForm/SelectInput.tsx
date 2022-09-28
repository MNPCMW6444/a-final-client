import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Item } from "../../types/dataTypes";

interface SelectInputProps {
  dropDownOptions: string[];
  dataKey: string;
  itemState: Item;
  setItemState: React.Dispatch<React.SetStateAction<Item>>;
}

const fieldStyle = { width: "70%", marginLeft: "12%" };

const SelectInput = ({
  dropDownOptions,
  dataKey,
  itemState,
  setItemState,
}: SelectInputProps) => (
  <Select
    sx={fieldStyle}
    value={itemState[dataKey as keyof Item]}
    onChange={(e) => {
      const tempItem = { ...itemState };
      tempItem[dataKey as keyof Item] = e.target.value as string;
      setItemState(tempItem);
    }}
  >
    {dropDownOptions.map((option: string) => (
      <MenuItem value={option}>{option}</MenuItem>
    ))}
  </Select>
);

export default SelectInput;
