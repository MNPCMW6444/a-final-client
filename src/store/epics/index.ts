import { combineEpics } from "redux-observable";

import addEpic from "./addEpic";
import removeEpic from "./removeEpic";

const epics = combineEpics(addEpic, removeEpic);

export default epics;
