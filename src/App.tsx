import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import CalanderRouter from "./components/CalendarRouter/CalendarRouter";
import Clock from "./components/Clock/Clock";
import Grid from "@mui/material/Grid";
import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import BT from "./assets/BT.png";
import Modal from "react-modal";
import { useState } from "react";
import CreateForm from "./components/CreateForm/CreateForm";
import EditForm from "./components/EditForm/EditForm";
import { Item } from "./interfaces/dataTypesInterfaces";

const { Sidebar, SidebarItem } = require("react-responsive-sidebar");

function App() {
  const pages = [
    <SidebarItem>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="40%"
      >
        <Clock size="h6" />
        <Typography variant="h4" component="h4">
          Blue Calendar
        </Typography>
        <Box
          component="img"
          sx={{
            height: { xs: "28vw" },
            width: { xs: "28vw" },
            maxHeight: { xs: "250px" },
            maxWidth: { xs: "250px" },
          }}
          alt="Blue Torch Logo"
          src={BT}
        />
      </Grid>
    </SidebarItem>,
    <SidebarItem href="/">Today</SidebarItem>,
    <SidebarItem href="/tasks">All Tasks</SidebarItem>,
    <SidebarItem href="/events">All Events</SidebarItem>,
  ];

  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<Item>();

  const openModal = (editedItem:Item): boolean => {
    setIsCreateFormOpen(true);
    setEditedItem(editedItem);
    return true;
  };

  const closeModal = () => {
    setIsCreateFormOpen(false);
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Modal
        isOpen={isCreateFormOpen}
        onRequestClose={closeModal}
        contentLabel="Create Form"
        style={{
          content: {
            top: "10vh",
            left: "10vw",
            right: "10vw",
            bottom: "10vh",
          },
        }}
      >
        {editedItem ? (
          <EditForm
            closeEditForm={closeModal}
            item={editedItem}
          />
        ) : (
          <CreateForm closeCreateForm={closeModal} />
        )}
      </Modal>
      <ReactNotifications />
      <Sidebar content={pages} background={"orange"} color={"blue"}>
        <CalanderRouter openModal={openModal} />
      </Sidebar>
    </ThemeProvider>
  );
}

export default App;
