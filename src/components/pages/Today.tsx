import React from "react";
import Search from "./today/Search";
import QuickFilters from "./today/QuickFilters";
import TodayTable from "./today/TodayTable";
import CreateButton from "./today/CreateButton";

export default function Today() {
  return (
    <div>
      <Search />
      <QuickFilters />
      <TodayTable />
      <CreateButton />
    </div>
  );
}
