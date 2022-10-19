import { Item, Task, Event } from "../../types";
import { ItemTypes } from "../../utils/enums";

export const selectAllItems = (state: any) => (state as any).items;

export const selectTodayItems = (state: any) =>
  (state as any).items.filter((item: Item) =>
    item.type === ItemTypes.task
      ? (item as Task).untilDate.substring(0, 9) ===
        new Date().toLocaleString().substring(0, 9)
      : (item as Event).beginningTime.substring(0, 9) ===
        new Date().toLocaleString().substring(0, 9)
  );

export const selectEvents = (state: any) =>
  (state as any).items.filter((item: Item) => item.type === ItemTypes.event);

export const selectTasks = (state: any) => {
  return (state as any).items.filter(
    (item: Item) => item.type === ItemTypes.task
  );
};
