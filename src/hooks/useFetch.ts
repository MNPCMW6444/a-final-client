import { useEffect, useState } from "react";
import Axios, { AxiosError, CancelTokenSource } from "axios";
import domain from "../config/domain";
import { Store } from "react-notifications-component";
import defaultNotificationSettings from "../config/notificationDefaultSettings";
import { Item } from "../interfaces/dataTypesInterfaces";

export default (endpoint: string, params: {}, dependencies: []): [Item[], React.Dispatch<React.SetStateAction<Item[]>>] => {
  let isFetching = false;

  const [data, setData] = useState<Item[]>([]);

  const getData = async (source: CancelTokenSource) => {
    isFetching = true;
    let res;
    try {
      res = (
        await Axios.get(domain + endpoint, {
          ...params,
          cancelToken: source.token,
        })
      ).data;
    } catch (err) {
      isFetching = false;
      Store.addNotification({
        title: "Error",
        message: (err as AxiosError).message,
        type: "danger",
        ...defaultNotificationSettings,
      });
    }
    if (isFetching) {
      isFetching = false;
      setData(res);
      Store.addNotification({
        title: "Success",
        message: "Data was fetched from the server",
        type: "success",
        ...defaultNotificationSettings,
      });
    }
  };

  useEffect(() => {
    const source = Axios.CancelToken.source();
    getData(source);
  }, dependencies);

  return [data, setData];
};
