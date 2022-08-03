import "./App.css";
import SideBar from "./components/SideBar";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <>
      <ReactNotifications />
      <SideBar />
    </>
  );
}

export default App;
