const otherColumnMap = new Map();
const todayMap = new Map();
const eventMap = new Map();
eventMap.set("beginningTime", "From");
eventMap.set("endingTime", "Until");
eventMap.set("location", "Location");
const taskMap = new Map();
taskMap.set("review", "Review:");
taskMap.set("status", "Status:");
taskMap.set("timeSpent", "Time Spent:");
taskMap.set("untilDate", "Until Date:");
otherColumnMap.set("Today", todayMap);
otherColumnMap.set("Event", eventMap);
otherColumnMap.set("Task", taskMap);

export default otherColumnMap;
