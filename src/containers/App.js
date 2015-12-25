import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from '../actions'
import Zones from '../components/Zones'
import { initialState } from '../constants'
import { Grid, Col, Navbar } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchPostsIfNeeded())
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const { selectedZone, zones, isFetching } = this.props
    return (
      <main>
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>RIOT</Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Col sm={4}>
            {isFetching && zones.length === 0 &&
              <h2>Loading...</h2>
            }
            {!isFetching && zones.length === 0 &&
              <h2>Empty.</h2>
            }
            {zones.length > 0 &&
              <Zones zones={zones} />
            }
          </Col>
          <Col sm={4}>
            {selectedZone &&
              <h2>{selectedZone.name}</h2>
            }
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
  const { selectedZone, zonesByGroup } = state
  const { isFetching, lastUpdated, zones } = zonesByGroup || initialState

  return {
    selectedZone,
    zones,
    isFetching,
    lastUpdated
  }

  return state
}

export default connect(mapStateToProps)(App)
