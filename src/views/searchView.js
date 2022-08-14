class SearchView {
  /**
   *(Publisher) Responsible for adding the eventListener (submit-event) to the search bar and then call the subsriber, in which the data is to render.
   * @param {function} handlerFunction 'subscriber' "controlSearch"
   */
  addHandlerSearch(handlerFunction) {
    document.querySelector(".search").addEventListener("submit", function (e) {
      e.preventDefault();
      document.querySelector(".results").innerHTML = "";
      document.querySelector(".error-container").innerHTML = "";
      document
        .querySelectorAll(".button-show")
        .forEach((button) => button.classList.remove("button-active"));
      handlerFunction();
    });
  }

  //gets the value from the search-bar.
  _getQuery() {
    const query = document.getElementById("quotes-search").value;
    document.getElementById("quotes-search").value = "";
    return query;
  }
}

export default new SearchView();
