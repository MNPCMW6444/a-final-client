import colorMap from "../utils/colorMap";

const priorityMap = new Map();
priorityMap.set("Low", "Low");
priorityMap.set("Medium", "Medium");
priorityMap.set("High", "High");

const statusMap = new Map();
statusMap.set("Open", "Open");
statusMap.set("In Progress", "In Progress");
statusMap.set("Close", "Close");

const fieldMap = new Map();
const tasksMap = new Map();
tasksMap.set("title", {
  label: "Title",
  placeHolder: "Insert your title here...",
});
tasksMap.set("description", {
  label: "Description",
  placeHolder: "Insert your description here...",
});
tasksMap.set("estimatedTime", {
  label: "Estimated Time",
  placeHolder: "*y *w *d *h",
});
tasksMap.set("status", {
  label: "Status",
  dropDownOptions: statusMap,
});
tasksMap.set("priority", {
  label: "Priority",
  dropDownOptions: priorityMap,
});
fieldMap.set("Task", tasksMap);
const eventsMap = new Map();
eventsMap.set("title", {
  label: "Title",
  placeHolder: "Insert your title here...",
});
eventsMap.set("description", {
  label: "Description",
  placeHolder: "Insert your description here...",
});
eventsMap.set("beginningTime", {
  label: "Beginning Time",
  datePicker: true,
});
eventsMap.set("endingTime", {
  label: "Ending Time",
  datePicker: true,
});
eventsMap.set("color", {
  label: "color",
  dropDownOptions: colorMap,
});
eventsMap.set("location", {
  label: "Location",
  placeHolder: "Insert your location here...",
});
eventsMap.set("notificationTime", {
  label: "Notification Time",
  datePicker: true,
});
fieldMap.set("Event", eventsMap);

export default fieldMap;
