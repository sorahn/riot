import React, { PropTypes, Component } from 'react'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { selectZone } from '../actions'
import Icon from 'react-fontawesome'

const stateMap = {
  STOPPED: 'stop',
  PLAYING: 'play',
  PAUSED_PLAYBACK: 'pause'
}

export default class Zones extends Component {
  handleClick(name) {
    this.props.dispatch(selectZone(name))
  }

  render() {
    return (
      <divl>
        {this.props.zones.map(({coordinator, members}) =>
          <Panel
            key={coordinator.uuid}
            header={<h3>{coordinator.roomName}</h3>}
            onClick={() => this.handleClick(coordinator.roomName)}
            footer={<Icon name={stateMap[coordinator.state.zoneState]} />}
          >
            <ListGroup>
              {members.map(member =>
                <ListGroupItem key={member.uuid}>{member.roomName}</ListGroupItem>
              )}
            </ListGroup>
          </Panel>
        )}
      </divl>
    )
  }
}

Zones.propTypes = {
  zones: PropTypes.array.isRequired
}
