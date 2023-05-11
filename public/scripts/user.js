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
export function renderUserBlock(userName, avatarLink, favoriteItemsAmount) {
    const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';
    const hasFavoriteItems = favoriteItemsAmount ? true : false;
    console.log(hasFavoriteItems);
    renderBlock('user-block', `
    <div class="header-container">
      <img class="avatar" src="${avatarLink}" alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
export function getUserData() {
    localStorage.setItem('user', '{"username": "Ruslan", "avatarUrl": "/img/avatar.png"}');
    const user = localStorage.getItem('user');
    if (typeof (user) === 'string') {
        return JSON.parse(user);
    }
}
export function getFavoritesAmount() {
    const favorites = JSON.parse(localStorage.getItem('favoriteItems'));
    if (!favorites) {
        return 0;
    }
    return favorites.length;
}
export function toggleFavoriteItem(element) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = element.dataset.id;
        const name = element.dataset.name;
        const img = element.dataset.img;
        const favorites = JSON.parse(localStorage.getItem('favoriteItems'));
        console.log(favorites);
        if (!favorites || favorites == '') {
            localStorage.setItem('favoriteItems', `[{"name": "${name}", "id": "${id}", "img": "${img}"}]`);
            return 0;
        }
        let find = false;
        let indexFind = -1;
        if (typeof (favorites) != 'string') {
            favorites.forEach((element, index) => {
                if (element.id == id) {
                    find = true;
                    indexFind = index;
                }
            });
            if (!find) {
                favorites.push({ name, id, img });
            }
            else {
                favorites.splice(indexFind, 1);
            }
            localStorage.setItem('favoriteItems', `${JSON.stringify(favorites)}`);
        }
    });
}
