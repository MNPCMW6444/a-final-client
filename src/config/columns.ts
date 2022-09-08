import { PageTypes } from "../utils/enums";

const columnMap = new Map();
const todayMap = new Map();
todayMap.set("type", "Type");
todayMap.set("priority", "Priorty");
todayMap.set("title", "Title");
todayMap.set("other", "Other");
todayMap.set("actions", "Actions");
columnMap.set(PageTypes.today, todayMap);
const tasksMap = new Map();
tasksMap.set("type", "Type");
tasksMap.set("priority", "Priorty");
tasksMap.set("title", "Title");
tasksMap.set("status", "Status");
tasksMap.set("estimatedTime", "Estimated Time");
tasksMap.set("other", "Other");
tasksMap.set("actions", "Actions");
columnMap.set(PageTypes.tasks, tasksMap);
const eventsMap = new Map();
eventsMap.set("color", "Color");
eventsMap.set("title", "Title");
eventsMap.set("beginningTime", "From");
eventsMap.set("endingTime", "Until");
eventsMap.set("location", "Location");
eventsMap.set("actions", "Actions");
columnMap.set(PageTypes.events, eventsMap);

export default columnMap;
