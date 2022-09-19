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
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "0.2rem solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  backgroundColor: blue[50],
  borderRadius: "50px",
};

function App() {
  const [query, setQuery] = useState<string>("");

  const [editedItem, setEditedItem] = useState<Item>();
  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

  const [refresher, setRefreher] = useState<number>(0);
  const refresh = () => setRefreher(refresher + 1);

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
      <TopBar query={query} setQuery={setQuery} />
      <CalendarRouter
        openModal={openModal}
        query={query}
        refresher={refresher}
        refresh={refresh}
      />
    </ThemeProvider>
  );
}

export default App;
