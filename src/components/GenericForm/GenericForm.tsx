import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Item, Task, Event } from "../../types/dataTypes";
import Button from "@mui/material/Button";
import useDataProcessor from "../../utils/useDataProcessor";
import axios from "axios";
import domain from "../../config/domain";
import fieldsConfig from "../../config/fields";

interface GenericFormProps {
  closeForm: () => void;
  item: Item | null;
  refresh: () => void;
  refresher: number;
}

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

  const fieldsMap = fieldsConfig.get(item?.type);

  const [itemState, setItemState] = useState<Item>(originalItem);
  return (
    <Grid container direction="column" spacing={2}>
      {originalItem &&
        Array.from(
          fieldsMap,
          ([key, { label, placeHolder, dropDownOptions, datePicker }]) => ({
            key,
            label,
            placeHolder,
            dropDownOptions,
            datePicker,
          })
        ).map(
          (
            { key, label, placeHolder, dropDownOptions, datePicker },
            i: number
          ) => (
            <Grid item key={i}>
              <label>{label}</label>
              {placeHolder ? (
                <input
                  value={originalItem[key as keyof Item]}
                  onChange={(e) => {
                    const tempItem = originalItem;
                    tempItem[key as keyof Item] = e.target.value;
                    setItemState(Object.assign({}, tempItem));
                  }}
                />
              ) : (
                <input
                  value={originalItem[key as keyof Item]}
                  onChange={(e) => {
                    const tempItem = originalItem;
                    tempItem[key as keyof Item] = e.target.value;
                    setItemState(Object.assign({}, tempItem));
                  }}
                />
              )}
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
