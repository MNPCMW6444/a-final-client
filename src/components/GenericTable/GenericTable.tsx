import { PropaneTankRounded } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Item, Event } from "../../types/dataTypes";
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
            <TableCell>Other</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Item, index: number) => (
            <TableRow key={`row-${index}`}>
              {columns.map((column, index2) => {
                const content = row[column.key as keyof Item];
                return (
                  <TableCell key={`cell-${index2}`} sx={{ color: content }}>
                    {(column.key === "type"
                      ? (row as Event).beginningTime
                        ? "Event"
                        : "Task"
                      : typeof content === "object"
                      ? (content as unknown as Date).toLocaleString()
                      : content) || "-"}
                  </TableCell>
                );
              })}
              <TableCell>{"props.other"}</TableCell>
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
