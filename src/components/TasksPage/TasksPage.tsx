import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import data from "../../assets/mock.json";
import { Task, Event } from "../../types/dataTypesInterfaces";
import Table from "../GenericTable/GenericTable";

const GenericPage = (props: { openModal: (editedItem: any) => boolean }) => {
  const [query, setQuery] = useState<string>("");
  const [allData, setAllData] = useState<(Event | Task)[]>(data.tasks);

  const filteredData: false | (Event | Task)[] =
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
        <Table
          data={filteredData || []}
          columns={[
            {
              key: "title",
              header: "Title",
            },
            {
              key: "priority",
              header: "priority",
            },
            {
              key: "description",
              header: "Description",
            },
          ]}
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

export default GenericPage;
