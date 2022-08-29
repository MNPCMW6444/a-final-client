import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

type ColumnDefinitionType = {
  key: string;
  header: string;
  width?: number;
};

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType>;
};

const style = {
  border: "1px solid black",
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element => {
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

  return <tbody>{rows}</tbody>;
};

export default TableRows;
