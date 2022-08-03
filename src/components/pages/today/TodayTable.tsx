import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./todayStyles.css";
import Axios, { CancelTokenSource } from "axios";
import domain from "../../../domain";
import { iNotification, Store } from "react-notifications-component";
const defaultSettings: iNotification = {
  container: "bottom-center",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 3000,
    onScreen: true,
  },
  insert: "top",
};

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
  let isFetching = false;

  const getAll = async (source: CancelTokenSource) => {
    isFetching = true;
    Store.removeAllNotifications();
    Store.addNotification({
      title: "Connecting to Server",
      message: "Trying for 3 seconds to fetch data",
      type: "info",

      ...defaultSettings,
    });
    const promise = Axios.get(domain + "all", { cancelToken: source.token });
    promise.then((res) => {
      setAll([...res.data.events, ...res.data.tasks]);
      Store.removeAllNotifications();
      Store.addNotification({
        title: "Success",
        message: "Data was fetched from the server",
        type: "success",

        ...defaultSettings,
      });
      isFetching = false;
    });
    promise.catch((err) => {
      if (err.message !== "canceled") {
        Store.removeAllNotifications();
        Store.addNotification({
          title: "Error",
          message: err.message,
          type: "danger",

          ...defaultSettings,
        });
      }
      isFetching = false;
    });
  };

  useEffect(() => {
    const source = Axios.CancelToken.source();
    getAll(source);
    return () => {
      setTimeout(() => {
        if (isFetching) {
          source.cancel();
          Store.removeAllNotifications();
          Store.addNotification({
            title: "Error!",
            message: "Connection to server Timeout",
            type: "danger",

            ...defaultSettings,
          });
          isFetching = false;
        }
      }, 3000);
    };
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
            all.map((item, i) => (
              <Tr key={i}>
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
