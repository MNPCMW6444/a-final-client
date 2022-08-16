import { useState } from "react";
import Search from "./generic-page-components/Search";
import AllTable from "./generic-page-components/GenericTable";
import Create from "./generic-page-components/Create";
import useFetch from "../../hooks/useFetch";
import { Grid } from "@mui/material";

interface Event {
  _id: String;
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
  _id: String;
  title: String;
  description: String;
  estimatedTime: Date;
  status: String;
  priority: String;
  review: String;
  timeSpent: number;
  location: string;
  notificationTime: Date;
}

export default function GenericPage(props: { type: string; time: string }) {
  const [query, setQuery] = useState("");
  const [all, setAll]: [{ events: Event[]; tasks: Task[] }, Function] =
    useFetch(props.type + "-" + props.time, {}, []);
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
    <Grid
      container
      direction="row"
      justifyContent="center"
      width="100%"
      height="80%"
    >
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        height="100%"
        width="70%"
      >
        <Search setQuery={setQuery} />
        <AllTable all={filteredAll} setAll={setAll} type={props.type} />
        <Create />
      </Grid>
    </Grid>
  );
}
