import React, { PropTypes, Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'


export default class Favorites extends Component {
  render() {
    return (
      <ListGroup>
        {this.props.favorites.map((favorite, i) =>
          <ListGroupItem key={i}>{favorite}</ListGroupItem>
        )}
      </ListGroup>
    )
  }
}

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired
}
