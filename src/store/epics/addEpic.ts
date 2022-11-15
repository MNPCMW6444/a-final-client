import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { mergeMap } from "rxjs/operators";
import { Epic, ofType } from "redux-observable";
import { ItemTypes } from "../../utils/enums";
import { Item } from "../../types";
import { itemActions } from "../constants/constans";
import { addItemLocally, ItemsState } from "../reducers/itemsReducer";

import store, { ActionsType, StoreEnhancer } from "../store";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const createTask = gql`
  mutation Mutation($newItem: TaskInput) {
    createTask(newItem: $newItem) {
      _id
      title
      description
      estimatedTime
      status
      priority
      untilDate
      review
      timeSpent
    }
  }
`;

const createEvent = gql`
  mutation Mutation($newItem: EventInput) {
    createEvent(newItem: $newItem) {
      _id
      title
      description
      beginningTime
      endingTime
      color
      invitedGuests
      location
      notificationTime
    }
  }
`;

const addItemsEpic: Epic<ActionsType, ActionsType, ItemsState, typeof store> = (
  action$,
  _,
  storeEnhancer
) =>
  action$.pipe(
    ofType(itemActions.addItem),
    mergeMap(async (action: ActionsType) => {
      const item = action.payload as Item;
      delete item?._id;
      delete item?.__typename;
      const res = await client.mutate({
        mutation: item?.type === ItemTypes.event ? createEvent : createTask,
        variables: { newItem: item },
      });
      if (!res.errors)
        (storeEnhancer as unknown as StoreEnhancer)
          .store()
          .dispatch(addItemLocally(action.payload as Item));
      else return { errMsgs: res.errors };
      return res.data;
    })
  );

export default [addItemsEpic];
