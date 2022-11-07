import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";

import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";
import { FormProvider } from "./context/FormContext";
import { Item, Event, Task } from "./types";
import { gql, useQuery } from "@apollo/client";
import { ItemTypes } from "./utils/enums";

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
      location
      notificationTime
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

function App() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
