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
import { Item } from "./types/dataTypes";
import GenericForm from "./components/GenericForm/GenericForm";
import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";
import blue from "@mui/material/colors/blue";

const style = {
  width: "80vw",
  height: "80vh",
  border: "0.2rem solid #000",
  boxShadow: 24,
  overflow: "scroll",
  backgroundColor: blue[50],
  borderRadius: "10vw",
  padding: "8vw",
  position: "fixed",
  left: "10vw",
  top: "10vh",
};

function App() {
  const [query, setQuery] = useState<string>("");

  const [editedItem, setEditedItem] = useState<Item>();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

  const [refresher, setRefreher] = useState<number>(0);
  const refresh = () => setRefreher(refresher + 1);

  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Box sx={style}>
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
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <CalendarRouter
        openModal={openModal}
        query={query}
        refresher={refresher}
        refresh={refresh}
        mobileOpen={mobileOpen}
      />
    </ThemeProvider>
  );
}

export default App;
