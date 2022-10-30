import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../types";

export interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setAllItems: (state: ItemsState, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    addItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    editItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items.push(action.payload);
    },
    removeItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { setAllItems, addItem, editItem, removeItem } =
  itemsSlice.actions;

export default itemsSlice.reducer;
