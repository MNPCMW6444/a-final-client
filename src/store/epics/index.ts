import { combineEpics } from "redux-observable";

import itemsEpic from "./itemsEpic";

const epics = combineEpics(...itemsEpic);

export default epics;
