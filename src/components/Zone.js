import React, { PropTypes, Component } from 'react'
import { Panel, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import Icon from 'react-fontawesome'

const stateMap = {
  STOPPED: 'stop',
  PLAYING: 'play',
  PAUSED_PLAYBACK: 'pause'
}

export default class Zone extends Component {
  render() {
    const { hovering, request, zone: { members, coordinator, coordinator: { roomName }}} = this.props
    const track = /spdif/.test(coordinator.state.currentTrack.uri) ? 'TV' : coordinator.state.currentTrack.title
    const isRequesting = !!request.zone
    const isHovering = hovering === roomName
    const ellipsis = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }

    const bsStyle = isRequesting ? request.zone !== roomName ? 'success' : 'default' : 'default'

    return (
      <Panel
        key={coordinator.uuid}
        header={<h3>{roomName}</h3>}
        onClick={() => this.props.handleClick(roomName)}
        onMouseEnter={() => this.props.handleMouseEnter(roomName)}
        onMouseLeave={() => this.props.handleMouseLeave(roomName)}
        bsStyle={bsStyle}
        footer={
          <div style={ellipsis}>
            <Icon name={stateMap[coordinator.state.zoneState]} />
            <strong>&nbsp; - &nbsp;</strong>
            {track}
          </div>
        }
      >
        <ListGroup>
          {members.map(member => {
            const lsiStyle = isRequesting ? request.speaker === member.roomName ? 'info' : null : null

            const groupButton = isHovering ? !isRequesting ? (
              <Button
                className="pull-right"
                bsStyle="info"
                bsSize="xs"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  this.props.startChangeRequest({
                    speaker: member.roomName,
                    zone: roomName
                  })
                }}>
                Group
              </Button>
            ) : null : null

            const cancelButton = isRequesting ? request.speaker === member.roomName ? (
              <Button
                className="pull-right"
                bsStyle="danger"
                bsSize="xs"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  this.props.endChangeRequest()
                }}>
                Cancel
              </Button>
            ) : null : null

            return (
              <ListGroupItem key={member.uuid} bsStyle={lsiStyle} >
                {groupButton}
                {cancelButton}
                {member.roomName}
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </Panel>
    )
  }
}

Zone.propTypes = {
  zone: PropTypes.object.isRequired
}
