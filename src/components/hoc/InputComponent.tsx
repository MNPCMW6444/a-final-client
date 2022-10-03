import { Item } from "../../types";

type InputComponentProps = {
  dataKey: string;
  itemState: Item;
  setItemState: React.Dispatch<React.SetStateAction<Item>>;
};

const InputComponent = <T extends InputComponentProps>(
  Component: React.ComponentType<T>
) => {
  const fieldStyle = { width: "70%", marginLeft: "12%" };
  return (props: Omit(T, keyof InputComponentProps)) => { 
    const {dataKey,
        itemState,
        setItemState,} = proppropss;
    return (
      <Component
        {...(props as T)}
        sx={fieldStyle}
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
          const tempItem = { ...itemState };
          tempItem[dataKey as keyof Item] = e.target.value;
          setItemState(tempItem);
        }}
      />
    );
  };
};

export default InputComponent;
