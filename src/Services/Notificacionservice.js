
export const canSendNotifications = () => {
  return "Notification" in window;
};

export const getPermission = () => {
  if (!canSendNotifications()) return "denied";
  return Notification.permission; // 'granted' | 'denied' | 'default'
};

export const requestPermission = () => {
  if (!canSendNotifications()) return Promise.resolve("denied");
  return Notification.requestPermission();
};

export const sendNotification = ({ title, body, icon }) => {
  if (!canSendNotifications() || Notification.permission !== "granted") return;
  new Notification(title, { body, icon });
};
