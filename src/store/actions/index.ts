import { createAction } from "typesafe-actions";
import {
  FETCH_ITEMS,
  ADD_TASK,
  ADD_EVENT,
  EDIT_TASK,
  EDIT_EVENT,
  DELETE_TASK,
  DELETE_EVENT,
} from "../constants";

export const fetchItemsAction = createAction(
  FETCH_ITEMS,
  (resolve) => () => resolve()
);

export const addTaskAction = createAction(
  ADD_TASK,
  (resolve) => () => resolve()
);

export const addEventAction = createAction(
  ADD_EVENT,
  (resolve) => () => resolve()
);

export const editEventAction = createAction(
  EDIT_EVENT,
  (resolve) => () => resolve()
);

export const editTaskAction = createAction(
  EDIT_TASK,
  (resolve) => () => resolve()
);

export const deleteEventAction = createAction(
  DELETE_EVENT,
  (resolve) => () => resolve()
);

export const deleteTaskAction = createAction(
  DELETE_TASK,
  (resolve) => () => resolve()
);
