import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Item } from "../../types/dataTypes";
import Table from "../GenericTable/GenericTable";
import {
  ColumnDefinitionType,
  OtherColumnDefinition,
} from "../../types/tableTypes";
import {
  innerGridSx,
  outerGridSx,
  textFieldSx,
  gridSx,
} from "./genericPageSxs";
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
      sx={outerGridSx}
      wrap="nowrap"
    >
      <Grid
        container
        item
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={innerGridSx}
      >
        <Grid item>
          <TextField
            variant="filled"
            inputProps={{
              style: { textAlign: "center" },
            }}
            label="Search By Title"
            onChange={(e) => setQuery(e.target.value)}
            sx={textFieldSx}
          />
        </Grid>
      </Grid>
      <br />
      <Grid item sx={gridSx}>
        <Table
          data={filteredData || ([] as Item[])}
          columns={props.columns}
          otherColumn={props.otherColumn}
        />
      </Grid>
      <br />

      <br />
      <Grid item>
        <Button variant="contained" onClick={() => props.openModal({})}>
          Create a New Item
        </Button>
      </Grid>
    </Grid>
  );
};

export default GenericPage;
