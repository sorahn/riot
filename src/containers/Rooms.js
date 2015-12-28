import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Panel, Alert } from 'react-bootstrap'

import {
  fetchZones, selectZone, leaveZone, changeZone,
  setHoverTarget, removeHoverTarget,
  startChangeRequest, endChangeRequest,
} from '../actions/ZoneActions'

// import {
//   hoverZone, hoverOffZone,
//   requestNewZone, cancelRequestNewZone,
//   sendToExistingZone, leaveZones
// } from '../actions'

import Zone from '../components/Zone'

export class Rooms extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchZones())
  }

  handleClick(name) {
    if (name === null) {
      this.props.dispatch(leaveZone(this.props.availableZones.requesting))
      return
    }

    if (this.props.requestingZone.name !== name) {
      this.props.dispatch(changeZone(this.props.availableZones.requesting, name))
      return
    }

    this.props.dispatch(selectZone(name))
  }

  render() {
    const { dispatch, zoneChangeRequest, availableZones: { selected, hovering, fetching, zones }} = this.props

    return (
      <Panel header={<h3>Rooms</h3>} bsStyle="primary">
        {fetching && zones.length === 0 &&
          <Alert bsStyle="info">
            <p>Loading Zones...</p>
          </Alert>
        }

        {!fetching && zones.length === 0 &&
          <Alert bsStyle="danger">
            <p>No SONOS Zones discovered.</p>
          </Alert>
        }

        {fetching && zones.length > 0 &&
          <Alert bsStyle="info">
            <p>Refreshing Zones...</p>
          </Alert>
        }

        {zones.map(zone =>
          <Zone
            zone={zone}
            handleClick={name => this.handleClick(name)}
            handleMouseEnter={name => dispatch(setHoverTarget(name))}
            handleMouseLeave={name => dispatch(removeHoverTarget(name))}
            startChangeRequest={name => dispatch(startChangeRequest(name))}
            endChangeRequest={() => dispatch(endChangeRequest())}
            hovering={hovering}
            selected={selected}
            request={zoneChangeRequest}
            key={zone.coordinator.uuid} />
        )}

        {!!this.props.zoneChangeRequest.speaker &&
          <Panel bsStyle="success" header={<h3>New Zone</h3>}
            onClick={() => this.handleClick(null)}>
            Click here to create a new zone.
          </Panel>
        }
      </Panel>
    )
  }
}

Rooms.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { ZoneReducers: { availableZones, zoneChangeRequest } } = state

  return {
    availableZones,
    zoneChangeRequest
  }
}

export default connect(mapStateToProps)(Rooms)
