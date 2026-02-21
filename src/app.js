import "./style/style.css";
import "./script/components/index.js";
import home from "./script/view/home.js";

// Wait for DOM to be fully loaded before setting note list and event listeners
document.addEventListener("DOMContentLoaded", () => {
  home();
});
