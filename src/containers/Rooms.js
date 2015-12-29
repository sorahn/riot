import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Panel, Alert } from 'react-bootstrap'
import * as ZA from '../actions/ZoneActions'

import Zone from '../components/Zone'

export class Rooms extends React.Component {
  componentDidMount() {
    this.props.dispatch(ZA.fetchZones())
  }

  handleClick(zone) {
    const zcr = this.props.zoneChangeRequest

    if (zone === null) {
      this.props.dispatch(ZA.leaveZone(zcr.speaker))
      return
    }

    if (!!zcr.zone && zcr.zone !== zone) {
      this.props.dispatch(ZA.changeZone(zcr.speaker, zone))
      return
    }

    this.props.dispatch(ZA.selectZone(name))
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
            handleMouseEnter={name => dispatch(ZA.setHoverTarget(name))}
            handleMouseLeave={name => dispatch(ZA.removeHoverTarget(name))}
            startChangeRequest={name => dispatch(ZA.startChangeRequest(name))}
            endChangeRequest={() => dispatch(ZA.endChangeRequest())}
            hovering={hovering}
            selected={selected}
            request={zoneChangeRequest}
            key={zone.coordinator.uuid} />
        )}

        {!!zoneChangeRequest.speaker &&
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
