import { combineReducers } from 'redux'
import * as ZA from '../actions/ZoneActions'

function availableZones(state = {
  fetching: true,
  selected: '',
  hovering: '',
  zones: []
}, action) {
  switch (action.type) {
    case ZA.JOIN_ZONE:
    case ZA.LEAVE_ZONE:
    case ZA.REQUEST_ZONES:
      return Object.assign({}, state, {
        isFetching: true
      })

    case ZA.RECEIVE_ZONES:
      return Object.assign({}, state, {
        fetching: false,
        selected: !!state.selected ? state.selected : action.zones[0].coordinator.roomName,
        zones: action.zones,
        lastUpdated: action.receivedAt
      })

    case ZA.SELECT_ZONE:
      return Object.assign({}, state, {
        selected: action.name
      })

    case ZA.SET_HOVER_TARGET:
      return Object.assign({}, state, {
        hovering: action.name
      })

    case ZA.REMOVE_HOVER_TARGET:
      return Object.assign({}, state, {
        hovering: ''
      })

    default: return state
  }
}

function zoneChangeRequest(state = {
  speaker: '',
  zone: ''
}, {type, speaker, zone}) {
  switch (type) {
    case ZA.START_CHANGE_REQUEST:
      return Object.assign({}, state, {
        speaker,
        zone
      })

    case ZA.END_CHANGE_REQUEST:
      return Object.assign({}, state, {
        speaker: '',
        zone: ''
      })

    default: return state
  }
}

const ZoneReducer = combineReducers({
  availableZones,
  zoneChangeRequest
})

export default ZoneReducer
