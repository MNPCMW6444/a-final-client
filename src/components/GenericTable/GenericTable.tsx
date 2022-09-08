import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { Item } from "../../types/dataTypes";
import Table from "./GenericTable";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Item } from "../../types/dataTypes";
import { useState } from "react";
import { Properties } from "csstype";
import otherColumn from "../../config/otherColumn";
import { blue } from "@mui/material/colors";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

interface GenericTableProps {
  data: Item[];
  openModal: (editedItem: any) => boolean;
  columns: Map<string, string>;
  query: string;
}

// todo merge with generic table

const outerGridSx = {
  overflow: "hidden",
  paddingRight: "5%",
};

const tableItemSx = { width: "100%", maxHeight: "70vh", overflowY: "scroll" };

const tableHeaderSx = {
  textAlign: "center",
  backgroundColor: blue[600],
  border: "1px solid #ddd",
  color: "white",
};

const tableCellSx = {
  backgroundColor: "#AACCFF",
  border: "1px solid #ddd",
  color: "black",
  textAlign: "center",
  paddingLeft: "5px",
  paddingRight: "5px",
};

const longTextStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "inline-block",
  width: "104px",
};

const longTextStyleHover = {
  overflow: "scroll",
  whiteSpace: "normal",
  textOverflow: "unset",
  display: "block",
  width: "104px",
};

const tableSx = {
  borderCollapse: "collapse",
};

const StyledContent = styled(Box)(({ theme }) => ({}));

const StyledHeader = styled(Box)(() => ({
  textDecoration: "underline",
  fontWeight: 500,
}));

const GenericTable = ({
  data,
  openModal,
  columns,
  query,
}: GenericTableProps) => {
  const [paddingLeft, setPaddingLeft] = useState<number>(
    window.innerWidth > 600 ? 240 : 0
  );

  const filteredData: false | Item[] =
    data &&
    data.length > 0 &&
    data.filter((item: any) => item.title.includes(query) || !query);

  useEffect(() => {
    // window.addEventListener("resize", () =>
    //   setPaddingLeft(window.innerWidth > 600 ? 240 : 0)
    // );
  });

  const [hoveringLongText, setHoveringLongText] = useState<boolean>(false);
  const editItem = (item: Item) => {};
  const deleteItem = (item: Item) => {};

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
        <TableContainer>
          <Table aria-label="simple table" sx={tableSx}>
            <TableHead>
              <TableRow>
                {Array.from(columns, ([_, header]) => ({ header })).map(
                  (column, index) => (
                    <TableCell key={`headCell-${index}`} sx={tableHeaderSx}>
                      {column.header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row: Item, index: number) => (
                <TableRow key={`row-${index}`}>
                  {Array.from(columns, ([key, header]) => ({
                    key,
                    header,
                  })).map((column, innerIndex) => {
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
                                otherColumn.get(row.type) as Map<
                                  string,
                                  string
                                >,
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
                                otherColumn.get(row.type) as Map<
                                  string,
                                  string
                                >,
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
                            <Button onClick={() => deleteItem(row)}>
                              {" "}
                              🗑️{" "}
                            </Button>
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

export default GenericTable;
