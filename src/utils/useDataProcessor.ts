import { useEffect, useState } from "react";
import { Item, Task, Event } from "../types/dataTypes";
import domain from "../config/domain";
import Axios from "axios";
import { ItemTypes } from "./enums";

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

const useDataProcessor = (refresher: number) => {
  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    const axiosController = new AbortController();
    const fetchData = async () => {
      const res = await Axios.get(domain + "alldata");
      res.data.tasks.forEach((task: Task) => {
        task.type = ItemTypes.task;
      });
      res.data.events.forEach((event: Event) => {
        event.type = ItemTypes.event;
      });
      setData([...res.data.tasks, ...res.data.events]);
      return () => axiosController.abort();
    };
    fetchData();
  }, [refresher]);

  if (data.length > 0) {
    const dbData = structuredClone(data);

    const jsonEvents = (dbData as Item[]).filter(
      (item: Item) => item.type === ItemTypes.event
    );
    const jsonTasks = (dbData as Item[]).filter(
      (item: Item) => item.type === ItemTypes.task
    );
    let parsedEvents: Event[];
    parsedEvents = jsonEvents.map((event: any) => {
      event.beginningTime =
        new Date(event.beginningTime).toLocaleDateString() +
        ", " +
        new Date(event.beginningTime).toLocaleTimeString().substring(0, 4);
      event.endingTime =
        new Date(event.endingTime).toLocaleDateString() +
        ", " +
        new Date(event.endingTime).toLocaleTimeString().substring(0, 4);
      event.notificationDate =
        new Date(event.notificationDate).toLocaleDateString() +
        ", " +
        new Date(event.notificationDate).toLocaleTimeString().substring(0, 4);
      event.color = colorMap.get(event.color);
      event.type = ItemTypes.event;

      return event;
    });
    let parsedTasks: Task[];
    parsedTasks = jsonTasks.map((task: any) => {
      task.untilDate =
        new Date(task.untilDate).toLocaleDateString() +
        ", " +
        new Date(task.untilDate).toLocaleTimeString().substring(0, 4);
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
    return [...parsedEvents, ...parsedTasks];
  } else return data;
};

export default useDataProcessor;
