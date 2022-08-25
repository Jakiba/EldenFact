import * as model from "./model";
import resultsView from "./views/resultsView";
import selectView from "./views/selectView";
import searchView from "./views/searchView";
import navView from "./views/navView";

import "core-js/stable";
import "regenerator-runtime/runtime";

/**
 * Responsible for getting the data from "model.js" and rendering the data according to the clicked button. Gets called by the "initButtons"-Function.
 * @param {string} searchQuery The category (button) selected by the user, so that the right card can be rendered. (Defined in "selectView.addHandlerSelect()")
 * @returns {undefined}
 */
const controlItemView = async function (searchQuery) {
  try {
    resultsView._renderSpinner();
    const data = await model.allSearchQueryData(searchQuery);
    resultsView.clear();
    console.log(data);
    data.forEach((result) => resultsView._renderResults(result, searchQuery));
  } catch (err) {
    console.error(err);
  }
};

/**
 * Responsible for initializing the "controllItemView"-Function with the correct searchQuery. Gets called by "selectView.addHandlerSelect()". (Publisher-Subscriber-Pattern)
 * @param {string} searchQuery The category (button) selected by the user, so that the right card can be rendered. (Defined in "selectView.addHandlerSelect()")
 * @returns {undefined}
 */
const initButtons = function (searchQuery) {
  controlItemView(searchQuery);
};
selectView.addHandlerSelect(initButtons);

/**
 * Responsible for the Functioniality of the search-bar. If user searches for sth, the input will be destructured into 'query' and 'searchTerm', which then get passed into 'model.searchItem', which fetches the correct data. The results then get rendered.
 * @returns {undefined}
 */
const controlSearch = async function () {
  try {
    resultsView._renderSpinner();
    const [searchQuery, searchTerm] = searchView._getQuery().split(",");
    const data = await model.searchItem(searchQuery, searchTerm);
    resultsView.clear();
    if (data.length === 0) throw new Error();
    data.forEach((searchResult) =>
      resultsView._renderResults(searchResult, searchQuery)
    );
  } catch (err) {
    console.error(err);
    resultsView.clear();
    resultsView._renderErrorMessage();
  }
};

/**
 * (Publisher-Subscriber-Pattern) Responsible for filling bookmark icon on click and pushing bookmarked item data into the model.bookmarks-array (if item is not bookmarked) or removing the filling of bookmark-icon on click and removing it from the model.bookmarks-array (if item is bookmarked)
 * @param {object} event event-object passed down from  resultsView.addHandlerBookmark for event delegation (items are not rendered on page-load so necessary)
 * @returns {undefined}
 */
const controlBookmarks = async function (event) {
  try {
    const target = event.target.closest(".bookmark-icon");
    if (!target) return;
    if (!target.classList.contains("bookmark-icon-fill")) {
      target.classList.add("bookmark-icon-fill");
      console.log(target.previousElementSibling);
      console.log(
        target.previousElementSibling.dataset.id,
        target.parentElement.parentElement.dataset.searchQuery
      );
      const data = await model.getBookmarkData(
        target.previousElementSibling.dataset.id,
        target.parentElement.parentElement.dataset.searchQuery
      );
      console.log(data);
      data.bookmark = true;
      model.bookmarks.push([
        data,
        target.parentElement.parentElement.dataset.searchQuery,
      ]);
      model.setLocalStorage();
      return;
    }
    if (target.classList.contains("bookmark-icon-fill")) {
      target.classList.remove("bookmark-icon-fill");
      model.findAndRemoveFromArray(target.previousElementSibling.dataset.id);
      model.setLocalStorage();
      return;
    }
  } catch (err) {
    resultsView._renderErrorMessage();
  }
};

/**
 * (Publisher-Subscriber-Pattern) Responsible for rendering each bookmark in the model.bookmark-array when clicking on 'bookmarks' in navbar.
 */
const controlBookmarkResults = function () {
  document
    .querySelectorAll(".button-show")
    .forEach((button) => button.classList.remove("button-active"));
  resultsView._parentElement.innerHTML = "";
  model.bookmarks.forEach((bookmark) =>
    resultsView._renderResults(bookmark[0], bookmark[1])
  );
  document.querySelector(".results").scrollIntoView({ behavior: "smooth" });
};

//Responsible for pushing each bookmark in local storage into the bookmarks-array, so that user can save his bookmarks even after closing page
const controlLoadBookmarks = function () {
  model.getLocalStorage();
};

//Initializes the functions above. (Publisher-Subscriber-Pattern)
const init = function () {
  searchView.addHandlerSearch(controlSearch);
  resultsView.addHandlerBookmark(controlBookmarks);
  navView.addHandlerBookmarkResults(controlBookmarkResults);
  navView.addHandlerLoadBookmarks(controlLoadBookmarks);
};
init();
