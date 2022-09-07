import "./tableStyle.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Item } from "../../types/dataTypes";
import { StyledContent, StyledHeader } from "./styledComponents";
import { tableCellSx, tableSx } from "./genericTableSxs";

interface TableProps {
  data: Item[];
  columns: Map<string, string>;
  otherColumn: Map<string, string>;
}

const GenericTable = ({ data, columns, otherColumn }: TableProps) => {
  const editItem = (item: Item) => {};
  const deleteItem = (item: Item) => {};
  return (
    <TableContainer>
      <Table aria-label="simple table" sx={tableSx}>
        <TableHead>
          <TableRow>
            {Array.from(columns, ([key, header]) => ({ key, header })).map(
              (column, index) => (
                <TableCell key={`headCell-${index}`} sx={tableCellSx}>
                  {column.header}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Item, index: number) => (
            <TableRow key={`row-${index}`}>
              {Array.from(columns, ([key, header]) => ({ key, header })).map(
                (column, innerIndex) => {
                  const content = row[column.key as keyof Item];
                  return (
                    <TableCell
                      key={`cell-${innerIndex}`}
                      style={{ border: "1px solid #ddd" }}
                    >
                      {column.key === "other" ? (
                        <Grid
                          container
                          direction={"row"}
                          wrap="nowrap"
                          spacing={4}
                        >
                          {Array.from(otherColumn, ([key, header]) => ({
                            key,
                            header,
                          })).map((otherColumnComponent, i) => (
                            <Grid
                              key={i}
                              container
                              item
                              justifyContent="center"
                              spacing={3}
                            >
                              <Grid item>
                                <StyledHeader>
                                  {otherColumnComponent.header}
                                </StyledHeader>
                              </Grid>
                              <Grid>
                                <StyledContent>
                                  {row[otherColumnComponent.key as keyof Item]
                                    .length > 20 ? (
                                    <span className="longtext">
                                      {
                                        row[
                                          otherColumnComponent.key as keyof Item
                                        ]
                                      }
                                    </span>
                                  ) : (
                                    row[otherColumnComponent.key as keyof Item]
                                  )}
                                </StyledContent>
                              </Grid>
                            </Grid>
                          ))}
                        </Grid>
                      ) : column.key === "actions" ? (
                        <>
                          <Button onClick={() => editItem(row)}> ✏️ </Button>
                          <Button onClick={() => deleteItem(row)}> 🗑️ </Button>
                        </>
                      ) : (
                        content || "-"
                      )}
                    </TableCell>
                  );
                }
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
