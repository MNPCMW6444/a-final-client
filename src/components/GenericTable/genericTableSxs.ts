const tableHeaderSx = {
  textAlign: "center",
  backgroundColor: "#0066FF",
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

export {
  tableHeaderSx,
  tableCellSx,
  tableSx,
  longTextStyle,
  longTextStyleHover,
};
