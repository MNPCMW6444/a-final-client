import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { Item } from "../../types/dataTypes";
import Table from "../GenericTable/GenericTable";

import { outerGridSx, tableItemSx } from "./genericPageSxs";
interface GenericPageProps {
  data: Item[];
  openModal: (editedItem: any) => boolean;
  columns: Map<string, string>;
  otherColumn: Map<string, Map<string, string>>;
  query: string;
}

const GenericPage = ({
  data,
  openModal,
  columns,
  otherColumn,
  query,
}: GenericPageProps) => {
  const [paddingLeft, setPaddingLeft] = useState<number>(
    window.innerWidth > 600 ? 240 : 0
  );

  const filteredData: false | Item[] =
    data &&
    data.length > 0 &&
    data.filter((item: any) => item.title.includes(query) || !query);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setPaddingLeft(window.innerWidth > 600 ? 240 : 0)
    );
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      width="100%"
      sx={{
        ...outerGridSx,
        paddingLeft: "calc(" + paddingLeft + "px + 5%)",
      }}
      wrap="nowrap"
    >
      <Grid item sx={tableItemSx}>
        <Table
          data={filteredData || ([] as Item[])}
          columns={columns}
          otherColumn={otherColumn}
        />
      </Grid>
      <br />
      <Grid item>
        <Button variant="contained" onClick={() => openModal({})}>
          Create a New Item
        </Button>
      </Grid>
    </Grid>
  );
};

export default GenericPage;
