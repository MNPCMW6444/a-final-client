import { useState } from "react";
import GenericTable from "../GenericTable/GenericTable";
//import useFetch from "../../hooks/useFetch";
import { Button, Grid, TextField } from "@mui/material";
import { Item } from "../../types/dataTypesInterfaces";
import data from "../../assets/mock.json";

const GenericPage = (props: {
  openModal: (editedItem: Item) => boolean;
  type: string;
  time: string;
}) => {
  const [query, setQuery] = useState<string>("");
  const [allData, setAllData] = useState<Item[]>([
    ...data.events,
    ...data.tasks,
  ]);
  const filteredData =
    allData &&
    allData.length > 0 &&
    allData.filter((item) => item.title.includes(query) || !query);

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
          allData={filteredData}
          setAllData={setAllData}
          type={props.type}
          openModal={props.openModal}
        />
        <Button variant="contained" onClick={() => props.openModal({} as Item)}>
          Create a New Item
        </Button>
      </Grid>
    </Grid>
  );
};

export default GenericPage;
