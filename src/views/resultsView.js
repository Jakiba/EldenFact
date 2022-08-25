class ResultsView {
  _parentElement = document.querySelector(".results");
  _spinnerElement = document.querySelector(".spinner");
  _heroElement = document.querySelector(".button-wrapper");
  _bookmarkIcon = document.querySelector(".results");

  constructor() {
    //Responsible for the ''to-the-top''-button
    document
      .querySelector(".to-the-top-button")
      .addEventListener("click", function () {
        document
          .querySelector(".button-wrapper")
          .scrollIntoView({ behavior: "smooth" });
      });
  }

  //(Publisher-Subscriber-Pattern with controller.controlBookmarks
  addHandlerBookmark(handlerFunction) {
    this._bookmarkIcon.addEventListener("click", function (e) {
      handlerFunction(e);
    });
  }

  //renders the error-message
  _renderErrorMessage() {
    const html = `
      <h3 class="error-message">
        could not find item/s... Try somehting else!
      </h3>
    `;

    document
      .querySelector(".error-container")
      .insertAdjacentHTML("beforeend", html);
  }

  //renders the spinner
  _renderSpinner() {
    const html = `
        <div class='spinner-container'>
         <svg
            class="spinner-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            >
            <defs>
              <filter id="g">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="1"
                  result="b"
                />
                <feColorMatrix
                  in="b"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                  result="g"
                />
                <feBlend in="SourceGraphic" in2="g" />
              </filter>
            </defs>
            <g filter="url(#g)">
              <circle cx="5" cy="12" r="4">
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2s"
                  values="5;8;5"
                  keySplines=".36,.62,.43,.99;.79,0,.58,.57"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="19" cy="12" r="4">
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2s"
                  values="19;16;19"
                  keySplines=".36,.62,.43,.99;.79,0,.58,.57"
                  repeatCount="indefinite"
                />
              </circle>
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="0.75s"
                values="0 12 12;360 12 12"
                repeatCount="indefinite"
              />
            </g>
          </svg>
        </div>
    `;

    this._spinnerElement.insertAdjacentHTML("afterbegin", html);
  }

  //clears the spinner and error-container.
  clear() {
    document.querySelector(".spinner").innerHTML = "";
    document.querySelector(".error-container").innerHTML = "";
  }

  /**
   * Responsible for rendering the right html, depending on which category is searched for or clicked on.
   * @param {Array} data array with the information of the result.
   * @param {string} searchQuery correct category.
   */
  _renderResults(data, searchQuery, bookmark) {
    let html = "";

    if (searchQuery === "weapons" || searchQuery === "shields") {
      html += `
      <div class="search-result-weapon" data-search-query=${searchQuery}>
    <div class="result-img-box-weapon">
      <img class="result-img-weapon" src=${data.image} />
    </div>

    <div class='weapon-name'>
      <h3 class="name" data-id=${data.id}>${data.name}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
        data.bookmark === true ? "bookmark-icon-fill" : ""
      }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
    </div>

    <div class="result-information-weapon">
      <div class="weapon-attack">
        <span class="property-style">Attack</span>
        <p class="ammo-flex">
          <span>Phy:</span>
          <span>${data.attack[0].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-magic">Mag:</span>
          <span>${data.attack[1].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-fire">Fire:</span>
          <span>${data.attack[2].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-lightning">Ligt:</span>
          <span>${data.attack[3].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-holy">Holy:</span>
          <span>${data.attack[4].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-crit">Crit:</span>
          <span>${data.attack[5].amount}</span>
        </p>
      </div>
      <div class="weapon-guard">
        <span class="property-style">Guard</span>
        <p class="ammo-flex">
          <span>Phy:</span>
          <span>${data.defence[0].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-magic">Mag:</span>
          <span>${data.defence[1].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-fire">Fire:</span>
          <span>${data.defence[2].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-lightning">Ligt:</span>
          <span>${data.defence[3].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-holy">Holy:</span>
          <span>${data.defence[4].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-boost">Boost:</span>
          <span>${data.defence[5].amount}</span>
        </p>
      </div>
    </div>

    <div class="weapon-scaling-required">
      <div class="scaling">
        <span class="property-style">Scaling</span>
        <p class="ammo-flex">
          <span>Str:</span>
          <span>${data.scalesWith[0] ? data.scalesWith[0].scaling : "-"}</span>
        </p>
        <p class="ammo-flex">
          <span>Dex:</span>
          <span>${data.scalesWith[1] ? data.scalesWith[1].scaling : "-"}</span>
        </p>
        <p class="ammo-flex">
          <span>Int:</span>
          <span>${data.scalesWith[2] ? data.scalesWith[2].scaling : "-"}</span>
        </p>
        <p class="ammo-flex">
          <span>Faith:</span>
          <span>${data.scalesWith[3] ? data.scalesWith[3].scaling : "-"}</span>
        </p>
        <p class="ammo-flex">
          <span>Arcane:</span>
          <span>${data.scalesWith[4] ? data.scalesWith[4].scaling : "-"}</span>
        </p>
      </div>
      <div class="required-stats">
        <span class="property-style">Requires</span>
        <p class="ammo-flex">
          <span>Str:</span>
          <span>${
            data.requiredAttributes[0] ? data.requiredAttributes[0].amount : "0"
          }</span>
        </p>
        <p class="ammo-flex">
          <span>Dex:</span>
          <span>${
            data.requiredAttributes[1] ? data.requiredAttributes[1].amount : "0"
          }</span>
        </p>
        <p class="ammo-flex">
          <span>Int:</span>
          <span>${
            data.requiredAttributes[2] ? data.requiredAttributes[2].amount : "0"
          }</span>
        </p>
        <p class="ammo-flex">
          <span>Faith:</span>
          <span>${
            data.requiredAttributes[3] ? data.requiredAttributes[3].amount : "0"
          }</span>
        </p>
        <p class="ammo-flex">
          <span>Arcane:</span>
          <span>${
            data.requiredAttributes[4] ? data.requiredAttributes[4].amount : "0"
          }</span>
        </p>
      </div>
    </div>

    <div class='weapon-category-weight'>
      <div class="category">
        <p>
          <span>Category:</span>
        </p>
        <p>
          <span>${data.category}</span>
        </p>
      </div>

      <div class="weight">
        <p>
          <span>Weight:</span>
          <span>${data.weight}kg</span>
        </p>
      </div>
    </div>

    <div class="result-item_description-weapon">
      <h3 class="result-description">
        <span class="quotes-top">"</span>
        ${data.description}
        <span class="quotes-bottom">"</span>
      </h3>
    </div>
  </div>
        `;
    }

    if (searchQuery === "armors") {
      html += `
      <div class="search-result-weapon" data-search-query=${searchQuery}>
    <div class="result-img-box-weapon">
      <img class="result-img-weapon" src=${data.image} />
    </div>
    
    <div class='weapon-name'>
      <h3 class="name" data-id=${data.id}>${data.name}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
        data.bookmark === true ? "bookmark-icon-fill" : ""
      }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
    </div>

    <div class="result-information-weapon">
      <div class="weapon-attack">
        <span class="property-style">Negation</span>
        <p class="armor-flex">
          <span>Phy:</span>
          <span>${data.dmgNegation[0].amount}</span>
        </p>
        <p class="armor-flex">
          <span >&rarr; Strike:</span>
          <span>${data.dmgNegation[1].amount}</span>
        </p>
        <p class="armor-flex">
          <span >&rarr; Slash:</span>
          <span>${data.dmgNegation[2].amount}</span>
        </p>
        <p class="armor-flex">
          <span >&rarr; Pierce:</span>
          <span>${data.dmgNegation[3].amount}</span>
        </p>
        <p class="armor-flex">
          <span class="weapon-magic">Magic:</span>
          <span>${data.dmgNegation[4].amount}</span>
        </p>
        <p class="armor-flex">
          <span class="weapon-fire">Fire:</span>
          <span>${data.dmgNegation[5].amount}</span>
        </p>
        <p class="armor-flex">
          <span class="weapon-lightning">Ligt:</span>
          <span>${data.dmgNegation[6].amount}</span>
        </p>
        <p class="armor-flex">
          <span class="weapon-holy">Holy:</span>
          <span>${data.dmgNegation[7].amount}</span>
        </p>
      </div>
      <div class="weapon-guard">
        <span class="property-style">Resistance</span>
        <p class="armor-flex-2">
          <span>Immunity:</span>
          <span>${data.resistance[0].amount}</span>
        </p>
        <p class="armor-flex-2">
          <span >Robustness:</span>
          <span>${data.resistance[1].amount}</span>
        </p>
        <p class="armor-flex-2">
          <span >Focus:</span>
          <span>${data.resistance[2].amount}</span>
        </p>
        <p class="armor-flex-2">
          <span >Vitality:</span>
          <span>${data.resistance[3].amount}</span>
        </p>
        <p class="armor-flex-2">
          <span >Poise:</span>
          <span>${data.resistance[4].amount}</span>
        </p>
      </div>
    </div>

    

    <div class='armor-category-weight'>
      <div class="weight">
        <p>
          <span>Weight:</span>
          <span>${data.weight}kg</span>
        </p>
      </div>
    </div>

    <div class="result-item_description-weapon">
      <h3 class="result-description">
        <span class="quotes-top">"</span>
        ${data.description}
        <span class="quotes-bottom">"</span>
      </h3>
    </div>
  </div>
        `;
    }

    if (searchQuery === "items") {
      html += `
    <div class="search-result-ashes" data-search-query=${searchQuery}>
      <div class="result-img-box-spirit">
        <img class="result-img-spirit" src=${data.image} />
      </div>
    
      <div class='spirit-name'>
        <h3 class="name" data-id=${data.id}>${data.name}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
          data.bookmark === true ? "bookmark-icon-fill" : ""
        }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
     </svg>
      </div>

      <div class='spirit-name'>
        <h3 class="name">${
          data.type !== "Consumable" && data.type !== "Reusable"
            ? "Consumable"
            : data.type
        }</h3>
      </div>
    
      <div class="effect-item">
        <div class="result-effect-spirit">
          <h3 class="result-effect">effect:</h3>
          <p class="result-info-spirit">${data.effect}.</p>
        </div>
      </div>
    
      <div class="result-item_description-item">
        <h3 class="result-description">
          <span class="quotes-top">"</span>
          ${data.description}
          <span class="quotes-bottom">"</span>
        </h3>
      </div>
    </div>
        `;
    }

    if (searchQuery === "talismans") {
      html += `
      <div class="search-result-talisman" data-search-query=${searchQuery}>
      <div class="result-img-box-spirit">
        <img class="result-img-spirit" src=${data.image} />
      </div>
    
      <div class='spirit-name'>
        <h3 class="name" data-id=${data.id}>${data.name}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
          data.bookmark === true ? "bookmark-icon-fill" : ""
        }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
      </div>
    
      <div class="effect-talisman">
        <div class="result-effect-spirit">
          <h3 class="result-effect">effect:</h3>
          <p class="result-info-spirit">${data.effect}.</p>
        </div>
      </div>
    
      <div class="result-item_description-talisman">
        <h3 class="result-description">
          <span class="quotes-top">"</span>
          ${data.description}
          <span class="quotes-bottom">"</span>
        </h3>
      </div>
    </div>
        `;
    }

    if (searchQuery === "npcs") {
      html += `
      <div class="search-result-talisman" data-search-query=${searchQuery}>
      <div class="result-img-box-npc">
        <img class="result-img-creature" src=${data.image} />
      </div>
    
      <div class='spirit-name'>
        <h3 class="name-npcs" data-id=${data.id}>${data.name}</h3>
      <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
        data.bookmark === true ? "bookmark-icon-fill" : ""
      }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      </div>
    
      <div class="effect-talisman">
        <div class="result-effect-spirit">
          <h3 class="result-effect">location:</h3>
          <p class="result-info-spirit">${data.location}.</p>
        </div>
      </div>
    
      <div class="result-item_description-talisman">
        <h3 class="result-description">
          <span class="quotes-top">"</span>
          ${data.quote ? data.quote : "-"}
          <span class="quotes-bottom">"</span>
        </h3>
      </div>
    </div>
        `;
    }

    if (searchQuery === "ammos") {
      html += `
      <div class="search-result-boss" data-search-query=${searchQuery}>
  <div class="result-img-box-spirit">
    <img class="result-img-ash" src=${data.image} />
  </div>

  <div class='spirit-name'>
    <h3 class="name" data-id=${data.id}>${data.name}</h3>
    <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
      data.bookmark === true ? "bookmark-icon-fill" : ""
    }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  </div>

  <div class="result-information-ash">
    <h3 class="location">
      <span class="cost">passive:</span>
      <span class="result-info-spirits">${data.passive}</span>
    </h3>
  </div>

  <div class="result-information-ammo">
      <div class="ammo-attack">
        <h3 class="property-style-ammo">Attack</h3>
        <p class="ammo-flex">
          <span>Phy:</span>
          <span>${data.attackPower[0].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-magic">Mag:</span>
          <span>${data.attackPower[1].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-fire">Fire:</span>
          <span>${data.attackPower[2].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-lightning">Ligt:</span>
          <span>${data.attackPower[3].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-holy">Holy:</span>
          <span>${data.attackPower[4].amount}</span>
        </p>
        <p class="ammo-flex">
          <span class="weapon-crit">Crit:</span>
          <span>${data.attackPower[5].amount}</span>
        </p>
      </div>
    </div>

  <div class="result-item_description-spirit">
    <h3 class="result-description">
      <span class="quotes-top">"</span>
    ${data.description}
      <span class="quotes-bottom">"</span>
    </h3>
  </div>
</div>
        `;
    }

    if (searchQuery === "spirits") {
      html += `
      <div class="search-result-spirit" data-search-query=${searchQuery}>
  <div class="result-img-box-spirit">
    <img class="result-img-spirit" src=${data.image} />
  </div>

  <div class='spirit-name'>
    <h3 class="name-spirit" data-id=${data.id}>${data.name}</h3>
    <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
      data.bookmark === true ? "bookmark-icon-fill" : ""
    }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
  </div>

  <div class="result-information-spirit">
    <h3 class="fp-cost spirit-flex">
      <span class="cost">fp-cost:</span>
      <span class="result-info-spirits">${data.fpCost}</span>
    </h3>
    <h3 class="hp-cost">
      <div class="spirit-flex">
        <span class="cost">hp-cost:</span>
        <span class="result-info-spirits">${data.hpCost}</span>
      </div>
    </h3>
  </div>

  <div class="effect-spirit">
    <div class="result-effect-spirit">
      <h3 class="result-effect">effect:</h3>
      <p class="result-info-spirit">${data.effect}.</p>
    </div>
  </div>

  <div class="result-item_description-spirit">
    <h3 class="result-description">
      <span class="quotes-top">"</span>
      ${data.description}
      <span class="quotes-bottom">"</span>
    </h3>
  </div>
</div>
        `;
    }

    if (searchQuery === "locations") {
      html += `
        <div class="search-result" data-search-query=${searchQuery}>
        <div class="result-img-box">
        <img
        class="result-img-big"
        src=${data.image}
        />
        </div>
      
        <div class="result-information-locations">
        <h3 class="result-name-locations" data-id=${data.id}>
        <span class="result-info-locations">${data.name}</span>
        </h3>
        <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
          data.bookmark === true ? "bookmark-icon-fill" : ""
        }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        </div>
        
        <div class="result-item_description">
        <h3 class="result-description">
        <span class="quotes-top">"</span>
        ${data.description ? data.description : "no information..."}
        <span class="quotes-bottom">"</span>
        </h3>
        </div>
        </div>
        `;
    }

    if (searchQuery === "classes") {
      html += `
      <div class="search-result-classes" data-search-query=${searchQuery}>
      <div class="result-img-box-classes">
         <img
          class="result-img"                                                      src=${
            data.image
          }
             />
      </div>
         
         <div class="result-information-classes">
           <h3 class="result-name-classes" data-id=${data.id}>
             <span class="result-property">name:</span>
             <span class="result-info-classes">${data.name}</span>
           </h3>
           <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
             data.bookmark === true ? "bookmark-icon-fill" : ""
           }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
           <h3 class="result-name-classes result-name-format">
             <span class="result-property">level:</span>
             <span class="result-info">${data.stats.level}</span>
           </h3>
           <h3 class="result-name-classes result-name-format">
             <span class="result-property">vigor:</span>
             <span class="result-info">${data.stats.vigor}</span>
           </h3>
           <h3 class="result-name-classes result-name-format">
             <span class="result-property">mind:</span>
             <span class="result-info">${data.stats.mind}</span>
           </h3>
           <h3 class="result-name-classes result-name-format">
             <span class="result-property">endurance:</span>
             <span class="result-info">${data.stats.endurance}</span>
           </h3>
           <h3 class="result-name-classes result-name-format">
             <span class="result-property">strength:</span>
             <span class="result-info">${data.stats.strength}</span>
           </h3>
           <h3 class="result-name-classes result-name-format">
             <span class="result-property">dexterity:</span>
             <span class="result-info">${data.stats.dexterity}</span>
           </h3>
           <h3 class="result-name-classes result-name-format">
             <span class="result-property">intelligence:</span>
             <span class="result-info">${data.stats.intelligence}</span>
           </h3>
           <h3 class="result-name-classes result-name-format">
             <span class="result-property">faith:</span>
             <span class="result-info">${data.stats.faith}</span>
           </h3>
           <h3 class="result-name-classes result-name-format">
             <span class="result-property">arcane:</span>
             <span class="result-info"
             >${data.stats.arcane}</span
             >
           </h3>
         </div>
         
         <div class="result-item_description">
           <h3 class="result-description">
             <span class="quotes-top">"</span>
        A twinblade wielding warrior from a nomadic tribe. An origin of exceptional technique.
             <span class="quotes-bottom">"</span>
           </h3>
         </div>
       </div>
        `;
    }

    if (searchQuery === "sorceries" || searchQuery === "incantations") {
      html += `
      <div class="search-result-magic" data-search-query=${searchQuery}>
  <div class="result-img-box-magic">
    <img class="result-img-magic" src=${data.image} />
  </div>

  <div class='magic-name'>
    <h3 class="name" data-id=${data.id}>${data.name}</h3>
    <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
      data.bookmark === true ? "bookmark-icon-fill" : ""
    }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
  </div>

  <div class="result-information-magic">
    <h3 class="magic-type magic-flex">
      <span class="type">type:</span>
      <span class="result-info-sorceries">${data.type}</span>
    </h3>
    <h3 class="result-cost-slots">
      <div class="magic-flex">
        <span class="result-property">cost:</span>
        <span class="result-info">${data.cost}</span>
      </div>
    </h3>
    <h3 class="result-cost-slots">
      <div class="magic-flex">
        <span class="result-property">slots:</span>
        <span class="result-info-magic">${data.slots}</span>
      </div>
    </h3>
  </div>

  <div class="effect-magic">
    <div class="result-requires">
      <h3 class="requires">required:</h3>
      <span class="required-stats-magic">Intelligence: ${
        data.requires[0] ? data.requires[0].amount : "-"
      }, Faith: ${data.requires[1] ? data.requires[1].amount : "-"}, Arcane: ${
        data.requires[2] ? data.requires[2].amount : "-"
      }</span>
    </div>
  </div>

  <div class="effect-magic">
    <div class="result-effect-magic">
      <h3 class="result-effect">effects:</h3>
      <p class="result-info-magic">${data.effects}</p>
    </div>
  </div>

  <div class="result-item_description-magic">
    <h3 class="result-description">
      <span class="quotes-top">"</span>
      ${data.description}
      <span class="quotes-bottom">"</span>
    </h3>
  </div>
</div>
      `;
    }

    if (searchQuery === "bosses") {
      html += `
      <div class="search-result-boss" data-search-query=${searchQuery}>
  <div class="result-img-box-spirit">
    <img class="result-img-creature" src=${data.image} />
  </div>

  <div class='spirit-name'>
    <h3 class="name" data-id=${data.id}>${data.name}</h3>
    <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
      data.bookmark === true ? "bookmark-icon-fill" : ""
    }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
  </div>
  
  
    <div class="boss-health">
      <h3 class="result-effect">healthpoints:</h3>
      <p class="health">${data.healthPoints}</p>
    </div>
 

  <div class="result-information-boss">
    <h3 class="location">
      <span class="cost">Location:</span>
      <span class="result-info-spirits">${data.location}</span>
    </h3>
  </div>

  <div class="boss-drops">
    <div class="result-effect-spirit">
      <h3 class="result-effect">drops:</h3>
      <p class="result-info-spirit">${data.drops}</p>
    </div>
  </div>

  <div class="result-item_description-boss">
    <h3 class="result-description">
      <span class="quotes-top">"</span>
     ${data.description}
      <span class="quotes-bottom">"</span>
    </h3>
  </div>
</div>
      `;
    }

    if (searchQuery === "creatures") {
      html += `
      <div class="search-result-classes" data-search-query=${searchQuery}>
  <div class="result-img-box-spirit">
    <img class="result-img-creature" src=${data.image} />
  </div>

  <div class='spirit-name'>
    <h3 class="name" data-id=${data.id}>${data.name}</h3>
    <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
      data.bookmark === true ? "bookmark-icon-fill" : ""
    }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
  </div>

  <div class="result-information-spirit">
    <h3 class="location">
      <span class="cost">Location:</span>
      <span class="result-info-spirits">${data.location}</span>
    </h3>
  </div>

  <div class="effect-spirit">
    <div class="result-effect-spirit">
      <h3 class="result-effect">drops:</h3>
      <p class="result-info-spirit">${data.drops}</p>
    </div>
  </div>

  <div class="result-item_description-spirit">
    <h3 class="result-description">
      <span class="quotes-top">"</span>
     ${data.description}
      <span class="quotes-bottom">"</span>
    </h3>
  </div>
</div>
      `;
    }

    if (searchQuery === "ashes") {
      html += `
      <div class="search-result-ashes" data-search-query=${searchQuery}>
  <div class="result-img-box-spirit">
    <img class="result-img-ash" src=${data.image} />
  </div>

  <div class='spirit-name'>
    <h3 class="name-ashes" data-id=${data.id}>${data.name}</h3>
    <svg xmlns="http://www.w3.org/2000/svg" class="bookmark-icon ${
      data.bookmark === true ? "bookmark-icon-fill" : ""
    }"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
  </div>

  <div class="result-information-ash">
    <h3 class="location">
      <span class="cost">affinity:</span>
      <span class="result-info-spirits">${data.affinity}</span>
    </h3>
  </div>

  <div class="effect-spirit">
    <div class="result-effect-spirit">
      <h3 class="result-effect">skill:</h3>
      <p class="result-info-spirit">${data.skill}</p>
    </div>
  </div>

  <div class="result-item_description-ash">
    <h3 class="result-description">
      <span class="quotes-top">"</span>
    ${data.description}
      <span class="quotes-bottom">"</span>
    </h3>
  </div>
</div>
      `;
    }

    this._parentElement.insertAdjacentHTML("beforeend", html);
  }
}

export default new ResultsView();
