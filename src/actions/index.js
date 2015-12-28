import fetch from 'isomorphic-fetch'

export const REQUEST_ZONES = 'REQUEST_ZONES'
export const RECEIVE_ZONES = 'RECEIVE_ZONES'
export const REQUEST_FAVORITES = 'REQUEST_FAVORITES'
export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES'
export const SELECT_ZONE = 'SELECT_ZONE'
export const HOVER_ZONE = 'HOVER_ZONE'
export const HOVER_OFF_ZONE = 'HOVER_OFF_ZONE'
export const REQUEST_NEW_ZONE = 'REQUEST_NEW_ZONE'
export const CANCEL_REQUEST_NEW_ZONE = 'CANCEL_REQUEST_NEW_ZONE'
export const SEND_TO_EXISTING_ZONE = 'SEND_TO_EXISTING_ZONE'

const SONOS_API = 'http://xbmcs-mac-mini.local:5005'

export function selectZone(name) {
  return { type: SELECT_ZONE, name }
}

export function hoverZone(name) {
  return { type: HOVER_ZONE, name }
}

export function hoverOffZone(name) {
  return { type: HOVER_OFF_ZONE, name }
}

function requestZones() {
  return { type: REQUEST_ZONES }
}

function receiveZones(json) {
  return {
    type: RECEIVE_ZONES,
    zones: json,
    receivedAt: Date.now()
  }
}

export function requestNewZone({name, coordinator}) {
  return { type: REQUEST_NEW_ZONE, name, coordinator }
}

export function cancelRequestNewZone() {
  return { type: CANCEL_REQUEST_NEW_ZONE }
}


function fetchZones() {
  return dispatch => {
    dispatch(requestZones())
    return fetch(`${SONOS_API}/zones`)
      .then(response => response.json())
      .then(json => dispatch(receiveZones(json)))
  }
}

export function leaveZones(source) {
  return dispatch => {
    dispatch({ type: 'LEAVE_ZONES', source })
    return fetch(`${SONOS_API}/${source}/leave`)
    .catch(setTimeout(() => {
      dispatch(fetchZones())
      dispatch(cancelRequestNewZone())
    }, 2000))
  }
}

export function sendToExistingZone(source, target) {
  return dispatch => {
    dispatch({ type: SEND_TO_EXISTING_ZONE, source, target })
    return fetch(`${SONOS_API}/${source}/join/${target}`)
      .catch(setTimeout(() => {
        dispatch(fetchZones())
        dispatch(cancelRequestNewZone())
      }, 2000))
  }
}

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

function shouldFetchZones({zonesByGroup: {zones}}) {
  if (!zones.length) {
    return true
  }

  return false
}

function shouldFetchFavorites({availableFavorites: {favorites}}) {
  if (!favorites.length) {
    return true
  }

  return false
}

export function fetchZonesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchZones(getState())) {
      return dispatch(fetchZones())
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
