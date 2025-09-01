import { useEffect, useState } from "react";
import {
  canSendNotifications,
  getPermission,
  requestPermission,
  sendNotification,
} from "../Services/Notificacionservice";

export const useNotification = () => {
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    setSupported(canSendNotifications());
    setPermission(getPermission());
  }, []);

  const askPermission = async () => {
    const result = await requestPermission();
    setPermission(result);
    return result;
  };

  const notify = (options) => {
    sendNotification(options);
  };

  return {
    supported,
    permission, // 'granted' | 'denied' | 'default'
    canNotify: supported && permission === "granted",
    requestPermission: askPermission,
    notify,
  };
};
