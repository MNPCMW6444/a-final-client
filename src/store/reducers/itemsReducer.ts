import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item, Task, Event } from "../../types";
import { ItemTypes } from "../../utils/enums";

export interface ItemsState {
  items: Item[];
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
      state.filteredItems = state.items.filter(
        action.payload === "today"
          ? (item: Item) =>
              item.type === ItemTypes.task
                ? (item as Task).untilDate.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
                : (item as Event).beginningTime.substring(0, 9) ===
                  new Date().toLocaleString().substring(0, 9)
          : action.payload === "tasks"
          ? (item: Item) => item.type === ItemTypes.task
          : (item: Item) => item.type === ItemTypes.event
      );
    },
    addItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
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
