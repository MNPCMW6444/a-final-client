import OutlinedInput from "@mui/material/OutlinedInput";
import { Item } from "../../types/index";

interface DateInputProps {
  dataKey: string;
  itemState: Item;
  setItemState: React.Dispatch<React.SetStateAction<Item>>;
}

const fieldStyle = { width: "70%", marginLeft: "12%" };

const DateInput = ({ dataKey, itemState, setItemState }: DateInputProps) => (
  <OutlinedInput
    sx={fieldStyle}
    value={
      itemState[dataKey as keyof Item] &&
      new Date(itemState[dataKey as keyof Item]).toISOString().substring(0, 10)
    }
    type="date"
    onChange={(
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const tempItem = { ...itemState };
      tempItem[dataKey as keyof Item] = e.target.value;
      setItemState(tempItem);
    }}
  />
);

export default DateInput;
