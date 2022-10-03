import { Item, Task, Event } from "../types/index";
import { ItemTypes } from "../utils/enums";

const uncompletedTasksFilter = {
  name: "Uncompleted tasks",
  filterFunction: (task: Item) => (task as Task).status !== "Close",
};

const highPriorityTasksFilter = {
  name: "High priority tasks",
  filterFunction: (task: Item) => (task as Task).priority !== "High",
};

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
    uncompletedTasksFilter,
    highPriorityTasksFilter,
  ],
  tasks: [uncompletedTasksFilter, highPriorityTasksFilter],
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
