import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchZonesIfNeeded, fetchFavoritesIfNeeded } from '../actions'
import Zones from '../components/Zones'
import Favorites from '../components/Favorites'

import { Grid, Col, Navbar, Panel } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchZonesIfNeeded())
    this.props.dispatch(fetchFavoritesIfNeeded())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchZonesIfNeeded())
  }

  render() {
    const { selectedZone, zones, isFetching, isFetchingFavorites, favorites } = this.props
    return (
      <main>
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>RIOT</Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Col sm={4}>
            <Panel header={<h3>Rooms</h3>} bsStyle="primary">
              {isFetching && zones.length === 0 &&
                <h2>Loading...</h2>
              }
              {!isFetching && zones.length === 0 &&
                <h2>Empty.</h2>
              }
              {zones.length > 0 &&
                <Zones zones={zones} />
              }
            </Panel>
          </Col>
          <Col sm={4}>
            <Panel header={<h3>Now Playing</h3>} bsStyle="primary">
              {selectedZone &&
                <h2>{selectedZone.name}</h2>
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
  zones: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedZone, zonesByGroup, availableFavorites } = state
  const { isFetching, isFetchingFavorites, lastUpdated, zones } = zonesByGroup
  const { favorites } = availableFavorites

  return {
    selectedZone,
    zones,
    isFetching,
    isFetchingFavorites,
    lastUpdated,
    favorites
  }

  return state
}

export default connect(mapStateToProps)(App)
