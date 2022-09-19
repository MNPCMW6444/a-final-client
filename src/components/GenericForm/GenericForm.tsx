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
  const [type, setType] = useState<string>(
    item.type || Object.values(ItemTypes)[0]
  );

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [itemState, setItemState] = useState<Item>(item);

  const buttonSx = (id: string) => ({
    backgroundColor: type === id ? blue[300] : blue[100],
    color: blue[900],
    width: 68 / Object.values(ItemTypes).length + "vw",
  });

  return (
    <Grid container direction="column" alignItems="center" spacing={6}>
      <Grid item>
        <ButtonGroup variant="contained">
          <Grid container direction="row" alignItems="center" spacing={2}>
            {Object.values(ItemTypes).map((type) => (
              <Grid item>
                <Button
                  disabled={type !== item.type}
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
      <Grid item container spacing={2}>
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
              <Grid item key={i} container direction="row" alignItems="center">
                <Grid item sx={{ width: "50%" }}>
                  <InputLabel
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {label + ": "}
                  </InputLabel>
                </Grid>
                <Grid item sx={{ width: "50%" }}>
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
      <Grid item>
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
        <Typography style={{ color: "red" }}>{errorMessage}</Typography>
      </Grid>
    </Grid>
  );
}
