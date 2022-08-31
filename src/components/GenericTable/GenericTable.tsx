import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Item } from "../../types/dataTypes";
import { ColumnDefinitionType } from "../../types/tableTypes";

interface TableProps {
  data: Item[];
  columns: ColumnDefinitionType[];
}

const GenericTable = <T, K extends keyof T>({ data, columns }: TableProps) => {
  const editItem = (item: Item) => {};
  const deleteItem = (item: Item) => {};

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={`headCell-${index}`}>{column.header}</TableCell>
            ))}
            <TableCell>More</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Item, index: number) => (
            <TableRow key={`row-${index}`}>
              {columns.map((column, index2) => {
                return (
                  <TableCell key={`cell-${index2}`}>
                    {row[column.key] + "" || "-"}
                  </TableCell>
                );
              })}
              <TableCell>
                <Button onClick={() => editItem(row)}> ✏️ </Button>
                <Button onClick={() => deleteItem(row)}> 🗑️ </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
