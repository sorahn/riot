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
    const { hovering, selected, requesting, zone: { coordinator, members }} = this.props
    const track = /spdif/.test(coordinator.state.currentTrack.uri) ? 'TV' : coordinator.state.currentTrack.title
    const ellipsis = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }

    let bsStyle = selected === coordinator.roomName ? 'success' : 'default'
    bsStyle = hovering === coordinator.roomName ? 'info' : bsStyle

    return (
      <Panel
        key={coordinator.uuid}
        header={<h3>{coordinator.roomName}</h3>}
        onClick={() => this.props.handleClick()}
        onMouseEnter={() => this.props.handleMouseEnter()}
        onMouseLeave={() => this.props.handleMouseLeave()}
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
            const isRequesting = !!requesting
            const lsiStyle = isRequesting ?
              requesting === member.roomName ? 'warning' : 'success'
              : null

            const groupButton = !isRequesting ? (
              <Button
                className="pull-right"
                bsStyle="info"
                bsSize="xs"
                onClick={e => {
                  e.preventDefault()
                  this.props.requestNewGroup(member.roomName)
                }}>
                Group
              </Button>
            ) : null

            const cancelButton = isRequesting ? requesting === member.roomName ? (
              <Button
                className="pull-right"
                bsStyle="danger"
                bsSize="xs"
                onClick={e => {
                  e.preventDefault()
                  this.props.cancelRequestNewGroup(member.roomName)
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
