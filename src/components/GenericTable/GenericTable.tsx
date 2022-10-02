import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Properties } from "csstype";
import otherColumn from "../../config/otherColumn";
import { blue } from "@mui/material/colors";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { Item } from "../../types/dataTypes";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Axios from "axios";
import domain from "../../config/domain";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import SideBar from "../SideBar/SideBar";
import quickFiltersConfig from "../../config/quickFilters";
import GenericQuickFilter from "./GenericQuickFilter";
import { Typography } from "@mui/material";
import { PageTypes } from "../../utils/enums";

interface GenericTableProps {
  drawerOpen: boolean;
  data: Item[];
  openModal: (editedItem: any) => void;
  columns: Map<string, string>;
  query: string;
  refresh: () => void;
  route: string;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const outerGridSx = {
  overflow: "hidden",
};

const tableItemSx = { width: "100%", maxHeight: "70vh", overflowY: "scroll" };

const tableHeaderSx = {
  textAlign: "center",
  backgroundColor: blue[600],
  border: "0.1em solid #ddd",
  color: "white",
};

const tableCellSx = {
  backgroundColor: blue[200],
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

const StyledHeader = styled(Box)(() => ({
  textDecoration: "underline",
  fontWeight: 500,
}));

const tableStyle = {
  ml: { sm: `${drawerWidthSettings.width}px` },
  flexGrow: 1,
  padding: "5%",
  width: drawerWidthSettings.autoWidth,
  overflowX: "scroll",
};

const otherStyle = {
  width: "104px",
  paddingLeft: "5px",
  paddingRight: "5px",
  height: "10px",
};

const innerOtherStyle = {
  width: "104px",
  paddingLeft: "5px",
  paddingRight: "5px",
};

const navigationStyle = {
  width: { sm: drawerWidthSettings.width },
  flexShrink: { sm: 0 },
};

const GenericTable = ({
  drawerOpen,
  data,
  openModal,
  columns,
  query,
  refresh,
  route,
  setDrawerOpen,
}: GenericTableProps) => {
  const [filteredData, setFilteredData] = useState<Item[]>(
    data.filter((item: Item) => {
      return (
        item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        !query
      );
    })
  );

  const pageType = PageTypes[route as keyof typeof PageTypes];

  const [hoveringLongText, setHoveringLongText] = useState<boolean>(false);

  const [sortDirection, setSortDirection] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>();

  const [activeQuickFilters, setActiveQuickfilters] = useState<boolean[]>(
    quickFiltersConfig[pageType].map(() => false)
  );

  const deleteItem = async (item: Item) => {
    await Axios.delete(domain + "delete" + item.type + "/" + item._id);
    refresh();
  };

  const sortData = (property: string) => {
    if (filteredData)
      setFilteredData(
        (filteredData as Item[]).sort((itemA: Item, itemB: Item) => {
          setSortDirection(!sortDirection);
          setSortColumn(property);
          return (
            (sortDirection ? 1 : -1) *
            itemA[property as keyof Item].localeCompare(
              itemB[property as keyof Item]
            )
          );
        })
      );
  };

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item: Item) =>
          item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          !query
      )
    );
    setActiveQuickfilters(quickFiltersConfig[pageType].map(() => false));
  }, [data, query, route]);

  useEffect(() => {
    debugger;
    let newData = data.filter(
      (item: Item) =>
        item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
        !query
    );
    activeQuickFilters.forEach((filter, i) => {
      if (filter)
        newData = newData.filter(
          quickFiltersConfig[pageType][i].filterFunction
        );
    });
    setFilteredData(newData);
  }, [activeQuickFilters]);

  return (
    <Box component="main" sx={tableStyle}>
      <Grid
        container
        direction="column"
        alignItems="center"
        width="100%"
        sx={outerGridSx}
        rowSpacing={3}
      >
        <Grid item container alignItems="center" columnSpacing={1}>
          <Grid item>
            <Typography variant="button" fontSize="1.2em">
              Filters:
            </Typography>
          </Grid>
          {quickFiltersConfig[pageType].map((filter, i) => (
            <Grid item>
              <GenericQuickFilter
                key={i}
                index={i}
                name={filter.name}
                isActive={activeQuickFilters}
                setIsActive={setActiveQuickfilters}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item sx={tableItemSx}>
          <TableContainer>
            <Table sx={tableSx}>
              <TableHead>
                <TableRow>
                  {Array.from(columns, ([key, header]) => ({
                    key,
                    header,
                  })).map((column, index) => {
                    debugger;
                    return (
                      <TableCell
                        key={`headCell-${index}`}
                        sx={tableHeaderSx}
                        onClick={() => sortData(column.key)}
                      >
                        {column.header +
                          (sortColumn === column.key
                            ? sortDirection
                              ? "↑"
                              : "↓"
                            : "")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData &&
                  filteredData.map((row: Item, index: number) => (
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
                                    <Grid item key={i} sx={otherStyle}>
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
                                      sx={innerOtherStyle}
                                    >
                                      <Box>
                                        {row[
                                          otherColumnMap.key as keyof Item
                                        ] &&
                                        row[otherColumnMap.key as keyof Item]
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
                                            {
                                              row[
                                                otherColumnMap.key as keyof Item
                                              ]
                                            }
                                          </span>
                                        ) : (
                                          row[otherColumnMap.key as keyof Item]
                                        )}
                                      </Box>
                                    </Grid>
                                  ))}
                                </Grid>
                              </>
                            ) : column.key === "actions" ? (
                              <>
                                <Button onClick={() => openModal(row)}>
                                  ✏️
                                </Button>
                                <Button onClick={() => deleteItem(row)}>
                                  🗑️
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
          <Button variant="contained" onClick={() => openModal({} as Item)}>
            Create a New Item
          </Button>
        </Grid>
      </Grid>
      <Box component="nav" sx={navigationStyle}>
        <SideBar
          route={route}
          refresh={refresh}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </Box>
    </Box>
  );
};

export default GenericTable;
