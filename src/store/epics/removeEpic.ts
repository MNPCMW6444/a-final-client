import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { mergeMap } from "rxjs/operators";
import { Epic, ofType } from "redux-observable";
import { Item } from "../../types";
import { itemActions } from "../constants/constans";
import { ItemsState } from "../reducers/itemsReducer";

import { ActionsType, StoreEnhancer } from "../store";
import domain from "../../config/domain";

const client = new ApolloClient({
  uri: "http://" + domain + "/graphql",
  cache: new InMemoryCache(),
});

const deleteEvent = gql`
  mutation Mutation($id: String) {
    deleteEvent(id: $id)
  }
`;

const deleteTask = gql`
  mutation Mutation($id: String) {
    deleteTask(id: $id)
  }
`;

const removeItemsEpic: Epic<
  ActionsType,
  ActionsType,
  ItemsState,
  StoreEnhancer
> = (action$) =>
  action$.pipe(
    ofType(itemActions.removeItem),
    mergeMap(async (action: ActionsType) => {
      const res = await client.mutate({
        mutation:
          (action.payload as Item).type === "Event" ? deleteEvent : deleteTask,
        variables: {
          id: (action.payload as Item)._id,
        },
      });
      debugger;
      if (!res.errors)
        return {
          type: itemActions.removeItemLocally,
          payload: res.data.deleteTask || res.data.deleteEvent,
        };
      else
        return {
          type: "error",
          payload: res.data.deleteTask || res.data.deleteEvent,
        };
    })
  );

export default removeItemsEpic;
