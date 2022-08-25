/**
 *Responsible for getting all the data for the clicked category. We do that, by calling fetching the api normally first go get the amount of total results, which we then use to loop over the second fetch-request, in which we push the page of results we get into the 'resultsArray'. This gets us an array of arrays with all results, which we then flatten and return.
 * @param {string} searchQuery clicked category, so that the right url is used.
 * @returns {Array} Final array with all results.
 */
export const allSearchQueryData = async function (searchQuery) {
  try {
    const response = await fetch(
      `https://eldenring.fanapis.com/api/${searchQuery}?limit=20&page=0`
    );
    const data = await response.json();
    const maxNumber = Math.floor(data.total / 20);

    let resultsArray = [];
    for (let i = 0; i <= maxNumber; i++) {
      const response = await fetch(
        `https://eldenring.fanapis.com/api/${searchQuery}?limit=20&page=${i}`
      );
      const data = await response.json();
      resultsArray.push(data.data);
    }
    const finalResultsArray = resultsArray.flat();
    return finalResultsArray;
  } catch (err) {
    throw err;
  }
};

/**
 * Gets the searchQuery and searchTerm from "controlSearch", which then are used to fetch information from the right url.
 * @param {string} searchQuery category user is searching for.
 * @param {string} searchTerm  search term user used.
 * @returns {Array} array with all results for searchQuery and term
 */
export const searchItem = async function (searchQuery, searchTerm) {
  try {
    const response = await fetch(
      `https://eldenring.fanapis.com/api/${searchQuery}?name=${searchTerm}`
    );
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//saves the bookmarks in local storage
export const setLocalStorage = function () {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

/**
 * Responsible for fetching the data of an item trough its id.
 * @param {string} id id of each item user can see
 * @param {string} searchQuery type of item (weapon, shield,...)
 * @returns {array} returns the fetched data of the bookmarked item
 */
export const getBookmarkData = async function (id, searchQuery) {
  try {
    const response = await fetch(
      `https://eldenring.fanapis.com/api/${searchQuery}/${id}`
    );
    const data = await response.json();
    return data.data;
  } catch (err) {
    throw err;
  }
};

//Array in which each bookmark-data gets pushed (e.g [data, searchQuery])
export const bookmarks = [];
/**
 * Responsible for finding and deleting the right bookmark out of the bookmarks-array if user removes a bookmark.
 * @param {string} id id of each item user can see
 */
export const findAndRemoveFromArray = function (id) {
  const index = bookmarks.findIndex((arrId) => arrId[0].id === id);
  bookmarks.splice(index, 1);
};

//pushes each bookmark in local storage into the bookmarks-array, so that user can save his bookmarks even after closing page
export const getLocalStorage = function () {
  const storage = localStorage.getItem("bookmarks");
  JSON.parse(storage)?.forEach((savedBookmark) =>
    bookmarks.push(savedBookmark)
  );
};
