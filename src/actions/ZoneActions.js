import fetch from 'isomorphic-fetch'

import { SONOS_API } from './index'

export const SELECT_ZONE = 'SELECT_ZONE'
export const REQUEST_ZONES = 'REQUEST_ZONES'
export const RECEIVE_ZONES = 'RECEIVE_ZONES'
export const START_CHANGE_REQUEST = 'START_CHANGE_REQUEST'
export const END_CHANGE_REQUEST = 'END_CHANGE_REQUEST'
export const SET_HOVER_TARGET = 'SET_HOVER_TARGET'
export const REMOVE_HOVER_TARGET = 'REMOVE_HOVER_TARGET'
export const JOIN_ZONE = 'JOIN_ZONE'
export const LEAVE_ZONE = 'LEAVE_ZONE'

export function selectZone(name) {
  return { type: SELECT_ZONE, name }
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

export function startChangeRequest({speaker, zone}) {
  return { type: START_CHANGE_REQUEST, speaker, zone }
}

export function endChangeRequest() {
  return { type: END_CHANGE_REQUEST }
}

export function setHoverTarget(name) {
  return { type: SET_HOVER_TARGET, name }
}

export function removeHoverTarget() {
  return { type: REMOVE_HOVER_TARGET }
}

export function fetchZones() {
  return dispatch => {
    dispatch(requestZones())
    return fetch(`${SONOS_API}/zones`)
      .then(response => response.json())
      .then(json => dispatch(receiveZones(json)))
  }
}

export function leaveZone(speaker) {
  return dispatch => {
    dispatch({ type: LEAVE_ZONE, speaker })
    return fetch(`${SONOS_API}/${speaker}/leave`)
    .catch(setTimeout(() => {
      dispatch(fetchZones())
      dispatch(endChangeRequest())
    }, 2000))
  }
}

export function changeZone(speaker, zone) {
  return dispatch => {
    dispatch({ type: JOIN_ZONE, speaker, zone })
    return fetch(`${SONOS_API}/${speaker}/join/${zone}`)
      .catch(setTimeout(() => {
        dispatch(fetchZones())
        dispatch(endChangeRequest())
      }, 2000))
  }
}
