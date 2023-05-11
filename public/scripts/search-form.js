var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderBlock } from './lib.js';
function dateToUnixStamp(date) {
    return parseDate(date).getTime() / 1000;
}
function parseDate(input) {
    const parts = input.match(/(\d+)/g);
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])); // months are 0-based
}
function responseToJson(requestPromise) {
    return requestPromise
        .then((response) => {
        return response.text();
    })
        .then((response) => {
        return JSON.parse(response);
    });
}
export function searchItems() {
    const city = document.querySelector('#city').value;
    const checkin = document.querySelector('#check-in-date').value;
    const checkout = document.querySelector('#check-out-date').value;
    const ci = dateToUnixStamp(checkin);
    const co = dateToUnixStamp(checkout);
    const maxprice = Number(document.querySelector('#max-price').value);
    return { city, checkin: ci, checkout: co, maxprice };
}
export function search1(itemsObj) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(itemsObj.city, itemsObj.checkin, itemsObj.checkout, itemsObj.maxprice);
        let url = 'http://localhost:3030/places?' +
            `checkInDate=${itemsObj.checkin}&` +
            `checkOutDate=${itemsObj.checkout}&` +
            'coordinates=59.9386,30.3141';
        if (itemsObj.maxprice != null) {
            url += `&maxPrice=${itemsObj.maxprice}`;
        }
        return yield responseToJson(fetch(url));
    });
}
export function renderSearchFormBlock(checkin, checkout) {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const minDate = year + '-' + (month < 10 ? '0' : false) + month + '-' + day;
    const maxDate = year + '-' + (month < 10 ? '0' : false) + month + 1 + '-' + (month % 2 == 0 ? 30 : 31);
    renderBlock('search-form-block', `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkin}" min="${minDate}" max="${maxDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${checkout}" min="${minDate}" max="${maxDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="search-btn">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
}
