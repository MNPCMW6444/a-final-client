import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Properties } from "csstype";
import otherColumn from "../../config/otherColumn";
import { blue } from "@mui/material/colors";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { Item } from "../../types/index";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Axios from "axios";
import domain from "../../config/domain";
import drawerWidthSettings from "../../config/drawerWidthSettings";
import SideBar from "../SideBar/SideBar";
import quickFiltersConfig from "../../config/quickFilters";
import GenericQuickFilter from "../QuickFilter/QuickFilter";
import { Typography } from "@mui/material";
import { ItemTypes, PageTypes } from "../../utils/enums";
import FormContext from "../../context/FormContext";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeItem } from "../../store/reducers/itemsReducer";
import { useDispatch } from "react-redux";

interface GenericTableProps {
  commonProps: {
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
    searchValue: string;
    drawerOpen: boolean;
  };
  columns: Map<string, string> | undefined;
  route: string;
}

const outerGridSx = {
  overflow: "hidden",
};

const tableItemSx = { width: "100%", maxHeight: "60vh", overflowY: "scroll" };

const tableHeaderSx = (isClickable: boolean) => ({
  textAlign: "center",
  backgroundColor: blue[600],
  border: "0.1em solid #ddd",
  color: "white",
  cursor: isClickable ? "pointer" : "auto",
});

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

const GenericTable = ({ commonProps, columns, route }: GenericTableProps) => {
  const { setDrawerOpen, searchValue, drawerOpen } = commonProps;

  const data = useSelector(
    (state: RootState) => state.itemsSlice.filteredItems
  );

  const [optimizedData, setOptimizedData] = useState<Item[]>([]);

  const { setIsFormOpen, setItem } = useContext(FormContext);

  const [hoveringLongText, setHoveringLongText] = useState<boolean>(false);

  const [sortDirection, setSortDirection] = useState<boolean>(false);

  const [sortColumn, setSortColumn] = useState<string>("title");

  const [activeQuickFilters, setActiveQuickfilters] = useState<boolean[]>(
    quickFiltersConfig[
      PageTypes[
        route as keyof typeof PageTypes
      ] as keyof typeof quickFiltersConfig
    ].map(() => false)
  );

  const dispatch = useDispatch();

  const deleteItem = async (item: Item) => {
    await Axios.delete(domain + "delete" + item.type + "/" + item._id);
    dispatch(removeItem(item));
  };

  const sortData = (property: string) => {
    if (optimizedData)
      setOptimizedData(
        optimizedData.sort((itemA: Item, itemB: Item) => {
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
    let newData = data.filter(
      (item: Item) =>
        item.title
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) || !searchValue
    );
    activeQuickFilters.forEach((filter, index) => {
      if (filter)
        newData = newData.filter(
          quickFiltersConfig[
            PageTypes[
              route as keyof typeof PageTypes
            ] as keyof typeof quickFiltersConfig
          ][index].filterFunction
        );
    });
    newData.sort((itemA: Item, itemB: Item) => {
      return (
        (sortDirection ? -1 : 1) *
        itemA[sortColumn as keyof Item].localeCompare(
          itemB[sortColumn as keyof Item]
        )
      );
    });
    setOptimizedData(newData);
  }, [data, activeQuickFilters, searchValue, sortColumn, sortDirection, route]);

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
          {quickFiltersConfig[
            PageTypes[
              route as keyof typeof PageTypes
            ] as keyof typeof quickFiltersConfig
          ].map((filter, index) => (
            <Grid item key={index}>
              <GenericQuickFilter
                index={index}
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
                  {columns &&
                    Array.from(columns, ([key, header]) => ({
                      key,
                      header,
                    })).map((column, index) => {
                      return (
                        <TableCell
                          key={`headCell-${index}`}
                          sx={tableHeaderSx(
                            column.key !== "other" && column.key !== "actions"
                          )}
                          onClick={
                            column.key !== "other" && column.key !== "actions"
                              ? () => sortData(column.key)
                              : () => {}
                          }
                        >
                          {column.key !== "other" && column.key !== "actions"
                            ? column.header +
                              (sortColumn === column.key
                                ? sortDirection
                                  ? "↑"
                                  : "↓"
                                : "")
                            : column.header}
                        </TableCell>
                      );
                    })}
                </TableRow>
              </TableHead>
              <TableBody>
                {optimizedData &&
                  optimizedData.map((row: Item, index: number) => (
                    <TableRow key={`row-${index}`}>
                      {columns &&
                        Array.from(columns, ([key, header]) => ({
                          key,
                          header,
                        })).map((column, innerIndex) => {
                          const content = row[column.key as keyof Item];
                          const otherColumnValue = otherColumn.get(
                            row.type as ItemTypes
                          );
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
                                    {otherColumnValue &&
                                      Array.from(
                                        otherColumnValue as Map<string, string>,
                                        ([key, header]) => ({
                                          key,
                                          header,
                                        })
                                      ).map((otherColumnMap, index) => (
                                        <Grid item key={index} sx={otherStyle}>
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
                                      otherColumn.get(
                                        row.type as ItemTypes
                                      ) as Map<string, string>,
                                      ([key, header]) => ({
                                        key,
                                        header,
                                      })
                                    ).map((otherColumnMap, index) => (
                                      <Grid
                                        item
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        key={index}
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
                                            row[
                                              otherColumnMap.key as keyof Item
                                            ]
                                          )}
                                        </Box>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </>
                              ) : column.key === "actions" ? (
                                <>
                                  <Button
                                    sx={{ fontSize: "1.3rem" }}
                                    onClick={() => {
                                      setIsFormOpen(true);
                                      setItem(row);
                                    }}
                                  >
                                    ✏️
                                  </Button>
                                  <Button
                                    sx={{ fontSize: "1.3rem" }}
                                    onClick={() => deleteItem(row)}
                                  >
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
          <Button
            variant="contained"
            onClick={() => {
              setIsFormOpen(true);
              setItem({} as Item);
            }}
          >
            Create a New Item
          </Button>
        </Grid>
      </Grid>
      <Box component="nav" sx={navigationStyle}>
        <SideBar
          route={route}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </Box>
    </Box>
  );
};

export default GenericTable;
