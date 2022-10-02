import { Item, Task, Event } from "../types/dataTypes";
import { ItemTypes } from "../utils/enums";

const quickFilters = {
  today: [
    {
      name: "Only tasks",
      filterFunction: (item: Item) => item.type === ItemTypes.task,
    },
    {
      name: "Only events",
      filterFunction: (item: Item) => item.type === ItemTypes.event,
    },
    {
      name: "Uncompleted tasks",
      filterFunction: (task: Item) => (task as Task).status !== "Close",
    },
    {
      name: "High priority tasks",
      filterFunction: (task: Item) => (task as Task).priority !== "High",
    },
  ],
  tasks: [
    {
      name: "Uncompleted tasks",
      filterFunction: (task: Item) => (task as Task).status !== "Close",
    },
    {
      name: "High priority tasks",
      filterFunction: (task: Item) => (task as Task).priority !== "High",
    },
  ],
  events: [
    {
      name: "Events for today",
      filterFunction: (event: Item) =>
        (event as Event).beginningTime.substring(0, 9) ===
        new Date().toLocaleString().substring(0, 9),
    },
    {
      name: "Future events",
      filterFunction: (event: Item) =>
        new Date((event as Event).beginningTime) > new Date(),
    },
  ],
};

export default quickFilters;
