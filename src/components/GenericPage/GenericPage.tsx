import { gql, useSubscription } from "@apollo/client";
import Box from "@mui/material/Box";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import {
  addItem,
  editItem,
  removeItem,
} from "../../store/reducers/itemsReducer";
import pageTypeSelector from "../../store/selectors/pageTypeSelector";
import { ItemTypes } from "../../utils/enums";
import GenericTable from "../GenericTable/GenericTable";
import SideBar from "../SideBar/SideBar";

interface GenericPageProps {
  columns: Map<string, string> | undefined;
  commonProps: {
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
    drawerOpen: boolean;
  };
}

const navigationStyle = {
  width: { sm: drawerWidthSettings.width },
  flexShrink: { sm: 0 },
};

const colorMap = new Map();
colorMap.set("Red", "🔴");
colorMap.set("Orange", "🟠");
colorMap.set("Yellow", "🟡");
colorMap.set("Green", "🟢");
colorMap.set("Blue", "🔵");
colorMap.set("Purple", "🟣");
colorMap.set("Black", "⚫️");
colorMap.set("White", "⚪️");
colorMap.set("Brown", "🟤");

const newEventSubscription = gql`
  subscription Subscription {
    newEvent {
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

const newTaskSubscription = gql`
  subscription Subscription {
    newTask {
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

const editEventSubscription = gql`
  subscription Subscription {
    editEvent {
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

const editTaskSubscription = gql`
  subscription Subscription {
    editTask {
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

const deletedEventSubscription = gql`
  subscription Subscription {
    deletedEvent
  }
`;

const deletedTaskSubscription = gql`
  subscription Subscription {
    deletedTask
  }
`;

export default function GenericPage({
  commonProps,
  columns,
}: GenericPageProps) {
  const { setDrawerOpen, drawerOpen } = commonProps;

  const pageType = useSelector(pageTypeSelector);

  let deletedTask = useSubscription(deletedTaskSubscription).data;

  let deletedEvent = useSubscription(deletedEventSubscription).data;

  let newTask = useSubscription(newTaskSubscription).data;

  let newEvent = useSubscription(newEventSubscription).data;

  let editTask = useSubscription(editTaskSubscription).data;

  let editEvent = useSubscription(editEventSubscription).data;

  const dispatch = useDispatch();

  useEffect(() => {
    if (newTask) {
      let task = { ...newTask.newTask };
      task.type = ItemTypes.task;
      task.untilDate =
        new Date(task.untilDate).toLocaleDateString() +
        ", " +
        new Date(task.untilDate)
          .toLocaleTimeString()
          .substring(
            0,
            new Date(task.untilDate).toLocaleTimeString().indexOf(":", 3)
          );

      task.type = ItemTypes.task;
      dispatch(addItem(task));
    }
    if (newEvent) {
      let event = { ...newEvent.newEvent };
      event.beginningTime =
        new Date(event.beginningTime).toLocaleDateString() +
        ", " +
        new Date(event.beginningTime)
          .toLocaleTimeString()
          .substring(
            0,
            new Date(event.beginningTime).toLocaleTimeString().indexOf(":", 3)
          );
      event.endingTime =
        new Date(event.endingTime).toLocaleDateString() +
        ", " +
        new Date(event.endingTime)
          .toLocaleTimeString()
          .substring(
            0,
            new Date(event.endingTime).toLocaleTimeString().indexOf(":", 3)
          );
      event.notificationTime =
        new Date(event.notificationTime).toLocaleDateString() +
        ", " +
        new Date(event.notificationTime)
          .toLocaleTimeString()
          .substring(
            0,
            new Date(event.notificationTime)
              .toLocaleTimeString()
              .indexOf(":", 3)
          );
      event.color = colorMap.get(event.color);
      event.type = ItemTypes.event;
      dispatch(addItem(event));
    }

    if (editTask) {
      let task = { ...editTask.editTask };
      task.type = ItemTypes.task;
      task.untilDate =
        new Date(task.untilDate).toLocaleDateString() +
        ", " +
        new Date(task.untilDate)
          .toLocaleTimeString()
          .substring(
            0,
            new Date(task.untilDate).toLocaleTimeString().indexOf(":", 3)
          );
      task.type = ItemTypes.task;
      dispatch(editItem(task));
      editTask = undefined;
    }
    if (editEvent) {
      let event = { ...editEvent.editEvent };
      event.beginningTime =
        new Date(event.beginningTime).toLocaleDateString() +
        ", " +
        new Date(event.beginningTime)
          .toLocaleTimeString()
          .substring(
            0,
            new Date(event.beginningTime).toLocaleTimeString().indexOf(":", 3)
          );
      event.endingTime =
        new Date(event.endingTime).toLocaleDateString() +
        ", " +
        new Date(event.endingTime)
          .toLocaleTimeString()
          .substring(
            0,
            new Date(event.endingTime).toLocaleTimeString().indexOf(":", 3)
          );
      event.notificationTime =
        new Date(event.notificationTime).toLocaleDateString() +
        ", " +
        new Date(event.notificationTime)
          .toLocaleTimeString()
          .substring(
            0,
            new Date(event.notificationTime)
              .toLocaleTimeString()
              .indexOf(":", 3)
          );
      event.color = colorMap.get(event.color);
      event.type = ItemTypes.event;
      dispatch(editItem(event));
      editEvent = undefined;
    }

    if (deletedEvent) {
      dispatch(removeItem(deletedEvent.deletedEvent));
      deletedEvent = undefined;
    }
    if (deletedTask) {
      dispatch(removeItem(deletedTask.deletedTask));
      deletedTask = undefined;
    }
  }, [
    dispatch,
    deletedEvent,
    deletedTask,
    newTask,
    newEvent,
    editTask,
    editEvent,
  ]);

  return (
    <Box>
      <GenericTable columns={columns} pageType={pageType} />
      <Box component="nav" sx={navigationStyle}>
        <SideBar
          pageType={pageType}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </Box>
    </Box>
  );
}
