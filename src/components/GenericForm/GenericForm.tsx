import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Item, Task, Event } from "../../types/dataTypes";
import Button from "@mui/material/Button";
import rawData from "../../assets/mock.json";

interface GenericFormProps {
  closeForm: () => void;
  item: Item | null;
}

export default function GenericForm({ closeForm, item }: GenericFormProps) {
  let originalItem = item
    ? item.type === "Task"
      ? (rawData.tasks.filter((task) => task.id === item.id)[0] as Task)
      : (rawData.events.filter((event) => event.id === item.id)[0] as Event)
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
            closeForm();
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}
