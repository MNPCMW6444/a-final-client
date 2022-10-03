const fieldMap = new Map([
  [
    "Event",
    new Map([
      [
        "title",
        {
          label: "Title",
          placeHolder: "Insert your title here...",
        },
      ],
      [
        "description",
        {
          label: "Description",
          placeHolder: "Insert your description here...",
        },
      ],
      [
        "beginningTime",
        {
          label: "Beginning Time",
          datePicker: true,
        },
      ],
      [
        "endingTime",
        {
          label: "Ending Time",
          datePicker: true,
        },
      ],
      [
        "color",
        {
          label: "color",
          dropDownOptions: [
            "🔴",
            "🟠",
            "🟡",
            "🟢",
            "🔵",
            "🟣",
            "⚫️",
            "⚪️",
            "🟤",
          ],
        },
      ],
      [
        "location",
        {
          label: "Location",
          placeHolder: "Insert your location here...",
        },
      ],
      [
        "notificationTime",
        {
          label: "Notification Time",
          datePicker: true,
        },
      ],
    ]),
  ],
  [
    "Task",
    new Map([
      [
        "title",
        {
          label: "Title",
          placeHolder: "Insert your title here...",
        },
      ],
      [
        "description",
        {
          label: "Description",
          placeHolder: "Insert your description here...",
        },
      ],
      [
        "estimatedTime",
        {
          label: "Estimated Time",
          placeHolder: "*y *w *d *h",
        },
      ],
      [
        "status",
        {
          label: "Status",
          dropDownOptions: ["Close", "In Progress", "Open"],
        },
      ],
      [
        "priority",
        {
          label: "Priority",
          dropDownOptions: ["Low", "Medium", "High"],
        },
      ],
    ]),
  ],
]);

export default fieldMap;
