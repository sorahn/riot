import React, { PropTypes, Component } from 'react'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import Icon from 'react-fontawesome'

const stateMap = {
  STOPPED: 'stop',
  PLAYING: 'play',
  PAUSED_PLAYBACK: 'pause'
}

export default class Zone extends Component {
  titleOrTV(currentTrack) {
    if (/spdif/.test(currentTrack.uri)) {
      return 'TV'
    }

    return currentTrack.title
  }

  render() {
    const { zone: { coordinator, members }} = this.props
    const ellipsis = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }

    return (
      <Panel
        key={coordinator.uuid}
        header={<h3>{coordinator.roomName}</h3>}
        onClick={() => this.props.handleClick()}
        onMouseEnter={() => this.props.handleMouseEnter()}
        onMouseLeave={() => this.props.handleMouseLeave()}
        footer={
          <div style={ellipsis}>
            <Icon name={stateMap[coordinator.state.zoneState]} />
            <strong>&nbsp; - &nbsp;</strong>
            {this.titleOrTV(coordinator.state.currentTrack)}
          </div>
        }
      >
        <ListGroup>
          {members.map(member =>
            <ListGroupItem key={member.uuid}>{member.roomName}</ListGroupItem>
          )}
        </ListGroup>
      </Panel>
    )
  }
}

Zone.propTypes = {
  zone: PropTypes.object.isRequired
}
