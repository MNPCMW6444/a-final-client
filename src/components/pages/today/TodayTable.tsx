import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./todayStyles.css";
import Axios from "axios";
import domain from "../../../domain";

export default function TodayTable() {
  const [all, setAll] = useState([
    {
      type: "loading...",
      priority: "loading...",
      title: "loading...",
      other: "loading...",
      actions: "loading...",
    },
  ]);

  useEffect(() => {
    const promise = Axios.get(domain + "all");
    promise.then((res) => setAll(res.data));
    return () => {};
  }, []);

  return (
    <div className="todayTable">
      <Table>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Priority</Th>
            <Th>Title</Th>
            <Th>Other</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {all &&
            all.length > 0 &&
            all.map((item) => (
              <Tr>
                <Td>{item.type}</Td>
                <Td>{item.priority}</Td>
                <Td>{item.title}</Td>
                <Td>{item.other}</Td>
                <Td>{item.actions}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </div>
  );
}
