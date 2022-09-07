import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  width: "100%",
  textAlign: "center",
}));

const StyledHeader = styled(Box)(() => ({
  textAlign: "center",
  textDecoration: "underline",
}));

export { StyledContent, StyledHeader };
