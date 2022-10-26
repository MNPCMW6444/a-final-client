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
  name: "counter",
  initialState,
  reducers: {
    refresh: (state: ItemsState, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    add: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    remove: (state: ItemsState, action: PayloadAction<string>) => {
      state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { refresh, add, remove } = itemsSlice.actions;

export default itemsSlice.reducer;
