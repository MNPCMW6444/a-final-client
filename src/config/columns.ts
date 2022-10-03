import { PageTypes } from "../utils/enums";

const columnMap = new Map([
  [
    PageTypes.today,
    new Map([
      ["type", "Type"],
      ["priority", "Priorty"],
      ["title", "Title"],
      ["other", "Other"],
      ["actions", "Actions"],
    ]),
  ],
  [
    PageTypes.tasks,
    new Map([
      ["type", "Type"],
      ["priority", "Priorty"],
      ["title", "Title"],
      ["status", "Status"],
      ["estimatedTime", "Estimated Time"],
      ["other", "Other"],
      ["actions", "Actions"],
    ]),
  ],
  [
    PageTypes.events,
    new Map([
      ["color", "Color"],
      ["title", "Title"],
      ["beginningTime", "From"],
      ["endingTime", "Until"],
      ["location", "Location"],
      ["actions", "Actions"],
    ]),
  ],
]);

export default columnMap;
