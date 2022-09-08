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
import {
  tableCellSx,
  tableHeaderSx,
  tableSx,
  longTextStyle,
  longTextStyleHover,
} from "./genericTableSxs";
import { useState } from "react";
import { Properties } from "csstype";
import otherColumn from "../../config/otherColumn";

interface TableProps {
  data: Item[];
  columns: Map<string, string>;
}

const GenericTable = ({ data, columns }: TableProps) => {
  const [hoveringLongText, setHoveringLongText] = useState<boolean>(false);
  const editItem = (item: Item) => {};
  const deleteItem = (item: Item) => {};
  return (
    <TableContainer>
      <Table aria-label="simple table" sx={tableSx}>
        <TableHead>
          <TableRow>
            {Array.from(columns, ([_, header]) => ({header })).map(
              (column, index) => (
                <TableCell key={`headCell-${index}`} sx={tableHeaderSx}>
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
                      sx={tableCellSx}
                    >
                      {column.key === "other" ? (
                        <>
                          <Grid
                            container
                            direction="row"
                            wrap="nowrap"
                            alignItems="center"
                          >
                            {Array.from(
                              otherColumn.get(row.type) as Map<string, string>,
                              ([key, header]) => ({
                                key,
                                header,
                              })
                            ).map((otherColumnMap, i) => (
                              <Grid
                                item
                                key={i}
                                sx={{
                                  width: "104px",
                                  paddingLeft: "5px",
                                  paddingRight: "5px",
                                  height: "10px",
                                }}
                              >
                                <StyledHeader>
                                  {otherColumnMap.header}
                                </StyledHeader>
                              </Grid>
                            ))}
                          </Grid>
                          <br />
                          <Grid
                            container
                            direction={"row"}
                            wrap="nowrap"
                            alignItems="center"
                          >
                            {Array.from(
                              otherColumn.get(row.type) as Map<string, string>,
                              ([key, header]) => ({
                                key,
                                header,
                              })
                            ).map((otherColumnMap, i) => (
                              <Grid
                                item
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                key={i}
                                sx={{
                                  width: "104px",
                                  paddingLeft: "5px",
                                  paddingRight: "5px",
                                }}
                              >
                                <StyledContent>
                                  {row[otherColumnMap.key as keyof Item]
                                    .length > 20 ? (
                                    <span
                                      style={
                                        (hoveringLongText
                                          ? longTextStyleHover
                                          : longTextStyle) as Properties<
                                          string | number,
                                          string & {}
                                        >
                                      }
                                      onMouseEnter={() =>
                                        setHoveringLongText(true)
                                      }
                                      onMouseLeave={() =>
                                        setHoveringLongText(false)
                                      }
                                    >
                                      {row[otherColumnMap.key as keyof Item]}
                                    </span>
                                  ) : (
                                    row[otherColumnMap.key as keyof Item]
                                  )}
                                </StyledContent>
                              </Grid>
                            ))}
                          </Grid>
                        </>
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
