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
  const rawData = useDataProcessor();

  let originalItem = item
    ? item.type === "Task"
      ? rawData &&
        (rawData.tasks.filter((task: Item) => task.id === item.id)[0] as Task)
      : rawData &&
        (rawData.events.filter(
          (event: Item) => event.id === item.id
        )[0] as Event)
    : ({} as Item);

  const [itemState, setItemState] = useState<Item>(
    originalItem || ({} as Item)
  );

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
