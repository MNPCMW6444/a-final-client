import "./tableStyle.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Item } from "../../types/dataTypes";
import {
  ColumnDefinitionType,
  OtherColumnDefinition,
} from "../../types/tableTypes";

interface TableProps {
  data: Item[];
  columns: ColumnDefinitionType[];
  otherColumn: OtherColumnDefinition;
}

const StyledContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  width: "100%",
  textAlign: "center",
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  textDecoration: "underline",
}));

const GenericTable = ({ data, columns, otherColumn }: TableProps) => {
  const editItem = (item: Item) => {};
  const deleteItem = (item: Item) => {};
  return (
    <TableContainer>
      <Table aria-label="simple table" sx={{ borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={`headCell-${index}`}
                sx={{
                  textAlign: "center",
                  backgroundColor: "orange",
                  border: "1px solid #ddd",
                }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Item, index: number) => (
            <TableRow key={`row-${index}`}>
              {columns.map((column, index2) => {
                const content = row[column.key as keyof Item];
                return (
                  <TableCell
                    key={`cell-${index2}`}
                    style={{ border: "1px solid #ddd" }}
                  >
                    {column.key === "other" ? (
                      <Grid
                        container
                        direction={"row"}
                        wrap="nowrap"
                        spacing={4}
                      >
                        {otherColumn[
                          row[
                            "type" as keyof Item
                          ] as keyof OtherColumnDefinition
                        ].map((otherColumnComponent, i) => (
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
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
