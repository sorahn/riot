import { combineReducers } from 'redux'
import { SELECT_ZONE,
  REQUEST_ZONES, RECEIVE_ZONES,
  REQUEST_FAVORITES, RECEIVE_FAVORITES,
  HOVER_ZONE, HOVER_OFF_ZONE
} from '../actions'

function hoveredZone(state = '', action) {
  switch (action.type) {
    case HOVER_ZONE: return action.name
    case HOVER_OFF_ZONE: return ''

    default: return state
  }
}

function selectedZone(state = '', action) {
  switch (action.type) {
    case SELECT_ZONE: return action.name
    case RECEIVE_ZONES:
      if (state.name) {
        return state
      }
      return action.zones[0].coordinator.roomName

    default: return state
  }
}

function zonesByGroup(state = {
  isFetching: true,
  zones: [],
}, action) {
  switch (action.type) {
    case REQUEST_ZONES: return Object.assign({}, state, { isFetching: true })
    case RECEIVE_ZONES:
      return Object.assign({}, state, {
        isFetching: false,
        zones: action.zones,
        lastUpdated: action.receivedAt
      })

    default: return state
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
  hoveredZone,
  availableFavorites
})

export default rootReducer
