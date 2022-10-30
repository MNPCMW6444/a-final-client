import { Item, Task, Event } from "../../types";
import { ItemTypes, PageTypes } from "../../utils/enums";
import { RootState } from "../store";

const itemsSelector =
  (route: string, searchValue: string) => (state: RootState) => {
    let fullState = state.itemsSlice.items;
    if (route)
      fullState = fullState.filter(
        route === PageTypes.today
          ? (item: Item) =>
              item.type === ItemTypes.task
                ? (item as Task).untilDate.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
                : (item as Event).beginningTime.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
          : route === PageTypes.tasks
          ? (item: Item) => item.type === ItemTypes.task
          : (item: Item) => item.type === ItemTypes.event
      );
    if (searchValue)
      fullState = fullState.filter(
        (item: Item) =>
          item.title
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()) || !searchValue
      );
    return fullState;
  };

export default itemsSelector;
