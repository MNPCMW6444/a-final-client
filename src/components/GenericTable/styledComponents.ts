import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  width: "100%",
  textAlign: "center",
  borderRadius: "20%",
  margin: "5%",
}));

const StyledHeader = styled(Box)(() => ({
  textAlign: "center",
  textDecoration: "underline",
  fontWeight: 500,
  borderRadius: "20%",
  margin: "5%",
}));

export { StyledContent, StyledHeader };
