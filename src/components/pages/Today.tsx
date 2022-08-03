import { useState } from "react";
import Search from "./today/Search";
import QuickFilters from "./today/QuickFilters";
import TodayTable from "./today/TodayTable";
import CreateButton from "./today/CreateButton";
import useFetch from "../../hooks/useFetch";
import { FormatListNumberedSharp } from "@mui/icons-material";

interface Item {
  type: string;
  priority: string;
  title: string;
  other: string;
  actions: string;
}

interface Event extends Item {
  type: "event";
}

interface Task extends Item {
  type: "task";
}

export default function Today() {
  const [query, setQuery] = useState("");
  const all: { events: Event[]; tasks: Task[] } = useFetch("all", {}, []);
  const filteredAll = typeof all === "object" && {
    events: all.events.filter(
      (event: Event) => event.title.includes(query) || !query
    ),
    tasks: all.tasks.filter(
      (task: Task) => task.title.includes(query) || !query
    ),
  };

  return (
    <div>
      <Search setQuery={setQuery} />
      <br />
      <QuickFilters />
      <br />
      <TodayTable all={filteredAll} />
      <br />
      <CreateButton />
    </div>
  );
}
