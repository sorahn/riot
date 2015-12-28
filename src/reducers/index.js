import { combineReducers } from 'redux'
import ZoneReducers from './ZoneReducers'

import {
  REQUEST_FAVORITES, RECEIVE_FAVORITES,
} from '../actions'

// function requestingZone(state = {
//   name: '',
//   coordinator: ''
// }, action) {
//   switch (action.type) {
//     case START_CHANGE_REQUEST:
//       return Object.assign({}, state, {
//         name: action.name,
//         coordinator: action.coordinator
//       })

//     case END_CHANGE_REQUEST:
//       return Object.assign({}, state, {
//         name: '',
//         coordinator: ''
//       })

//     default: return state
//   }
// }

// function hoveredZone(state = '', action) {
//   switch (action.type) {
//     case HOVER_ZONE: return action.name
//     case HOVER_OFF_ZONE: return ''

//     default: return state
//   }
// }

// function selectedZone(state = '', action) {
//   switch (action.type) {
//     case SELECT_ZONE: return action.name
//     case RECEIVE_ZONES:
//       if (state.name) {
//         return state
//       }
//       return action.zones[0].coordinator.roomName

//     default: return state
//   }
// }

// function zonesByGroup(state = {
//   isFetching: true,
//   zones: [],
// }, action) {
//   switch (action.type) {
//     case REQUEST_ZONES: return Object.assign({}, state, { isFetching: true })
//     case RECEIVE_ZONES:
//       return Object.assign({}, state, {
//         isFetching: false,
//         zones: action.zones,
//         lastUpdated: action.receivedAt
//       })

//     case 'JOIN_ZONE':
//     case 'LEAVE_ZONES':
//       return Object.assign({}, state, {
//         isFetching: true
//       })


//     default: return state
//   }
// }

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
  ZoneReducers,
  availableFavorites
})

export default rootReducer
