var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { search1 } from './search-form.js';
import { FlatRentSdk } from './flat-rent-sdk.js';
const frs = new FlatRentSdk();
export class UserSaerchResults {
    searchResults(count, userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield search1(userInputs);
            if (count == 2) {
                const resultsSdk = yield this.sdkResults(userInputs);
                results = [...results, ...resultsSdk];
            }
            return results;
        });
    }
    sdkResults(userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkin = new Date(userInputs.checkin * 1000);
            const checkout = new Date(userInputs.checkout * 1000);
            const formatedInputs = {
                city: userInputs.city, checkin, checkout, maxprice: userInputs.maxprice
            };
            const result = yield frs.search(formatedInputs);
            const formatedResult = [];
            result.forEach(el => {
                const tmp = {
                    id: el.id,
                    bookedDates: el.bookedDates,
                    description: el.details,
                    image: el.photos[0],
                    name: el.title,
                    price: el.totalPrice,
                    remoteness: el.coordinates
                };
                formatedResult.push(tmp);
            });
            return formatedResult;
        });
    }
}
export function renderBlock(elementId, html) {
    const element = document.getElementById(elementId);
    element.innerHTML = html;
}
export function renderToast(message, action) {
    let messageText = '';
    if (message != null) {
        messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${(action === null || action === void 0 ? void 0 : action.name) || 'Закрыть'}</button>
      </div>
    `;
    }
    renderBlock('toast-block', messageText);
    const button = document.getElementById('toast-main-action');
    if (button != null) {
        button.onclick = function () {
            if (action != null && action.handler != null) {
                action.handler();
            }
            renderToast(null, null);
        };
    }
}
