import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item, Task, Event } from "../../types";
import { ItemTypes, PageTypes } from "../../utils/enums";

export interface ItemsState {
  items: Item[];
  filterType?: string;
  filteredItems: Item[];
}

const initialState: ItemsState = {
  items: [],
  filteredItems: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setAllItems: (state: ItemsState, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    filterItems: (state: ItemsState, action: PayloadAction<string>) => {
      state.filterType = action.payload;
      state.filteredItems = state.items.filter(
        action.payload === PageTypes.today
          ? (item: Item) =>
              item.type === ItemTypes.task
                ? (item as Task).untilDate.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
                : (item as Event).beginningTime.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
          : action.payload === PageTypes.tasks
          ? (item: Item) => item.type === ItemTypes.task
          : (item: Item) => item.type === ItemTypes.event
      );
    },
    addItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
      const firstCondition = state.filterType === PageTypes.today;
      let fullCondition = false;
      if (firstCondition)
        fullCondition =
          firstCondition && action.payload.type === ItemTypes.task
            ? (action.payload as Task).untilDate.substring(0, 9) ===
              new Date().toLocaleString().substring(0, 9)
            : (action.payload as Event).beginningTime.substring(0, 9) ===
              new Date().toLocaleString().substring(0, 9);

      if (fullCondition) state.filteredItems.push(action.payload);
      if (
        state.filterType === PageTypes.tasks &&
        action.payload.type === ItemTypes.task
      )
        state.filteredItems.push(action.payload);

      if (
        state.filterType === PageTypes.events &&
        action.payload.type === ItemTypes.event
      )
        state.filteredItems.push(action.payload);
    },
    editItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items.push(action.payload);
      state.filteredItems = state.filteredItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.filteredItems.push(action.payload);
    },
    removeItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.filteredItems = state.filteredItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { setAllItems, filterItems, addItem, editItem, removeItem } =
  itemsSlice.actions;

export default itemsSlice.reducer;
