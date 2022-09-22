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
import selectButton from "../selectButton/selectButton";
import SelectButton from "../selectButton/selectButton";

interface GenericFormProps {
  closeForm: () => void;
  item: Item;
  refresh: () => void;
}

const GenericForm = ({ closeForm, item, refresh }: GenericFormProps) => {
  const [type, setType] = useState<string>(item.type || ItemTypes.task);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [itemState, setItemState] = useState<Item>(item);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={6}
    >
      <Grid item container direction="row" justifyContent="center">
        {Object.values(ItemTypes).map((option) => {
          const SelectButton = selectButton(option, type);
          return (
            <Grid item>
              <SelectButton
                disabled={!!item.type && item.type !== type}
                onClick={() => setType(option)}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ marginLeft: "25px" }}
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
                justifyContent="space-between"
                alignItems="center"
                key={i}
              >
                <Grid item>
                  <InputLabel>{label + ": "}</InputLabel>
                </Grid>
                <Grid item sx={{ minWidth: "350px", width: "70%" }}>
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
                  ) : (
                    datePicker && (
                      <DateInput
                        dataKey={key}
                        itemState={itemState}
                        setItemState={setItemState}
                      />
                    )
                  )}
                </Grid>
              </Grid>
            )
          )}
      </Grid>
      <Grid item container direction="row" justifyContent="center">
        <Grid item>
          <Button
            variant="outlined"
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
          <Button variant="outlined" onClick={() => closeForm()}>
            Cancel
          </Button>
        </Grid>
      </Grid>
      <Grid item justifyContent="center">
        <Typography style={{ color: "red" }}>{errorMessage}</Typography>
      </Grid>
    </Grid>
  );
};

export default GenericForm;
