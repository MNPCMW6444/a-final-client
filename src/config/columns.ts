const columnMap = new Map();
columnMap.set("today", [
  {
    key: "type",
    header: "Type",
  },
  {
    key: "priority",
    header: "Priority",
  },
  {
    key: "title",
    header: "Title",
  },
  { header: "Other", key: "other" },
  { header: "Actions", key: "actions" },
]);

columnMap.set("today", [
  {
    key: "type",
    header: "Type",
  },
  {
    key: "priority",
    header: "Priority",
  },
  {
    key: "title",
    header: "Title",
  },
  { header: "Other", key: "other" },
  { header: "Actions", key: "actions" },
]);

columnMap.set("events", [
  {
    key: "color",
    header: "Color",
  },
  {
    key: "title",
    header: "Title",
  },

  {
    key: "beginningTime",
    header: "From",
  },
  {
    key: "endingTime",
    header: "Until",
  },
  {
    key: "location",
    header: "Location",
  },
  { header: "Actions", key: "actions" },
]);

columnMap.set("tasks", [
  {
    key: "type",
    header: "Type",
  },
  {
    key: "priority",
    header: "Priority",
  },
  {
    key: "title",
    header: "Title",
  },
  {
    key: "status",
    header: "Status",
  },
  {
    key: "estimatedTime",
    header: "Estimated Time",
  },
  { header: "Other", key: "other" },
  { header: "Actions", key: "actions" },
]);

export default columnMap;
