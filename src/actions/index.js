import fetch from 'isomorphic-fetch'

export const REQUEST_FAVORITES = 'REQUEST_FAVORITES'
export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES'

export const SONOS_API = 'http://xbmcs-mac-mini.local:5005'

function requestFavorites() {
  return { type: REQUEST_FAVORITES }
}

function receiveFavorites(json) {
  return {
    type: RECEIVE_FAVORITES,
    favorites: json
  }
}

function fetchFavorites() {
  return dispatch => {
    dispatch(requestFavorites())
    return fetch(`${SONOS_API}/favorites`)
      .then(response => response.json())
      .then(json => dispatch(receiveFavorites(json)))
  }
}

function shouldFetchFavorites({availableFavorites: {favorites}}) {
  if (!favorites.length) {
    return true
  }

  return false
}

export function fetchFavoritesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchFavorites(getState())) {
      return dispatch(fetchFavorites())
    }
  }
}
