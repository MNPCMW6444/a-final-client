import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Test() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setvalue] = useState("");

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (v: string) => {
    setvalue(v);
    setAnchorEl(null);
  };

  return (
    <Box bgcolor="red" height="500px" width="500px">
      <Box bgcolor="yellow" height="450px" width="150px">
        <TextField
          onClick={handleClick}
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        >
          Open dropdown menu
        </TextField>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ position: "absolute" }}
        >
          <MenuItem onClick={() => handleClose("Option 1")}>Option 1</MenuItem>
          <MenuItem onClick={() => handleClose("Option 2")}>Option 2</MenuItem>
          <MenuItem onClick={() => handleClose("Option 3")}>Option 3</MenuItem>
        </Menu>{" "}
      </Box>
    </Box>
  );
}
