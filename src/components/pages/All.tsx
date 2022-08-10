import { useState } from "react";
import Search from "./all/Search";
import QuickFilters from "./all/QuickFilters";
import AllTable from "./all/AllTable";
import Create from "./all/Create";
import useFetch from "../../hooks/useFetch";

interface Event {
  title: String;
  description: String;
  beginningTime: Date;
  endingTime: Date;
  color: String;
  invitedGuests: String;
  location: String;
  estimatedTime: Date;
}

interface Task {
  title: String;
  description: String;
  estimatedTime: Date;
  status: String;
  priority: String;
}

export default function All(props: { type: string; time: string }) {
  const [query, setQuery] = useState("");
  const all: { events: Event[]; tasks: Task[] } = useFetch(
    props.type + "-" + props.time,
    {},
    []
  );
  const filteredAll = typeof all === "object" && {
    events:
      all.events &&
      all.events instanceof Array &&
      all.events.length > 0 &&
      all.events.filter(
        (event: Event) => event.title.includes(query) || !query
      ),
    tasks:
      all.tasks &&
      all.tasks instanceof Array &&
      all.tasks.length > 0 &&
      all.tasks.filter((task: Task) => task.title.includes(query) || !query),
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
