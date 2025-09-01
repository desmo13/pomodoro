export const useNotification = () => {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      console.log("Notifications are supported");
    }
}