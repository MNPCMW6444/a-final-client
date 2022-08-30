import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GenericPage from "../GenericPage/GenericPage";
import data from "../../assets/mock.json";
import { Task, Event } from "../../types/dataTypesInterfaces";

const CalendarRouter = (props: { openModal: (editedItem: any) => boolean }) => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <GenericPage
            openModal={props.openModal}
            allData={[...data.events, ...data.tasks].filter(
              (item) =>
                (item as Task).untilDate === new Date().toDateString() ||
                (item as Event).beginningTime === new Date().toDateString()
            )}
            columns={[
              {
                key: "title",
                header: "Title",
              },
              {
                key: "priority",
                header: "priority",
              },
              {
                key: "description",
                header: "Description",
              },
            ]}
          />
        }
      />
      <Route
        path="/tasks"
        element={
          <GenericPage
            openModal={props.openModal}
            allData={data.tasks}
            columns={[
              {
                key: "title",
                header: "Title",
              },
              {
                key: "priority",
                header: "priority",
              },
              {
                key: "description",
                header: "Description",
              },
            ]}
          />
        }
      />

      <Route
        path="/events"
        element={
          <GenericPage
            openModal={props.openModal}
            allData={data.events}
            columns={[
              {
                key: "title",
                header: "Title",
              },

              {
                key: "description",
                header: "Description",
              },
            ]}
          />
        }
      />
    </Routes>
  </Router>
);

export default CalendarRouter;
