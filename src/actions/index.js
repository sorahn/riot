import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'

export function selectZone(name) {
  return {
    type: SELECT_REDDIT,
    name
  }
}

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
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
