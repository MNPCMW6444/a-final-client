import { TableHead, TableRow } from "@mui/material";

type ColumnDefinitionType = {
  key: string;
  header: string;
};
type GenericTableHeadProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType>;
};

const GenericTableHead = <T, K extends keyof T>({
  columns,
}: GenericTableHeadProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    const style = {
      borderBottom: "2px solid black",
    };

    return (
      <th key={`headCell-${index}`} style={style}>
        {column.header}
      </th>
    );
  });

  return (
    <TableHead>
      <TableRow sx={{border:"2px solid gray"}}>{headers}</TableRow>
    </TableHead>
  );
};

export default GenericTableHead;
