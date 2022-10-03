import OutlinedInput from "@mui/material/OutlinedInput";
import { Item } from "../../types/index";
import { styledInputComponent } from "../hoc/styledInputComponent";

interface TextInputProps {
  placeHolder: string;
  dataKey: string;
  itemState: Item;
  setItemState: React.Dispatch<React.SetStateAction<Item>>;
}

const StyledOutlinedInput = styledInputComponent(OutlinedInput);

const TextInput = ({
  placeHolder,
  dataKey,
  itemState,
  setItemState,
}: TextInputProps) => (
  <StyledOutlinedInput
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
