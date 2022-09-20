import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Item } from "../../types/dataTypes";
import Button from "@mui/material/Button";
import Axios from "axios";
import domain from "../../config/domain";
import fieldsConfig from "../../config/fields";
import InputLabel from "@mui/material/InputLabel";
import ButtonGroup from "@mui/material/ButtonGroup";
import blue from "@mui/material/colors/blue";
import { ItemTypes } from "../../utils/enums";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import { Typography } from "@mui/material";
import red from "@mui/material/colors/red";

interface GenericFormProps {
  closeForm: () => void;
  item: Item;
  refresh: () => void;
}

const GenericForm = ({ closeForm, item, refresh }: GenericFormProps) => {
  const [type, setType] = useState<string>(item.type || ItemTypes.task);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [itemState, setItemState] = useState<Item>(item);

  const buttonSx = (id: string) => ({
    width: 33 / Object.values(ItemTypes).length + "vw",
    backgroundColor:
      id === "red" ? red[100] : type === id ? blue[900] : blue[100],
    color: id === "red" ? red[600] : type === id ? blue[100] : blue[900],
    border: "0.1vw solid " + id === "red" ? "red" : "blue",
    "&:hover": {
      backgroundColor:
        id === "red" ? red[800] : type === id ? blue[900] : blue[400],
      color: id === "red" ? red[100] : type === id ? blue[100] : blue[900],
    },
    "&:active": {
      backgroundColor: id === "red" ? red[900] : blue[900],
      color: blue[100],
    },
  });
  return (
    <Grid container direction="column" alignItems="center" spacing={6}>
      <Grid item>
        <ButtonGroup variant="contained">
          <Grid container direction="row">
            {Object.values(ItemTypes).map((type) => (
              <Grid item>
                <Button
                  disabled={!!item.type && item.type !== type}
                  sx={buttonSx(type)}
                  onClick={() => setType(type)}
                >
                  {type}
                </Button>
              </Grid>
            ))}
          </Grid>
        </ButtonGroup>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        wrap="nowrap"
        spacing={6}
        width="33vw"
      >
        <Grid
          item
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          height="50vh"
        >
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
                  item
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={10}
                  key={i}
                >
                  <Grid item>
                    <InputLabel>{label + ": "}</InputLabel>
                  </Grid>
                </Grid>
              )
            )}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          height="50vh"
        >
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
                  item
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={10}
                  key={i}
                >
                  <Grid item sx={{ width: "400px" }}>
                    {placeHolder ? (
                      <TextInput
                        placeHolder={placeHolder}
                        dataKey={key}
                        itemState={itemState}
                        setItemState={setItemState}
                      />
                    ) : dropDownOptions ? (
                      <SelectInput
                        dropDownOptions={dropDownOptions}
                        dataKey={key}
                        itemState={itemState}
                        setItemState={setItemState}
                      />
                    ) : datePicker ? (
                      <DateInput
                        dataKey={key}
                        itemState={itemState}
                        setItemState={setItemState}
                      />
                    ) : (
                      <InputLabel>configuration error!</InputLabel>
                    )}
                  </Grid>
                </Grid>
              )
            )}
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={2} wrap="nowrap">
        <Grid item>
          <Button
            variant="outlined"
            sx={buttonSx("")}
            onClick={async () => {
              if (item.type)
                try {
                  await Axios.put(
                    domain + "edit" + type + "/" + itemState._id,
                    {
                      newItem: itemState,
                    }
                  );
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
          <Button
            variant="outlined"
            sx={buttonSx("red")}
            onClick={() => closeForm()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Typography style={{ color: "red" }}>{errorMessage}</Typography>
      </Grid>
    </Grid>
  );
};

export default GenericForm;
