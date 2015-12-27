import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchFavoritesIfNeeded } from '../actions'

import Rooms from '../containers/Rooms'
import Favorites from '../components/Favorites'

import { Grid, Col, Navbar, Panel } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchFavoritesIfNeeded())
  }

  render() {
    const { selectedZone, isFetchingFavorites, favorites } = this.props
    return (
      <main>
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>RIOT</Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Col sm={4}>
            <Rooms />
          </Col>
          <Col sm={4}>
            { /* move into component */ }
            { /* if there are zones, but not a selectedZone, dispatch seletZone[0] */ }

            <Panel header={<h3>Now Playing</h3>} bsStyle="primary">
              {selectedZone &&
                <h2>{selectedZone}</h2>
              }
            </Panel>
          </Col>
          <Col sm={4}>
            <Panel header={<h3>Favorites</h3>} bsStyle="primary">
              {isFetchingFavorites && favorites.length === 0 &&
                <h2>Loading...</h2>
              }
              {!isFetchingFavorites && favorites.length === 0 &&
                <h2>Empty.</h2>
              }
              {favorites.length > 0 &&
                <Favorites favorites={favorites} />
              }
            </Panel>
          </Col>
        </Grid>
      </main>
    )
  }
}

App.propTypes = {
  selectedZone: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedZone, availableFavorites } = state
  const { favorites, isFetchingFavorites } = availableFavorites

  return {
    selectedZone,
    isFetchingFavorites,
    favorites
  }
}

export default connect(mapStateToProps)(App)
