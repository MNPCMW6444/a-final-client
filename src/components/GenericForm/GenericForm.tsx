import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Item, Task, Event } from "../../types/dataTypes";
import Button from "@mui/material/Button";
import useDataProcessor from "../../utils/useDataProcessor";

interface GenericFormProps {
  closeForm: () => void;
  item: Item | null;
}

export default function GenericForm({ closeForm, item }: GenericFormProps) {
  const rawData = useDataProcessor(false);
  let originalItem = rawData
    ? item
      ? item.type === "Task"
        ? (rawData.tasks.filter((task: Item) => task.id === item.id)[0] as Task)
        : (rawData.events.filter(
            (event: Item) => event.id === item.id
          )[0] as Event)
      : ({} as Item)
    : ({} as Item);

  const [itemState, setItemState] = useState<Item>(originalItem);
  debugger;
  return (
    <Grid container direction="column" spacing={2}>
      {Object.keys(originalItem).map((field, i) => (
        <Grid item key={i}>
          <label>{field + ": "}</label>
          <input
            value={originalItem[field as keyof Item]}
            onChange={(e) => {
              const tempItem = originalItem;
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
