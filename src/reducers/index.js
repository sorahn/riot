import { combineReducers } from 'redux'
import { SELECT_ZONE, REQUEST_ZONES, RECEIVE_ZONES } from '../actions'
import { initialState } from '../constants'

function selectedZone(state = {}, action) {
  switch (action.type) {
    case SELECT_ZONE:
      return Object.assign({}, {
        name: action.name
      })
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

function zonesByGroup(state = initialState, action) {
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

const rootReducer = combineReducers({
  zonesByGroup,
  selectedZone
})

export default rootReducer
