export default {
  today: [
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
  ],
  events: [
    {
      key: "color",
      header: "Color",
      customRender: { blue: "🔵", red: "🔴" },
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
  ],
  tasks: [
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
  ],
};
