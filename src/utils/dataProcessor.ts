import rawData from "../assets/mock.json";
import { Task, Event } from "../types/dataTypes";
import { colorMap } from "../components/CalendarRouter/dataProcessorUtils/maps";
/* todo move to util*/

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
  task.type = "Task";
  return task;
});
const data = {
  events: parsedEvents,
  tasks: parsedTasks,
};

export { data };
