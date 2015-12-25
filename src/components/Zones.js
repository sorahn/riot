import React, { PropTypes, Component } from 'react'

export default class Zones extends Component {
  render() {
    return (
      <ul>
        {this.props.zones.map((zone, i) =>
          <li
            key={i}
            onClick={() => this.props.onClick(zone.coordinator.roomName)}
          >
            {zone.coordinator.roomName}
          </li>
        )}
      </ul>
    )
  }
}

Zones.propTypes = {
  zones: PropTypes.array.isRequired
}
