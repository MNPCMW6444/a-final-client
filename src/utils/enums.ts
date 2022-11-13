enum PageTypes {
  today = "today",
  events = "events",
  tasks = "tasks",
}

enum ItemTypes {
  event = "Event",
  task = "Task",
}

enum SubscribtionTypes {
  add = "add",
  edit = "edit",
  delete = "delete",
}

enum Mutations {
  addEvent = "addEvent",
  addTask = "addTask",
  editEvent = "editEvent",
  editTask = "editTask",
  deleteEvent = "deleteEvent",
  deleteTask = "deleteTask",
}

export { PageTypes, ItemTypes, SubscribtionTypes, Mutations };
