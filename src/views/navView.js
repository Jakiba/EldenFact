class NavView {
  _parentElement = document.querySelector("body");

  constructor() {
    //Responsible for dark/light-mode
    document
      .querySelector(".dark-light-mode")
      .addEventListener("click", function () {
        document.querySelector("body").classList.toggle("light-mode");
      });
  }

  //(Publisher-Subscriber-Pattern with controller.controlLoadBookmarks
  addHandlerLoadBookmarks(handlerFunction) {
    window.addEventListener("load", function () {
      console.log("works");
      handlerFunction();
    });
  }

  //(Publisher-Subscriber-Pattern with controller.controlBookmarkResults
  addHandlerBookmarkResults(handlerFunction) {
    document
      .querySelector(".nav-items")
      .lastElementChild.addEventListener("click", function (e) {
        e.preventDefault();
        handlerFunction();
      });
  }
}

export default new NavView();
