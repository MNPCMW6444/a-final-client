import { useState } from "react";
import Search from "./all/Search";
import QuickFilters from "./all/QuickFilters";
import AllTable from "./all/AllTable";
import Create from "./all/Create";
import useFetch from "../../hooks/useFetch";

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

export default function All(props: { type: string; time: string }) {
  const [query, setQuery] = useState("");
  const all: { events: Event[]; tasks: Task[] } = useFetch(
    props.type + "-" + props.time,
    {},
    []
  );
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
      <AllTable all={filteredAll} />
      <br />
      <Create />
    </div>
  );
}
