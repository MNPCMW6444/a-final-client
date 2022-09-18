import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Item } from "../../types/dataTypes";
import Button from "@mui/material/Button";
import Axios from "axios";
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
}

export default function GenericForm({
  closeForm,
  item,
  refresh,
}: GenericFormProps) {
  const [type, setType] = useState<string>("Task");

  const fieldsMap = fieldsConfig.get(item.type ? item.type : type);

  const [itemState, setItemState] = useState<Item>(item);

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
                      tempItem[key as keyof Item] = e.target.value as string;
                      setItemState(Object.assign({}, tempItem));
                    }}
                  >
                    {dropDownOptions.map((option: string) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                ) : datePicker ? (
                  <Input
                    value={
                      itemState[key as keyof Item] &&
                      new Date(itemState[key as keyof Item])
                        .toISOString()
                        .substring(0, 10)
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
            item.type
              ? await Axios.put(domain + "edit" + type + "/" + itemState._id, {
                  newItem: itemState,
                })
              : await Axios.post(domain + "create" + type, {
                  newItem: itemState,
                });
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
