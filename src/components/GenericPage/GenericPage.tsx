import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
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
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="80%"
      sx={{ padding: "10%" }}
      wrap="nowrap"
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
          <TextField
            variant="filled"
            inputProps={{
              style: { textAlign: "center" },
            }}
            label="Search By Title"
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              backgroundColor: "rgba(255, 149, 0, 0.59)",
              borderRadius: "10px",
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid item sx={{ width: "100%" }}>
        <Table
          data={filteredData || ([] as Item[])}
          columns={props.columns}
          otherColumn={props.otherColumn}
        />
      </Grid>
      <br />

      <br />
      <Grid item>
        <Button variant="contained" onClick={() => props.openModal({} as any)}>
          Create a New Item
        </Button>
      </Grid>
    </Grid>
  );
};

export default GenericPage;
