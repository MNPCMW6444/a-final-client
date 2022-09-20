import OutlinedInput from "@mui/material/OutlinedInput";
import { Item } from "../../types/dataTypes";

interface TextInputProps {
  placeHolder: string;
  dataKey: string;
  itemState: Item;
  setItemState: React.Dispatch<React.SetStateAction<Item>>;
}

const TextInput = ({
  placeHolder,
  dataKey,
  itemState,
  setItemState,
}: TextInputProps) => (
  <OutlinedInput
    sx={{ width: "70%", marginLeft: "12%" }}
    value={itemState[dataKey as keyof Item]}
    onChange={(
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const tempItem = { ...itemState };
      tempItem[dataKey as keyof Item] = e.target.value;
      setItemState(tempItem);
    }}
    placeholder={placeHolder}
  />
);

export default TextInput;
