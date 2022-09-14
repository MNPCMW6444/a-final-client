import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Item, Task, Event } from "../../types/dataTypes";
import Button from "@mui/material/Button";

interface GenericFormProps {
  closeForm: () => void;
  item: Item | null;
  data: any;
  setData: React.Dispatch<any>;
}

export default function GenericForm({
  closeForm,
  item,
  data,
  setData,
}: GenericFormProps) {
  const tempData = structuredClone(data);
  let originalItem = item
    ? item.type === "Task"
      ? (tempData.tasks.filter((task: Item) => task.id === item.id)[0] as Task)
      : (tempData.events.filter(
          (event: Item) => event.id === item.id
        )[0] as Event)
    : ({} as Item);

  const [itemState, setItemState] = useState<Item>(originalItem);

  return (
    <Grid container direction="column" spacing={2}>
      {itemState &&
        Object.keys(itemState).map((field, i) => (
          <Grid item key={i}>
            <label>{field + ": "}</label>
            <input
              value={itemState[field as keyof Item]}
              onChange={(e) => {
                const tempItem = itemState;
                tempItem[field as keyof Item] = e.target.value;
                setItemState(Object.assign({}, tempItem));
              }}
            />
          </Grid>
        ))}
      <Grid item>
        <Button
          onClick={() => {
            setData(tempData);
            closeForm();
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}
