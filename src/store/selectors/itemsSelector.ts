import { createSelector } from "@reduxjs/toolkit";
import { Item, Task, Event } from "../../types";
import { ItemTypes, PageTypes } from "../../utils/enums";
import { ItemsState } from "../reducers/itemsReducer";

const selectFilterItems = (state: ItemsState) => state.items;
const selectPageType = (state: ItemsState) => state.pageType;
const selectSearchValue = (state: ItemsState) => state.searchValue;

const itemsSelector = createSelector(
  selectFilterItems,
  selectPageType,
  selectSearchValue,
  (items, pageType, searchValue) => {
    if (pageType)
      items = items.filter(
        pageType === PageTypes.today
          ? (item: Item) =>
              item.type === ItemTypes.task
                ? (item as Task).untilDate.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
                : (item as Event).beginningTime.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
          : pageType === PageTypes.tasks
          ? (item: Item) => item.type === ItemTypes.task
          : (item: Item) => item.type === ItemTypes.event
      );
    if (searchValue)
      items = items.filter(
        (item: Item) =>
          item.title
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()) || !searchValue
      );
    return items;
  }
);

export default itemsSelector;
