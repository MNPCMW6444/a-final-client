import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";

import TopBar from "./components/TopBar/TopBar";
import CalendarRouter from "./components/CalendarRouter/CalendarRouter";
import { FormProvider } from "./context/FormContext";
import useDataProcessor from "./hooks/useDataProcessor";
import { gql, useQuery } from "@apollo/client";

function App() {
  //const data = useDataProcessor();

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const commonProps = {
    setDrawerOpen: setDrawerOpen,
    drawerOpen: drawerOpen,
  };

  const GET_LOCATIONS = gql`
    query GetLocations {
      locations {
        id
        name
        description
        photo
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.locations.map(
    ({
      id,
      name,
      description,
      photo,
    }: {
      id: string;
      name: string;
      description: string;
      photo: string;
    }) => (
      <div key={id}>
        <h3>{name}</h3>
        <img
          width="400"
          height="250"
          alt="location-reference"
          src={`${photo}`}
        />
        <br />
        <b>About this location:</b>
        <p>{description}</p>
        <br />
      </div>
    )
  );

  return (
    <FormProvider>
      <ThemeProvider theme={createTheme()}>
        <ReactNotifications />
        <CssBaseline />
        <TopBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <ShowIf show={data && data.length > 0}>
          <CalendarRouter commonProps={commonProps} data={data} />
        </ShowIf>
      </ThemeProvider>
    </FormProvider>
  );
}

const ShowIf = ({ show, children }: { show: boolean; children: JSX.Element }) =>
  show ? children : <></>;

export default App;
