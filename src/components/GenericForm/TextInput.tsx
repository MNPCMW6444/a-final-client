import OutlinedInput from "@mui/material/OutlinedInput";
import { Item } from "../../types/dataTypes";

interface TextInputProps {
  placeHolder: string;
  dataKey: string;
  itemState: Item;
  setItemState: React.Dispatch<React.SetStateAction<Item>>;
}

export default function TextInput({
  placeHolder,
  dataKey,
  itemState,
  setItemState,
}: TextInputProps) {
  return (
    <OutlinedInput
      value={itemState[dataKey as keyof Item]}
      onChange={(
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        const tempItem = itemState;
        tempItem[dataKey as keyof Item] = e.target.value;
        setItemState(Object.assign({}, tempItem));
      }}
      placeholder={placeHolder}
    />
  );
}
