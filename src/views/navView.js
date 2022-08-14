class NavView {
  _parentElement = document.querySelector("body");

  /**
   * (Publisher) Responsible for adding the eventListener (click-event) to the dark-light-button.
   * @param {function} handlerFunction 'subscriber' "controlDarkWhiteMode"
   */
  addHandlerDarkWhiteMode(handlerFunction) {
    document
      .querySelector(".dark-light-mode")
      .addEventListener("click", function () {
        handlerFunction();
      });
  }
}

export default new NavView();
