import { renderBlock } from './lib.js'
import {User} from './UserData.js'

export interface favorite{
  id: string
  name: string
  img: string
}

export function renderUserBlock (userName: string, avatarLink: string, favoriteItemsAmount?: number): void {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false
  console.log(hasFavoriteItems);

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarLink}" alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
export function getUserData(): User{
  localStorage.setItem('user', '{"username": "Ruslan", "avatarUrl": "/img/avatar.png"}')
  const user: unknown = localStorage.getItem('user')
  if(typeof(user) === 'string'){
    return JSON.parse(user)
  }
}

export function getFavoritesAmount (): number {
  const favorites: favorite[] | null  = JSON.parse(localStorage.getItem('favoriteItems'))
  if(!favorites){
    return 0;
  }
  return favorites.length
}

export async function toggleFavoriteItem(element: HTMLElement){
  const id = element.dataset.id
  const name = element.dataset.name
  const img = element.dataset.img
  const favorites: favorite[] | null | string  = JSON.parse(localStorage.getItem('favoriteItems'))
  console.log(favorites);
  
  if(!favorites || favorites == ''){
    localStorage.setItem('favoriteItems', `[{"name": "${name}", "id": "${id}", "img": "${img}"}]`)
    return 0
  }

  let find = false
  let indexFind = -1
  if (typeof(favorites) != 'string'){
    favorites.forEach((element, index) => {
      if(element.id == id) {
        find = true
        indexFind = index
      }
    })
    if(!find){
      favorites.push({name, id, img})
    }else{
      favorites.splice(indexFind, 1)
    }
    localStorage.setItem('favoriteItems', `${JSON.stringify(favorites)}`)
  }
}
