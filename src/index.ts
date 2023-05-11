import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import { getUserData } from './user.js'
import {getFavoritesAmount} from './user.js'
import { searchItems } from './search-form.js'
import {renderSearchResultsBlock} from './search-results.js'
import {renderResultsHeader} from './search-results.js'
import {toggleFavoriteItem} from './user.js'
import { UserSaerchResults } from './lib.js'
const usr = new UserSaerchResults()
window.addEventListener('DOMContentLoaded', () => {
  const day = new Date().getDate()
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()
  const checkin = year + '-' + (month < 10 ? '0' : false) + month + '-' + (day < 10 ? '0': false) + (day + 1)
  const checkout = year + '-' + (month < 10 ? '0' : false) + month + '-' + (day < 10 ? '0': false) + (month % 2 == 0 ? day + 2 : day + 3)
  
  const {username, avatarUrl} = getUserData()
  const favorites = getFavoritesAmount()
  
  renderUserBlock(username, avatarUrl, favorites)
  renderSearchFormBlock(checkin, checkout)
  renderSearchStubBlock()
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  );
  (<HTMLFormElement>document.querySelector('form')).addEventListener('submit', async (event) => {
    event.preventDefault()
    const userInputs = searchItems()
    const userInputCount = Number(prompt('Сколько поставщиков использовать? Введите 1 или 2'))
    renderResultsHeader()
    const searchReasults = await usr.searchResults(userInputCount, userInputs)

    searchReasults.forEach(item => {
      renderSearchResultsBlock(item)
    });

    const list = document.querySelector('.results-list')
    if(list){
      const items: HTMLCollection = list.children
      const itemsArr = [...items]
      const select: HTMLSelectElement | null = document.querySelector('.filter')
      if(select){
        select.addEventListener('change', () => {
          itemsArr.sort((a: HTMLElement, b: HTMLElement): number => {
            if(select.value == 'closer'){
              return Number(a.dataset.remoteness) > Number(b.dataset.remoteness) ? 1 : -1
            }else if(select.value == 'cheaper'){
              return Number(a.dataset.price) > Number(b.dataset.price) ? 1 : -1
            }else{
              return Number(b.dataset.price) > Number(a.dataset.price) ? 1 : -1
            }
          });
          console.log(itemsArr);
          itemsArr.forEach(node => list.appendChild(node))
        })
      }
    }
    

    

    document.querySelectorAll('.favorites').forEach(el => {
      el.addEventListener('click', (event: Event) => {
        const {target} = event
        if(target) toggleFavoriteItem(target as HTMLElement)
      })
    })
  });
})
