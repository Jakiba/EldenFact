class PaginationView {
  _parentElement = document.querySelector(".button-icon-wrapper");

  addHandlerPagination(handlerFunction) {
    let page = 0;
    this._parentElement.addEventListener("click", function (e) {
      const button = e.target.closest(".button");
      // console.log(button);
      if (!button) return;

      document.querySelector(".results").innerHTML = "";
      document.querySelector(".error-container").innerHTML = "";
      if (button.classList.contains("pagination-back")) {
        console.log("last");
        page -= 1;
      }
      if (button.classList.contains("pagination-next")) {
        console.log("next");
        page += 1;
      }

      handlerFunction(page);
    });
  }

  _clearContainer() {
    document
      .querySelectorAll(".button-container")
      .forEach((container) => container.remove());
  }

  _renderPaginationbuttons(page, searchQuery) {
    const arrowLeftHTML = `
    <div class="button-container">
    <button class="pagination-back button">
    <span class="page-number">${page - 1}</span>
    <svg
    class="arrow-icon"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
    fill-rule="evenodd"
    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
    clip-rule="evenodd"
    ></path>
    </svg>
    </button>
    </div>`;
    const arrowRightHTML = `
    <div class="button-container">
     <button class="pagination-next button">
      <svg
       class="arrow-icon"
       fill="currentColor"
       viewBox="0 0 20 20"
       xmlns="http://www.w3.org/2000/svg"
       >
       <path
       fill-rule="evenodd"
       d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
       clip-rule="evenodd"
       ></path>
      </svg>
      <span class="page-number">${page + 1}</span>
       </button>
    </div>`;

    if (page === 0) {
      this._clearContainer();
      this._parentElement.insertAdjacentHTML("beforeend", arrowRightHTML);
    }

    if (page > 0 && page < maxPages) {
      this._clearContainer();

      this._parentElement.insertAdjacentHTML("beforeend", arrowRightHTML);
      this._parentElement.insertAdjacentHTML("afterbegin", arrowLeftHTML);
    }

    if (page === maxPages) {
      this._clearContainer();
      this._parentElement.insertAdjacentHTML("afterbegin", arrowLeftHTML);
    }
  }
}

export default new PaginationView();
