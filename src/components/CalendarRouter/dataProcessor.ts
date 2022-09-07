import rawData from "../../assets/mock.json";
import { Task, Event } from "../../types/dataTypes";
import { colorMap } from "./dataProcessorUtils/maps";

const jsonEvents = rawData.events;
const jsonTasks = rawData.tasks;
let parsedEvents: Event[];
parsedEvents = jsonEvents.map((event: any) => {
  event.beginningTime = new Date(event.beginningTime).toLocaleString();
  event.endingTime = new Date(event.endingTime).toLocaleString();
  event.notificationDate = new Date(event.notificationDate).toLocaleString();
  event.color = colorMap.get(event.color);
  event.type = "Event";
  return event;
});
let parsedTasks: Task[];
parsedTasks = jsonTasks.map((task: any) => {
  task.untilDate = new Date(task.untilDate).toLocaleString();
  task.type = "Task";
  return task;
});
const data = {
  events: parsedEvents,
  tasks: parsedTasks,
};

export { data };
