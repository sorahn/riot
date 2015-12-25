import fetch from 'isomorphic-fetch'

export const REQUEST_ZONES = 'REQUEST_ZONES'
export const RECEIVE_ZONES = 'RECEIVE_ZONES'
export const REQUEST_FAVORITES = 'REQUEST_FAVORITES'
export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES'
export const SELECT_ZONE = 'SELECT_ZONE'

const SONOS_API = 'http://xbmcs-mac-mini.local:5005'

export function selectZone(name) {
  return {
    type: SELECT_ZONE,
    name
  }
}

function requestPosts() {
  return {
    type: REQUEST_ZONES
  }
}

function requestFavorites() {
  return {
    type: REQUEST_FAVORITES
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_ZONES,
    zones: json,
    receivedAt: Date.now()
  }
}

function receiveFavorites(json) {
  return {
    type: RECEIVE_FAVORITES,
    favorites: json,
    receivedAt: Date.now()
  }
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch(`${SONOS_API}/zones`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
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

function shouldFetchZones(state) {
  const zones = state.zones
  if (!zones) {
    return true
  }

  return false
}

function shouldFetchFavorites(state) {
  const favorites = state.favorites
  if (!favorites) {
    return true
  }

  return false
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchZones(getState())) {
      return dispatch(fetchPosts())
    }
  }
}

export function fetchFavoritesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchFavorites(getState())) {
      return dispatch(fetchFavorites())
    }
  }
}
