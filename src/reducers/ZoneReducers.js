import { combineReducers } from 'redux'
import {
  JOIN_ZONE,
  LEAVE_ZONE,
  REQUEST_ZONES,
  RECEIVE_ZONES,
  SELECT_ZONE,
  SET_HOVER_TARGET,
  REMOVE_HOVER_TARGET,
  START_CHANGE_REQUEST,
  END_CHANGE_REQUEST
} from '../actions/ZoneActions'

function availableZones(state = {
  fetching: true,
  selected: '',
  hovering: '',
  zones: []
}, action) {
  switch (action.type) {
    case JOIN_ZONE:
    case LEAVE_ZONE:
    case REQUEST_ZONES:
      return Object.assign({}, state, {
        fetching: true
      })

    case RECEIVE_ZONES:
      return Object.assign({}, state, {
        fetching: false,
        selected: !!state.selected ? state.selected : action.zones[0].coordinator.roomName,
        zones: action.zones,
        lastUpdated: action.receivedAt
      })

    case SELECT_ZONE:
      return Object.assign({}, state, {
        selected: action.name
      })

    case SET_HOVER_TARGET:
      return Object.assign({}, state, {
        hovering: action.name
      })

    case REMOVE_HOVER_TARGET:
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
    case START_CHANGE_REQUEST:
      return Object.assign({}, state, {
        speaker,
        zone
      })

    case END_CHANGE_REQUEST:
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
