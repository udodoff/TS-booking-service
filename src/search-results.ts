import { renderBlock } from './lib.js'
import { Place } from './search-form.js'
export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderResultsHeader(){
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select class="filter">
                <option value="cheaper" selected="">Сначала дешёвые</option>
                <option value="exp" selected="">Сначала дорогие</option>
                <option value="closer">Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
    </ul>
    `
  )
}

export function renderSearchResultsBlock (place: Place) {
  const list = document.querySelector('.results-list')
  if(list){
    list.insertAdjacentHTML(
      'beforeend',
      `
        <li class="result" data-price="${place.price}" data-remoteness="${place.remoteness}">
          <div class="result-container">
            <div class="result-img-container">
              <div class="favorites active" data-id="${place.id}" data-name="${place.name}" data-img="${place.image}"></div>
              <img class="result-img" src="${place.image}" alt="">
            </div>	
            <div class="result-info">
              <div class="result-info--header">
                <p>${place.name}</p>
                <p class="price">${place.price}&#8381;</p>
              </div>
              <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness}</div>
              <div class="result-info--descr">${place.description}</div>
              <div class="result-info--footer">
                <div>
                  <button>Забронировать</button>
                </div>
              </div>
            </div>
          </div>
        </li>
      `
    )
  }
}
