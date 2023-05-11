import { search1 } from './search-form.js'
import { FlatRentSdk } from './flat-rent-sdk.js'
import { Place } from './search-form.js'
import {SearchFormData} from './search-form.js'
interface Message{
  text: string,
  type: string
}
interface Action{
  name: string,
  handler: () => void
}
const frs = new FlatRentSdk()
export class UserSaerchResults{
  public async searchResults(count: number, userInputs: SearchFormData){
    let results = await search1(userInputs)
    if(count == 2){
      const resultsSdk = await this.sdkResults(userInputs)
      results = [...results, ...resultsSdk]
    }
    return results
  }
  
  private async sdkResults(userInputs: SearchFormData){
    let checkin
    let checkout
    let formatedResult : Place[]
    if(userInputs.checkin && userInputs.checkout){
      checkin = new Date(userInputs.checkin * 1000)
      checkout = new Date(userInputs.checkout * 1000)
      const formatedInputs = {
        city: userInputs.city, checkin, checkout, maxprice: userInputs.maxprice
      }
      const result = await frs.search(formatedInputs)
      result.forEach(el => {
        const tmp = {
          id: el.id,
          bookedDates: el.bookedDates,
          description: el.details,
          image: el.photos[0],
          name: el.title,
          price: el.totalPrice,
          remoteness: el.coordinates
        }
        formatedResult.push(tmp)
      })
    }
    return formatedResult
  }
  
}


export function renderBlock (elementId: string, html: string) {
  const element = document.getElementById(elementId)
  if(element){
    element.innerHTML = html
  }
}

export function renderToast (message: Message | null, action: Action | null) {
  let messageText = ''
  
  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }
  
  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function() {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast(null, null)
    }
  }
}
