import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'

import {
  fetchZonesIfNeeded, selectZone,
  hoverZone, hoverOffZone
} from '../actions'

import Zone from '../components/Zone'

export class Rooms extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchZonesIfNeeded())
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

        {zones.map(zone =>
          <Zone
            zone={zone}
            handleClick={() => dispatch(selectZone(zone.coordinator.roomName))}
            handleMouseEnter={() => dispatch(hoverZone(zone.coordinator.roomName))}
            handleMouseLeave={() => dispatch(hoverOffZone(zone.coordinator.roomName))}
            hovering={this.props.hoveredZone}
            selected={this.props.selectedZone}
            key={zone.coordinator.uuid} />
        )}
      </Panel>
    )
  }
}

Rooms.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedZone, hoveredZone, zonesByGroup: { zones, isFetching } } = state

  return {
    isFetching,
    zones,
    hoveredZone,
    selectedZone
  }
}

export default connect(mapStateToProps)(Rooms)