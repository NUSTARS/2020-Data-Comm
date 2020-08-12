import React from "react";

class ReadPacket extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
          byteArray: [],
          done: false
      }
      this.xhr = null
  }
  componentDidMount() {
      this.xhr = new XMLHttpRequest()
      this.xhr.open('GET', '/api/binary', true);
      this.xhr.responseType = 'blob';
      this.xhr.onload = () => {
        // if (request.status >= 200 && request.status < 400) {
          var uInt8Array = new Uint8Array(this.xhr.response);
          console.log(uInt8Array);
          this.setState({byteArray: uInt8Array, done: true})
        // } 
      };
      this.xhr.send();
  }
  componentWillUnmount() {
      // Cancel the xhr request, so the callback is never called
      if (this.xhr && this.xhr.readyState !== 4) {
          this.xhr.abort();
      }
  }
  render() {
      if(!this.state.done) {
          return (
              <div>
                  Users Loading 
              </div>
          )
      } else {
          return (
              <div>
                  Users: {this.state.users}            
              </div>
          )
      }
  }
}

export default ReadPacket;

