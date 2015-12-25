import { combineReducers } from 'redux'
import { SELECT_REDDIT, REQUEST_POSTS, RECEIVE_POSTS } from '../actions'

function selectedZone(state = {}, action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return Object.assign({}, {
        name: action.name
      })
    default:
      return state
  }
}

function zonesByGroup(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.zones,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  zonesByGroup,
  selectedZone
})

export default rootReducer
