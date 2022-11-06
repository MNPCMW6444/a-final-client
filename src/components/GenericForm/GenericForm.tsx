import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { Item } from "../../types";
import Button from "@mui/material/Button";
import fieldsConfig from "../../config/fields";
import InputLabel from "@mui/material/InputLabel";
import { ItemTypes } from "../../utils/enums";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import { Typography } from "@mui/material";
import selectButton from "../CalendarButton/CalendarButton";
import DateInput from "./DateInput";
import FormContext from "../../context/FormContext";
import { addItem, editItem } from "../../store/reducers/itemsReducer";

import { useDispatch } from "react-redux";
import { gql, useMutation } from "@apollo/client";

interface GenericFormProps {
  item: Item;
}

const editEvent = gql`
  mutation Mutation {
    editEvent {
      title
      description
      beginningTime
      endingTime
      color
      invitedGuests
      location
      notificationTime
    }
  }
`;

const editTask = gql`
  mutation Mutation {
    editTask {
      title
      description
      estimatedTime
      status
      priority
      untilDate
      review
      timeSpent
      location
      notificationTime
    }
  }
`;

const createTask = gql`
  mutation Mutation {
    createTask
  }
`;

const createEvent = gql`
  mutation Mutation {
    createEvent
  }
`;

const fieldStyle = { width: "70%" };

const controlButtonStyle = { width: "100px" };

const GenericForm = ({ item }: GenericFormProps) => {
  const [editEventFunc] = useMutation(editEvent);
  const [editTaskFunc] = useMutation(editTask);
  const [createTaskFunc] = useMutation(createTask);
  const [createEventFunc] = useMutation(createEvent);

  const { setIsFormOpen } = useContext(FormContext);

  const [type, setType] = useState<string>(item.type || ItemTypes.task);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [itemState, setItemState] = useState<Item>(item);

  const fieldsArray = fieldsConfig.get(type);

  const dispatch = useDispatch();

  const handleFormSend = async () => {
    try {
      itemState.type
        ? type === ItemTypes.event
          ? editEventFunc({
              variables: { newItem: itemState },
            })
          : editTaskFunc({ variables: { task: itemState } })
        : type === ItemTypes.event
        ? createEventFunc({ variables: { event: itemState } })
        : createTaskFunc({ variables: { task: itemState } });

      itemState._id
        ? dispatch(editItem({ ...itemState, type }))
        : dispatch(
            addItem({ ...itemState, type, _id: Math.random() + "Temp" })
          );
      setIsFormOpen(false);
    } catch (err: any) {
      setErrorMessage(err.response.data.erroMsg);
    }
  };

  return (
    <Grid container direction="column" rowSpacing={6}>
      <Grid item container justifyContent="center" columnSpacing={0.5}>
        {Object.values(ItemTypes).map((option, index) => {
          const SelectButton = selectButton(option, type === option);
          return (
            (!item.type || item.type === option) && (
              <Grid item key={index}>
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
            onClick={() => setIsFormOpen(false)}
          >
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
