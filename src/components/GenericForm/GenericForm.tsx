import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Item } from "../../types/dataTypes";
import Button from "@mui/material/Button";
import Axios from "axios";
import domain from "../../config/domain";
import fieldsConfig from "../../config/fields";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import blue from "@mui/material/colors/blue";

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
  const [type, setType] = useState<string>(item.type || "Task");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [itemState, setItemState] = useState<Item>(item);

  const buttonSx = (id: string) => ({
    backgroundColor: type === id ? blue[300] : blue[100],
    color: blue[900],
    width: "30vw",
  });

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item alignSelf="center">
        <ButtonGroup variant="contained">
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item>
              <Button
                disabled={!!item.type}
                sx={buttonSx("Task")}
                onClick={() => setType("Task")}
              >
                Task
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!!item.type}
                sx={buttonSx("Event")}
                onClick={() => setType("Event")}
              >
                Event
              </Button>
            </Grid>
          </Grid>
        </ButtonGroup>
      </Grid>
      {itemState &&
        Array.from(
          fieldsConfig.get(type),
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
            >
              <Grid item sx={{ width: "35%" }}>
                <InputLabel>{label + ": "}</InputLabel>
              </Grid>
              <Grid item sx={{ width: "60%" }}>
                {placeHolder ? (
                  <OutlinedInput
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
                  <OutlinedInput
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

      <Grid item alignSelf="center">
        <Button
          variant="outlined"
          onClick={async () => {
            if (item.type)
              try {
                await Axios.put(domain + "edit" + type + "/" + itemState._id, {
                  newItem: itemState,
                });
                closeForm();
                refresh();
              } catch (err: any) {
                setErrorMessage(err.response.data.erroMsg);
              }
            else
              try {
                await Axios.post(domain + "create" + type, {
                  newItem: itemState,
                });
                closeForm();
                refresh();
              } catch (err: any) {
                setErrorMessage(err.response.data.erroMsg);
              }
          }}
        >
          Save
        </Button>
      </Grid>

      <Grid item>
        <span style={{ color: "red" }}>{errorMessage}</span>
      </Grid>
    </Grid>
  );
}
