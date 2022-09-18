import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Box, createTheme, Fade, ThemeProvider } from "@mui/material";
import { useState } from "react";
import AppFrame from "./components/AppFrame/AppFrame";
import Modal from "@mui/material/Modal";
import { Item } from "./types/dataTypes";
import GenericForm from "./components/GenericForm/GenericForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "85%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
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
                refresher={refresher}
              />
            )}
          </Box>
        </Fade>
      </Modal>

      <ReactNotifications />
      <AppFrame
        query={query}
        setQuery={setQuery}
        openModal={openModal}
        refresher={refresher}
      />
    </ThemeProvider>
  );
}

export default App;
