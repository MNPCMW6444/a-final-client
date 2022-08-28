import { useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
//import useFetch from "../../hooks/useFetch";
import { Button, Grid, TextField } from "@mui/material";
import data from "../../assets/mock.json";
import { Task, Event } from "../../types/dataTypesInterfaces";

const EventsPage = (props: {
  openModal: (editedItem: any) => boolean;
  type: string;
  time: string;
}) => {
  const [query, setQuery] = useState<string>("");
  const [allData, setAllData] = useState<Event[]>(data.events);

  const filteredData: false | Event[] =
    allData &&
    allData.length > 0 &&
    allData.filter((item: any) => item.title.includes(query) || !query);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      width="100%"
      height="80%"
      sx={{ padding: "10%" }}
    >
      <Grid item>
        <TextField
          sx={{
            width: "100%",
          }}
          label="Search By Title"
          variant="standard"
          onChange={(e) => setQuery(e.target.value)}
        />
      </Grid>
      <Grid item>
        <GenericTable
          allData={filteredData}
          setAllData={setAllData}
          type={"events"}
          openModal={props.openModal}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => props.openModal({} as any)}>
          Create a New Item
        </Button>
      </Grid>
    </Grid>
  );
};

export default EventsPage;
