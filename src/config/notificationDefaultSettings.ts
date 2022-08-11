import { iNotification } from "react-notifications-component";
const settings: iNotification = {
  container: "bottom-center",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 1500,
    onScreen: true,
  },
  insert: "top",
};
export default settings;
