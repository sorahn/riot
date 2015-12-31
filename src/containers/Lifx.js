import React from 'react'
import io from 'socket.io-client'


export default class Lifx extends React.Component {
  constructor(props) {
    super(props)

    const socket = io.connect('http://10.0.1.3:8001')

    this.state = {socket}
  }
  componentDidMount() {
    // this.state.socket.on('*', light => {
    //   console.log(light)
    // })
  }

  render() {
    return (
      <div>LifX</div>
    )
  }
}
