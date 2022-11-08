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
  subscription subscription {
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
  subscription subscription {
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
    deletedEvent {
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

const deletedTaskSubscription = gql`
  subscription Subscription {
    deletedTask {
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

export default function GenericPage({
  commonProps,
  columns,
}: GenericPageProps) {
  const { setDrawerOpen, drawerOpen } = commonProps;

  const pageType = useSelector(pageTypeSelector);

  const deletedTask = useSubscription(deletedTaskSubscription).data;

  const deletedEvent = useSubscription(deletedEventSubscription).data;

  const newTask = useSubscription(newTaskSubscription).data;

  const newEvent = useSubscription(newEventSubscription).data;

  const editTask = useSubscription(editTaskSubscription).data;

  const editEvent = useSubscription(editEventSubscription).data;

  const dispatch = useDispatch();

  useEffect(() => {
    debugger;
    deletedEvent && dispatch(removeItem(deletedEvent.deletedEvent));
    deletedTask && dispatch(removeItem(deletedTask.deletedTask));

    editTask && dispatch(editItem(editTask.editTask));
    editEvent && dispatch(editItem(editEvent.editEvent));

    if (newTask) {
      let task = structuredClone(newTask.newTask);
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
      if (task.estimatedTime)
        switch (task.estimatedTime.slice(-1)) {
          case "y":
            task.estimatedTime =
              task.estimatedTime.substring(0, task.estimatedTime.length - 1) +
              " years";
            break;
          case "M":
            task.estimatedTime =
              task.estimatedTime.substring(0, task.estimatedTime.length - 1) +
              " Months";
            break;
          case "w":
            task.estimatedTime =
              task.estimatedTime.substring(0, task.estimatedTime.length - 1) +
              " Weeks";
            break;
          case "d":
            task.estimatedTime =
              task.estimatedTime.substring(0, task.estimatedTime.length - 1) +
              " Days";
            break;
          case "h":
            task.estimatedTime =
              task.estimatedTime.substring(0, task.estimatedTime.length - 1) +
              " Hours";
            break;
          case "m":
            task.estimatedTime =
              task.estimatedTime.substring(0, task.estimatedTime.length - 1) +
              " Minutes";
            break;
          case "s":
            task.estimatedTime =
              task.estimatedTime.substring(0, task.estimatedTime.length - 1) +
              " Seconds";
            break;
        }
      task.typeName = ItemTypes.task;
      task.type = ItemTypes.task;
      dispatch(addItem(task));
    }

    if (newEvent) {
      let event = structuredClone(newEvent.newEvent);
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
      event.typeName = ItemTypes.event;
      event.type = ItemTypes.event;
      dispatch(addItem(event));
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
