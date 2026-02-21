class Utils {
  static showElement(element) {
    element.style.display = "block";
    element.hiden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hiden = true;
  }
}

export default Utils;
