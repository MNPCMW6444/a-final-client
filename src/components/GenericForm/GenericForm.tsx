import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { Item } from "../../types";
import Button from "@mui/material/Button";
import Axios from "axios";
import domain from "../../config/domain";
import fieldsConfig from "../../config/fields";
import InputLabel from "@mui/material/InputLabel";
import { ItemTypes } from "../../utils/enums";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import { Box, Fade, Modal, Typography } from "@mui/material";
import selectButton from "../CalendarButton/CalendarButton";
import DateInput from "./DateInput";
import FormContext from "../../context/FormContext";
import useDataProcessor from "../../hooks/useDataProcessor";

const modalStyle = {
  backgroundColor: "white",
  position: "fixed",
  minWidth: "540px",
  maxWidth: "700px",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  overflowX: "hidden",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "",
  },
};

interface GenericFormProps {
  item: Item;
}

const fieldStyle = { width: "70%" };

const controlButtonStyle = { width: "100px" };

const GenericForm = ({ item }: GenericFormProps) => {
  const { refresh }: { refresh: () => Promise<() => void> } =
    useDataProcessor();

  const { dispatch } = useContext(FormContext);

  const [type, setType] = useState<string>(item.type || ItemTypes.task);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [itemState, setItemState] = useState<Item>(item);

  const fieldsArray = fieldsConfig.get(type);

  const handleFormSend = async () => {
    try {
      item.type
        ? await Axios.put(domain + "edit" + type + "/" + itemState._id, {
            newItem: itemState,
          })
        : await Axios.post(domain + "create" + type, {
            newItem: itemState,
          });
      dispatch({ type: "SET_STATE", state: { form: <></> } });
      refresh();
    } catch (err: any) {
      setErrorMessage(err.response.data.erroMsg);
    }
  };

  return (
    <Modal
      open={true}
      onClose={() => dispatch({ type: "SET_STATE", state: { form: <></> } })}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Box
          sx={modalStyle}
          width="42vw"
          height="80vh"
          border="0.2rem solid #000"
          boxShadow={24}
          borderRadius="5vw"
          padding="4vw"
        >
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
                fieldsArray &&
                Array.from(fieldsArray, ([key, props]) => ({
                  key,
                  ...props,
                })).map(
                  (
                    { key, label, placeHolder, dropDownOptions, datePicker },
                    index: number
                  ) => {
                    return (
                      <Grid
                        item
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        key={index}
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
                    );
                  }
                )}
            </Grid>
            <Grid item container justifyContent="center" columnSpacing={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={handleFormSend}
                  sx={controlButtonStyle}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={controlButtonStyle}
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    dispatch({
                      type: "SET_STATE",
                      state: { form: <></> },
                    })
                  }
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <Grid item justifyContent="center">
              <Typography style={{ color: "red" }}>{errorMessage}</Typography>
            </Grid>
          </Grid>{" "}
        </Box>
      </Fade>
    </Modal>
  );
};

export default GenericForm;
