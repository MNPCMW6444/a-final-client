import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Item } from "../../types/dataTypes";
import Table from "../GenericTable/GenericTable";
import {
  ColumnDefinitionType,
  OtherColumnDefinition,
} from "../../types/tableTypes";
interface GenericPageProps {
  data: Item[];
  openModal: (editedItem: any) => boolean;
  columns: ColumnDefinitionType[];
  otherColumn: OtherColumnDefinition;
}

const GenericPage = (props: GenericPageProps) => {
  const [query, setQuery] = useState<string>("");

  const filteredData: false | Item[] =
    props.data &&
    props.data.length > 0 &&
    props.data.filter((item: any) => item.title.includes(query) || !query);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      width="100%"
      height="80%"
      sx={{ padding: "10%" }}
    >
      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <Grid item>
          <Typography>Serach: </Typography>
        </Grid>

        <Grid item>
          <TextField
            sx={{
              width: "60vw",
            }}
            label="Search By Title"
            variant="filled"
            onChange={(e) => setQuery(e.target.value)}
          />{" "}
        </Grid>
      </Grid>
      <Grid item>
        <Table
          data={filteredData || ([] as Item[])}
          columns={props.columns}
          otherColumn={props.otherColumn}
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
