import { combineReducers } from 'redux'
import { SELECT_ZONE,
  REQUEST_ZONES, RECEIVE_ZONES,
  REQUEST_FAVORITES, RECEIVE_FAVORITES,
} from '../actions'

function selectedZone(state = {}, action) {
  switch (action.type) {
    case SELECT_ZONE:
      return Object.assign({}, {
        name: action.name
      })

    // remove this from this reducer, and make an empty component fire it off instead
    case RECEIVE_ZONES:
      if (state.name) {
        return state
      }

      return Object.assign({}, {
        name: action.zones[0].coordinator.roomName
      })
    default:
      return state
  }
}

function zonesByGroup(state = {
  isFetching: true,
  selectedZone: '',
  zones: [],
}, action) {
  switch (action.type) {
    case REQUEST_ZONES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_ZONES:
      return Object.assign({}, state, {
        isFetching: false,
        zones: action.zones,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function availableFavorites(state = {
  isFetchingFavorites: true,
  favorites: []
}, action) {
  switch (action.type) {
    case REQUEST_FAVORITES:
      return Object.assign({}, state, {
        isFetchingFavorites: true
      })
    case RECEIVE_FAVORITES:
      return Object.assign({}, state, {
        isFetchingFavorites: false,
        favorites: action.favorites
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  zonesByGroup,
  selectedZone,
  availableFavorites
})

export default rootReducer
