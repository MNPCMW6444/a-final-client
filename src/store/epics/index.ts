import { Store } from "../store";

import { RootAction } from "../actions/index";

import { RootStateType } from "../store";

import { Epic } from "redux-observable";
import { tap, ignoreElements, filter } from "rxjs/operators";
import { isOfType } from "typesafe-actions";

// contrived example!!!
export const logAddAction: Epic<RootAction, RootStateType> = (
  action$,
  state$,
  { logger }
) =>
  action$.pipe(
    filter(isOfType(todosConstants.ADD)), // action is narrowed to: { type: "ADD_TODO"; payload: string; }
    tap((action) => {
      logger.log(
        `action type must be equal: ${todosConstants.ADD} === ${action.type}`
      );
    }),
    ignoreElements()
  );
