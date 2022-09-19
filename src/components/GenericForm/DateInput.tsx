import OutlinedInput from "@mui/material/OutlinedInput";
import { Item } from "../../types/dataTypes";

interface DateInputProps {
  dataKey: string;
  itemState: Item;
  setItemState: React.Dispatch<React.SetStateAction<Item>>;
}

export default function DateInput({
  dataKey,
  itemState,
  setItemState,
}: DateInputProps) {
  return (
    <OutlinedInput
      value={
        itemState[dataKey as keyof Item] &&
        new Date(itemState[dataKey as keyof Item])
          .toISOString()
          .substring(0, 10)
      }
      type="date"
      onChange={(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        const tempItem = itemState;
        tempItem[dataKey as keyof Item] = e.target.value;
        setItemState(Object.assign({}, tempItem));
      }}
    />
  );
}
