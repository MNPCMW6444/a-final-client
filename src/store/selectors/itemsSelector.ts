import { Item, Task, Event } from "../../types";
import { ItemTypes, PageTypes } from "../../utils/enums";
import { RootState } from "../store";

const itemsSelector = (state: RootState) => {
  let items = state.itemsSlice.items;
  if (state.itemsSlice.pageType)
    items = items.filter(
      state.itemsSlice.pageType === PageTypes.today
        ? (item: Item) =>
            item.type === ItemTypes.task
              ? (item as Task).untilDate.substring(0, 9) ===
                new Date().toLocaleString().substring(0, 9)
              : (item as Event).beginningTime.substring(0, 9) ===
                new Date().toLocaleString().substring(0, 9)
        : state.itemsSlice.pageType === PageTypes.tasks
        ? (item: Item) => item.type === ItemTypes.task
        : (item: Item) => item.type === ItemTypes.event
    );
  if (state.itemsSlice.searchValue)
    items = items.filter(
      (item: Item) =>
        item.title
          .toLocaleLowerCase()
          .includes(state.itemsSlice.searchValue.toLocaleLowerCase()) ||
        !state.itemsSlice.searchValue
    );
  return items;
};

export default itemsSelector;
