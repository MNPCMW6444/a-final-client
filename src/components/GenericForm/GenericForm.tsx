import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Item } from "../../types/dataTypes";
import Button from "@mui/material/Button";
import Axios from "axios";
import domain from "../../config/domain";
import fieldsConfig from "../../config/fields";
import InputLabel from "@mui/material/InputLabel";
import { ItemTypes } from "../../utils/enums";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import { Typography } from "@mui/material";
import selectButton from "../selectButton/selectButton";

interface GenericFormProps {
  closeForm: () => void;
  item: Item;
  refresh: () => void;
}

const fieldStyle = { width: "70%" };

const GenericForm = ({ closeForm, item, refresh }: GenericFormProps) => {
  const [type, setType] = useState<string>(item.type || ItemTypes.task);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [itemState, setItemState] = useState<Item>(item);

  return (
    <Grid container direction="column" rowSpacing={6}>
      <Grid item container justifyContent="center" columnSpacing={0.5}>
        {Object.values(ItemTypes).map((option) => {
          const SelectButton = selectButton(option, type === option);
          return (
            (!item.type || item.type === option) && (
              <Grid item>
                <SelectButton onClick={() => setType(option)} />
              </Grid>
            )
          );
        })}
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        spacing={2}
        width="40vw"
        minWidth="540px"
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
                justifyContent="space-between"
                alignItems="center"
                key={i}
              >
                <Grid item>
                  <InputLabel>{label + ": "}</InputLabel>
                </Grid>
                <Grid item sx={fieldStyle}>
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
