import Body from "./Body";
import BlueLogo from "./blueComponents/BlueLogo";
import BlueTitle from "./blueComponents/BlueTitle";
import BlueTime from "./blueComponents/BlueTime";
const { Sidebar, SidebarItem } = require("react-responsive-sidebar");

export default function SideBar() {
  const pages = [
    <SidebarItem>
      <BlueTime />
      <BlueTitle />
      <BlueLogo />
    </SidebarItem>,
    <SidebarItem href="/">Today</SidebarItem>,
    <SidebarItem href="/tasks">All Tasks</SidebarItem>,
    <SidebarItem href="/events">All Events</SidebarItem>,
  ];

  return (
    <div className="App">
      <Sidebar content={pages} background={"orange"} color={"blue"}>
        <Body />
      </Sidebar>
    </div>
  );
}
