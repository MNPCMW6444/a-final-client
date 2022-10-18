import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
  Box,
  createTheme,
  CssBaseline,
  Fade,
  Modal,
  ThemeProvider,
} from "@mui/material";
import { useContext, useState } from "react";
import { Item } from "./types/index";
import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";
import useDataProcessor from "./hooks/useDataProcessor";
import FormContext from "./context/FormContext";
import GenericForm from "./components/GenericForm/GenericForm";

const modalStyle = {
  backgroundColor: "white",
  position: "fixed",
  minWidth: "540px",
  maxWidth: "700px",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  overflowX: "hidden",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "",
  },
};

function App() {
  const [query, setQuery] = useState<string>("");

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const {
    data,
    refresh,
  }: { data: Item[]; refresh: () => Promise<() => void> } = useDataProcessor();

  const commonProps = {
    setDrawerOpen: setDrawerOpen,
    drawerOpen: drawerOpen,
    refresh: refresh,
    query: query,
  };

  const { isFormOpen, item, dispatch } = useContext(FormContext);

  return (
    <ThemeProvider theme={createTheme()}>
      {isFormOpen && (
        <Modal
          open={isFormOpen}
          onClose={() =>
            dispatch({ type: "SET_STATE", state: { isFormOpen: false } })
          }
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isFormOpen}>
            <Box
              sx={modalStyle}
              width="42vw"
              height="80vh"
              border="0.2rem solid #000"
              boxShadow={24}
              borderRadius="5vw"
              padding="4vw"
            >
              <GenericForm item={item} refresh={refresh} />
            </Box>
          </Fade>
        </Modal>
      )}
      <ReactNotifications />
      <CssBaseline />
      <TopBar
        query={query}
        setQuery={setQuery}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      {data && data.length > 0 && (
        <CalendarRouter commonProps={commonProps} data={data} />
      )}
    </ThemeProvider>
  );
}

export default App;
