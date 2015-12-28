import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

import {
  fetchZonesIfNeeded, selectZone,
  hoverZone, hoverOffZone,
  requestNewZone, cancelRequestNewZone,
  sendToExistingZone, leaveZones
} from '../actions'

import Zone from '../components/Zone'

export class Rooms extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchZonesIfNeeded())
  }

  handleClick(name) {
    if (name === null) {
      this.props.dispatch(leaveZones(this.props.requestingZone.name))
      return
    }

    if (this.props.requestingZone.name !== name) {
      this.props.dispatch(sendToExistingZone(this.props.requestingZone.name, name))
      return
    }

    this.props.dispatch(selectZone(name))
  }

  render() {
    const { isFetching, zones, dispatch } = this.props

    return (
      <Panel header={<h3>Rooms</h3>} bsStyle="primary">
        {isFetching && zones.length === 0 &&
          <h2>Loading...</h2>
        }

        {!isFetching && zones.length === 0 &&
          <h2>Empty.</h2>
        }

        {isFetching && zones.length > 0 &&
          <h2>Refreshing.</h2>
        }

        {zones.map(zone =>
          <Zone
            zone={zone}
            handleClick={() => this.handleClick(zone.coordinator.roomName)}
            handleMouseEnter={() => dispatch(hoverZone(zone.coordinator.roomName))}
            handleMouseLeave={() => dispatch(hoverOffZone(zone.coordinator.roomName))}
            requestNewGroup={name => dispatch(requestNewZone(name))}
            cancelRequestNewGroup={() => dispatch(cancelRequestNewZone())}
            hovering={this.props.hoveredZone}
            selected={this.props.selectedZone}
            requesting={this.props.requestingZone}
            key={zone.coordinator.uuid} />
        )}

        {!!this.props.requestingZone.name &&
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
  const { selectedZone, hoveredZone, requestingZone,
    zonesByGroup: { zones, isFetching } } = state

  return {
    isFetching,
    zones,
    hoveredZone,
    selectedZone,
    requestingZone,
  }
}

export default connect(mapStateToProps)(Rooms)
