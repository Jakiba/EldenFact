class SelectView {
  _parentElement = document.querySelectorAll(".button-show");

  /**
   *(Publisher) Responsible for adding the eventListener to each button, in which we change their style and set the searchQuery-argument, which then gets passed in into the handlerFunction.
   * @param {function} handlerFunction 'subscriber' "initButtons"
   */
  addHandlerSelect(handlerFunction) {
    this._parentElement.forEach((button) =>
      button.addEventListener("click", function () {
        document
          .querySelectorAll(".button-show")
          .forEach((button) => button.classList.remove("button-active"));
        button.classList.add("button-active");
        document.querySelector(".results").innerHTML = "";
        document.querySelector(".error-container").innerHTML = "";
        let searchQuery = button.textContent;
        handlerFunction(searchQuery);
      })
    );
  }
}

export default new SelectView();
