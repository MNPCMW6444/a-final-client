import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { pingEpic } from "./epics";
import pingReducer from "./reducers/pingpong";

const epicMiddleware = createEpicMiddleware(pingEpic as unknown as any);

export default createStore(pingReducer, applyMiddleware(epicMiddleware));
