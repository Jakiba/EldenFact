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

//Responsible for the Functioniality of the 'sroll-to-top'-button.
const controlScrollToTop = function () {
  resultsView._heroElement.scrollIntoView({ behavior: "smooth" });
};

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

//Responsible for the Functioniality of the 'dark-light'-button.
const controlDarkWhiteMode = function () {
  navView._parentElement.classList.toggle("light-mode");
};

//Initializes the functions above. (Publisher-Subscriber-Pattern)
const init = function () {
  resultsView.addHandlerScrollToTop(controlScrollToTop);
  searchView.addHandlerSearch(controlSearch);
  navView.addHandlerDarkWhiteMode(controlDarkWhiteMode);
};
init();
