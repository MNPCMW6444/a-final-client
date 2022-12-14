import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { Item } from "../../types";
import Button from "@mui/material/Button";
import fieldsConfig from "../../config/fields";
import InputLabel from "@mui/material/InputLabel";
import { ItemTypes } from "../../utils/enums";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import selectButton from "../CalendarButton/CalendarButton";
import DateInput from "./DateInput";
import FormContext from "../../context/FormContext";
import { gql, useMutation } from "@apollo/client";
import { addItem, editItem } from "../../store/reducers/itemsReducer";
import { useDispatch } from "react-redux";

const editEvent = gql`
  mutation Mutation($newItem: EventInput) {
    editEvent(newItem: $newItem) {
      _id
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
  mutation Mutation($newItem: TaskInput) {
    editTask(newItem: $newItem) {
      _id
      title
      description
      estimatedTime
      status
      priority
      untilDate
      review
      timeSpent
    }
  }
`;

interface GenericFormProps {
  item: Item;
}

const fieldStyle = { width: "70%" };

const controlButtonStyle = { width: "100px" };

const GenericForm = ({ item }: GenericFormProps) => {
  const { setIsFormOpen } = useContext(FormContext);

  const [type, setType] = useState<string>(item.type || ItemTypes.task);

  const [itemState, setItemState] = useState<Item>(item);

  const fieldsArray = fieldsConfig.get(type);

  const [editEventFunc] = useMutation(editEvent);
  const [editTaskFunc] = useMutation(editTask);

  const dispatch = useDispatch();

  const handleFormSend = async () => {
    let itemStateCopy = itemState;
    delete itemStateCopy.__typename;
    if (itemStateCopy.type)
      if (type === ItemTypes.event) {
        const res = await editEventFunc({
          variables: { newItem: { ...itemStateCopy, type } },
        });
        !res.errors && dispatch(editItem({ ...itemStateCopy, type }));
      } else {
        const res = await editTaskFunc({
          variables: { newItem: { ...itemStateCopy, type } },
        });
        !res.errors && dispatch(editItem({ ...itemStateCopy, type }));
      }
    else {
      if (type === ItemTypes.event)
        dispatch(addItem({ ...itemStateCopy, type }));
      else dispatch(addItem({ ...itemStateCopy, type }));
    }
    setIsFormOpen(false);
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
    </Grid>
  );
};

export default GenericForm;
