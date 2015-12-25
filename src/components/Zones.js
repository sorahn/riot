import React, { PropTypes, Component } from 'react'

export default class Zones extends Component {
  render() {
    return (
      <ul>
        {this.props.zones.map((zone, i) =>
          <li key={i}>{zone.coordinator.roomName}</li>
        )}
      </ul>
    )
  }
}

Zones.propTypes = {
  posts: PropTypes.array.isRequired
}
