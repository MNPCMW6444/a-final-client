import { Item, Task } from "../types/dataTypes";
import { ItemTypes } from "../utils/enums";

const quickFilters = [
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
];

export default quickFilters;
