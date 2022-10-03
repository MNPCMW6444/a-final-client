import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
  Box,
  createTheme,
  CssBaseline,
  Fade,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Item } from "./types/index";
import GenericForm from "./components/GenericForm/GenericForm";
import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";

const modalStyle = {
  width: "42vw",
  height: "80vh",
  border: "0.2rem solid #000",
  boxShadow: 24,
  backgroundColor: "white",
  borderRadius: "5vw",
  padding: "4vw",
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

  const [editedItem, setEditedItem] = useState<Item>();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

  const [refresher, setRefreher] = useState<number>(0);
  const refresh = () => setRefreher(refresher + 1);

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const openModal = (editedItem: any) => {
    setIsCreateFormOpen(true);
    setEditedItem(editedItem);
  };

  const closeModal = () => setIsCreateFormOpen(false);

  return (
    <ThemeProvider theme={createTheme()}>
      <Modal
        open={isCreateFormOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isCreateFormOpen}>
          <Box sx={modalStyle}>
            {editedItem && (
              <GenericForm
                closeForm={closeModal}
                item={editedItem}
                refresh={refresh}
              />
            )}
          </Box>
        </Fade>
      </Modal>
      <ReactNotifications />
      <CssBaseline />
      <TopBar
        query={query}
        setQuery={setQuery}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <CalendarRouter
        setDrawerOpen={setDrawerOpen}
        openModal={openModal}
        query={query}
        refresher={refresher}
        refresh={refresh}
        drawerOpen={drawerOpen}
      />
    </ThemeProvider>
  );
}

export default App;
