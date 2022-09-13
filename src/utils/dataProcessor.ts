import rawData from "../assets/mock.json";
import { Task, Event } from "../types/dataTypes";

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

const jsonEvents = rawData.events;
const jsonTasks = rawData.tasks;
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
  event.type = "Event";
  return event;
});
let parsedTasks: Task[];
parsedTasks = jsonTasks.map((task: any) => {
  task.untilDate =
    new Date(task.untilDate).toLocaleDateString() +
    ", " +
    new Date(task.untilDate).toLocaleTimeString().substring(0, 4);
  debugger;
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
  task.type = "Task";
  return task;
});
const data = {
  events: parsedEvents,
  tasks: parsedTasks,
};

export { data };
