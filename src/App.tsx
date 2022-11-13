import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";
import { FormProvider } from "./context/FormContext";
import { Item, Event, Task } from "./types";
import { gql, useQuery, useMutation } from "@apollo/client";
import { ItemTypes } from "./utils/enums";
import { useDispatch } from "react-redux";
import { addMutation } from "./store/reducers/itemsReducer";

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

const getAllTasks = gql`
  query Query {
    allTasks {
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

    allEvents {
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

const deleteEvent = gql`
  mutation Mutation($id: String) {
    deleteEvent(id: $id)
  }
`;

const deleteTask = gql`
  mutation Mutation($id: String) {
    deleteTask(id: $id)
  }
`;

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

const createTask = gql`
  mutation Mutation($newItem: TaskInput) {
    createTask(newItem: $newItem) {
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

const createEvent = gql`
  mutation Mutation($newItem: EventInput) {
    createEvent(newItem: $newItem) {
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

function App() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [editEventFunc] = useMutation(editEvent);
  const [editTaskFunc] = useMutation(editTask);
  const [createTaskFunc] = useMutation(createTask);
  const [createEventFunc] = useMutation(createEvent);
  const [deleteTaskFunc] = useMutation(deleteTask);
  const [deleteEventFunc] = useMutation(deleteEvent);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addMutation(createEventFunc));

    dispatch(addMutation(createTaskFunc));

    dispatch(addMutation(editEventFunc));

    dispatch(addMutation(editTaskFunc));

    dispatch(addMutation(deleteEventFunc));

    dispatch(addMutation(deleteTaskFunc));
  }, []);

  const commonProps = {
    setDrawerOpen: setDrawerOpen,
    drawerOpen: drawerOpen,
  };

  let processedData: Item[] = [];

  const { data } = useQuery(getAllTasks);

  const res = {
    tasks: data ? data.allTasks : [],
    events: data ? data.allEvents : [],
  };

  res.tasks = res.tasks.map((task: Task) => {
    return { ...task, type: ItemTypes.task };
  });
  res.events = res.events.map((event: Event) => {
    return { ...event, type: ItemTypes.event };
  });

  processedData = [...res.tasks, ...res.events];

  if (processedData.length > 0) {
    const dbprocessedData = structuredClone(processedData);
    const jsonEvents = (dbprocessedData as Item[]).filter(
      (item: Item) => item.type === ItemTypes.event
    ) as Event[];
    const jsonTasks = (dbprocessedData as Item[]).filter(
      (item: Item) => item.type === ItemTypes.task
    ) as Task[];

    let parsedEvents: Event[];
    parsedEvents = jsonEvents.map((event: Event) => {
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
        new Date(event.notificationTime + "").toLocaleDateString() +
        ", " +
        new Date(event.notificationTime + "")
          .toLocaleTimeString()
          .substring(
            0,
            new Date(event.notificationTime + "")
              .toLocaleTimeString()
              .indexOf(":", 3)
          );
      event.color = colorMap.get(event.color);
      event.type = ItemTypes.event;

      return event;
    });
    let parsedTasks: Task[];
    parsedTasks = jsonTasks.map((task: Task) => {
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
      return task;
    });
    processedData = [...parsedEvents, ...parsedTasks];
  }

  return (
    <FormProvider>
      <ThemeProvider theme={createTheme()}>
        <ReactNotifications />
        <CssBaseline />
        <TopBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <ShowIf show={data}>
          <CalendarRouter commonProps={commonProps} data={processedData} />
        </ShowIf>
      </ThemeProvider>
    </FormProvider>
  );
}

const ShowIf = ({ show, children }: { show: boolean; children: JSX.Element }) =>
  show ? children : <></>;

export default App;
