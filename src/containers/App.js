import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectZone, fetchPostsIfNeeded } from '../actions'
import Zones from '../components/Zones'
import { initialState } from '../constants'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  handleChange(name) {
    this.props.dispatch(selectZone(name))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const { selectedZone, zones, isFetching, lastUpdated } = this.props
    return (
      <div>
        {selectedZone &&
          <h2>{selectedZone.name}</h2>
        }
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && zones.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && zones.length === 0 &&
          <h2>Empty.</h2>
        }
        {zones.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Zones zones={zones} onClick={this.handleChange} />
          </div>
        }
      </div>
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
