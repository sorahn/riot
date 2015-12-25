import fetch from 'isomorphic-fetch'

export const REQUEST_ZONES = 'REQUEST_ZONES'
export const RECEIVE_ZONES = 'RECEIVE_ZONES'
export const SELECT_ZONE = 'SELECT_ZONE'

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

function receivePosts(json) {
  return {
    type: RECEIVE_ZONES,
    zones: json,
    receivedAt: Date.now()
  }
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch(`http://xbmcs-mac-mini.local:5005/zones`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchZones(state) {
  const zones = state.zones
  if (!zones) {
    return true
  }
  if (zones.isFetching) {
    return false
  }
  return zones.didInvalidate
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchZones(getState())) {
      return dispatch(fetchPosts())
    }
  }
}
