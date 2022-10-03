import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Item } from "../../types/index";
import { styledInputComponent } from "../hoc/styledInputComponent";

interface SelectInputProps {
  dropDownOptions: string[];
  dataKey: string;
  itemState: Item;
  setItemState: React.Dispatch<React.SetStateAction<Item>>;
}

const StyleSelect = styledInputComponent(Select);

const SelectInput = ({
  dropDownOptions,
  dataKey,
  itemState,
  setItemState,
}: SelectInputProps) => (
  <StyleSelect
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
  </StyleSelect>
);

export default SelectInput;
