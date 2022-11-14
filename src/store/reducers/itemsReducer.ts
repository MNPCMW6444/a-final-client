import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item, Task, Event } from "../../types";
import { ItemTypes, PageTypes } from "../../utils/enums";

export type ItemsState = {
  items: Item[];
  pageType: PageTypes;
  searchValue: string;
};

const colorMap = new Map();
colorMap.set("Red", "🔴");
colorMap.set("Orange", "🟠");
colorMap.set("Yellow", "🟡");
colorMap.set("Green", "🟢");
colorMap.set("Blue", "🔵");
colorMap.set("Purple", "🟣");
colorMap.set("Black", "⚫️");
colorMap.set("White", "⚪️");
colorMap.set("Brown", "🟤");

const initialState: ItemsState = {
  items: [],
  pageType: PageTypes.today,
  searchValue: "",
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setAllItems: (state: ItemsState, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    addItem: (state: ItemsState, action: PayloadAction<Item>) => {
      // can return a pormise or a "waiting message to the UI"
    },
    editItem: (state: ItemsState, action: PayloadAction<Item>) => {
      let event, task;
      if (action.payload.type === ItemTypes.event)
        event = action.payload as Event;
      if (action.payload.type === ItemTypes.task) task = action.payload as Task;
      if (event) {
        event.beginningTime =
          new Date(event.beginningTime).toLocaleDateString() +
          ", " +
          new Date(event.beginningTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.beginningTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.endingTime =
          new Date(event.endingTime).toLocaleDateString() +
          ", " +
          new Date(event.endingTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.endingTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.notificationTime =
          new Date(event.notificationTime + "").toLocaleDateString() +
          ", " +
          new Date(event.notificationTime + "")
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.notificationTime + "")
                .toLocaleTimeString()
                .indexOf(":", 3)
            );
        event.color = colorMap.get(event.color);
        event.type = ItemTypes.event;
      }
      if (task) {
        task.type = ItemTypes.task;
        task.untilDate =
          new Date(task.untilDate).toLocaleDateString() +
          ", " +
          new Date(task.untilDate)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(task.untilDate).toLocaleTimeString().indexOf(":", 3)
            );
        task.type = ItemTypes.task;
      }
      const item = task || event;
      state.items = state.items.filter(
        (currentItem) => currentItem._id !== (item && item._id)
      );
      item && state.items.push(item);
    },
    removeItem: (state: ItemsState, action: PayloadAction<Item>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    addItemLocally: (state: ItemsState, action: PayloadAction<Item>) => {
      let event, task;
      if (
        action.payload.type === ItemTypes.event ||
        action.payload.__typename === ItemTypes.event
      )
        event = action.payload as Event;
      if (
        action.payload.type === ItemTypes.task ||
        action.payload.__typename === ItemTypes.task
      )
        task = action.payload as Task;
      if (event) {
        event.beginningTime =
          new Date(event.beginningTime).toLocaleDateString() +
          ", " +
          new Date(event.beginningTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.beginningTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.endingTime =
          new Date(event.endingTime).toLocaleDateString() +
          ", " +
          new Date(event.endingTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.endingTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.notificationTime =
          new Date(event.notificationTime + "").toLocaleDateString() +
          ", " +
          new Date(event.notificationTime + "")
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.notificationTime + "")
                .toLocaleTimeString()
                .indexOf(":", 3)
            );
        event.color = colorMap.get(event.color);
        event.type = ItemTypes.event;
      }
      if (task) {
        task.type = ItemTypes.task;
        task.untilDate =
          new Date(task.untilDate).toLocaleDateString() +
          ", " +
          new Date(task.untilDate)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(task.untilDate).toLocaleTimeString().indexOf(":", 3)
            );
        task.type = ItemTypes.task;
      }
      const item = task || event;
      item && state.items.push(item);
    },
    editItemLocally: (state: ItemsState, action: PayloadAction<Item>) => {
      let event, task;
      if (action.payload.type === ItemTypes.event)
        event = action.payload as Event;
      if (action.payload.type === ItemTypes.task) task = action.payload as Task;
      if (event) {
        event.beginningTime =
          new Date(event.beginningTime).toLocaleDateString() +
          ", " +
          new Date(event.beginningTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.beginningTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.endingTime =
          new Date(event.endingTime).toLocaleDateString() +
          ", " +
          new Date(event.endingTime)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.endingTime).toLocaleTimeString().indexOf(":", 3)
            );
        event.notificationTime =
          new Date(event.notificationTime + "").toLocaleDateString() +
          ", " +
          new Date(event.notificationTime + "")
            .toLocaleTimeString()
            .substring(
              0,
              new Date(event.notificationTime + "")
                .toLocaleTimeString()
                .indexOf(":", 3)
            );
        event.color = colorMap.get(event.color);
        event.type = ItemTypes.event;
      }
      if (task) {
        task.type = ItemTypes.task;
        task.untilDate =
          new Date(task.untilDate).toLocaleDateString() +
          ", " +
          new Date(task.untilDate)
            .toLocaleTimeString()
            .substring(
              0,
              new Date(task.untilDate).toLocaleTimeString().indexOf(":", 3)
            );
        task.type = ItemTypes.task;
      }
      const item = task || event;
      state.items = state.items.filter(
        (currentItem) => currentItem._id !== (item && item._id)
      );
      item && state.items.push(item);
    },
    removeItemLocally: (state: ItemsState, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    navigate: (state: ItemsState, action: PayloadAction<PageTypes>) => {
      state.pageType = action.payload;
    },
    search: (state: ItemsState, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  setAllItems,
  addItem,
  editItem,
  removeItem,
  addItemLocally,
  editItemLocally,
  removeItemLocally,
  navigate,
  search,
} = itemsSlice.actions;

export const actions = itemsSlice.actions;

export default itemsSlice.reducer;
