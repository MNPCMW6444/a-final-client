import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Item, Task, Event } from "../../types/dataTypes";
import Button from "@mui/material/Button";
import useDataProcessor from "../../utils/useDataProcessor";
import axios from "axios";
import domain from "../../config/domain";

interface GenericFormProps {
  closeForm: () => void;
  item: Item | null;
  refresh: () => void;
  refresher: number;
}

const fieldNameFormatter = (field: string): string =>
  field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (field) => field.toUpperCase()) + ": ";

export default function GenericForm({
  closeForm,
  item,
  refresh,
  refresher,
}: GenericFormProps) {
  const rawData = useDataProcessor(false, refresher);
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
  return (
    <Grid container direction="column" spacing={2}>
      {originalItem &&
        Object.keys(originalItem).map(
          (field, i) =>
            field !== "id" &&
            field !== "_id" && (
              <Grid item key={i}>
                <label>{fieldNameFormatter(field)}</label>
                <input
                  value={originalItem[field as keyof Item]}
                  onChange={(e) => {
                    const tempItem = originalItem;
                    tempItem[field as keyof Item] = e.target.value;
                    setItemState(Object.assign({}, tempItem));
                  }}
                />
              </Grid>
            )
        )}
      <Grid item>
        <Button
          onClick={async () => {
            await axios.put(
              domain + "edit" + item?.type + "/" + itemState._id,
              {
                newItem: itemState,
              }
            );
            closeForm();
            refresh();
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}
