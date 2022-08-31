import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { ColumnDefinitionType } from "../../types/tableTypes";

type GenericTableBodyProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType>;
};

const style = {
  border: "1px solid black",
};

const GenericTableBody = <T, K extends keyof T>({
  data,
  columns,
}: GenericTableBodyProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <TableRow key={`row-${index}`}>
        {columns.map((column, index2) => {
          return (
            <TableCell key={`cell-${index2}`} style={style}>
              {(row as any)[column.key] || "-"}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default GenericTableBody;
