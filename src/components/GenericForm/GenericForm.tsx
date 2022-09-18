import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Item, Task, Event } from "../../types/dataTypes";
import Button from "@mui/material/Button";
import useDataProcessor from "../../utils/useDataProcessor";
import axios from "axios";
import domain from "../../config/domain";
import fieldsConfig from "../../config/fields";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";

interface GenericFormProps {
  closeForm: () => void;
  item: Item;
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

  const [type, setType] = useState<string>("Task");

  const fieldsMap = fieldsConfig.get(item.type ? item.type : type);

  const [itemState, setItemState] = useState<Item>(
    item.type === "Task"
      ? rawData.tasks.length > 0
        ? (rawData.tasks.filter((task: Item) => task.id === item.id)[0] as Task)
        : ({} as Task)
      : rawData.events.length > 0
      ? (rawData.events.filter(
          (event: Item) => event.id === item.id
        )[0] as Event)
      : ({} as Event)
  );
  debugger;
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item alignSelf="center">
        <ButtonGroup variant="contained">
          <Button
            disabled={!!item.type}
            sx={{ backgroundColor: type === "Task" ? "blue" : "auto" }}
            onClick={() => setType("Task")}
          >
            Task
          </Button>
          <Button
            disabled={!!item.type}
            sx={{ backgroundColor: type === "Event" ? "blue" : "auto" }}
            onClick={() => setType("Event")}
          >
            Event
          </Button>
        </ButtonGroup>
      </Grid>
      {itemState &&
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
            <Grid
              key={i}
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={6}
            >
              <Grid item>
                <InputLabel>{label + ": "}</InputLabel>
              </Grid>
              <Grid item>
                {placeHolder ? (
                  <Input
                    value={itemState[key as keyof Item]}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => {
                      const tempItem = itemState;
                      tempItem[key as keyof Item] = e.target.value;
                      setItemState(Object.assign({}, tempItem));
                    }}
                    placeholder={placeHolder}
                  />
                ) : dropDownOptions ? (
                  <Select
                    value={itemState[key as keyof Item]}
                    onChange={(e) => {
                      const tempItem = itemState;
                      tempItem[key as keyof Item] = e.target.value;
                      setItemState(Object.assign({}, tempItem));
                    }}
                  >
                    {Array.from(dropDownOptions, ([value, key]) => ({
                      key,
                      value,
                    })).map((option) => (
                      <MenuItem value={option.value}>{option.key}</MenuItem>
                    ))}
                  </Select>
                ) : datePicker ? (
                  <Input
                    value={
                      itemState[key as keyof Item] &&
                      itemState[key as keyof Item].substring(0, 10)
                    }
                    type="date"
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => {
                      const tempItem = itemState;
                      tempItem[key as keyof Item] = e.target.value;
                      setItemState(Object.assign({}, tempItem));
                    }}
                  />
                ) : (
                  <InputLabel>configuration error!</InputLabel>
                )}
              </Grid>
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
