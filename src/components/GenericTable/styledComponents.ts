import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledContent = styled(Box)(({ theme }) => ({}));

const StyledHeader = styled(Box)(() => ({
  textDecoration: "underline",
  fontWeight: 500,
}));

export { StyledContent, StyledHeader };
