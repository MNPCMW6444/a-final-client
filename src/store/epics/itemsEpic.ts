import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { exhaustMap, filter, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { actions, ActionsType } from "..";
import * as API from "../../services/Api";
import { CalanderState } from "../reducers/itemsReducer";

export const itemsEpic: Epic<
  ActionsType,
  ActionsType,
  CalanderState,
  typeof API
> = (action$, store, { fetchItems }) =>
  action$.pipe(
    filter(isActionOf(actions.fetchItemsAction)),
    exhaustMap((action) =>
      from(fetchItems()).pipe(
        map(actions.weatherSetAction),
        catchError((error) => of(actions.weatherErrorAction(error)))
      )
    )
  );

export default [itemsEpic];
