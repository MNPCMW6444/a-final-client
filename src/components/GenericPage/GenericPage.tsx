import { useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
import Create from "../Create/Create";
import useFetch from "../../hooks/useFetch";
import { Grid, TextField } from "@mui/material";
import { Event, Task } from "../../interfaces/dataTypesInterfaces";

const GenericPage = (props: { type: string; time: string }): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const [allData, setAllData]: [{ events: Event[]; tasks: Task[] }, Function] =
    useFetch(props.type + "-" + props.time, {}, []);
  const filteredAllData = typeof allData === "object" && {
    events:
      allData.events &&
      allData.events instanceof Array &&
      allData.events.length > 0 &&
      allData.events.filter(
        (event: Event) => event.title.includes(query) || !query
      ),
    tasks:
      allData.tasks &&
      allData.tasks instanceof Array &&
      allData.tasks.length > 0 &&
      allData.tasks.filter(
        (task: Task) => task.title.includes(query) || !query
      ),
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
        <TextField
          sx={{
            width: "100%",
          }}
          label="Search By Title"
          variant="standard"
          onChange={(e) => setQuery(e.target.value)}
        />
        <GenericTable
          allData={filteredAllData}
          setAllData={setAllData}
          type={props.type}
        />
        <Create />
      </Grid>
    </Grid>
  );
};

export default GenericPage;
