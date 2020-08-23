import React, {setState, useEffect} from "react";
import MiniDrawer from "./drawer";
// import SPort from "./serialPort";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      version: 0,
      flags: 3,
      size: 2,
      checksum: 4,
      data: {},
      time: 0,
      test: [0,1,2,3]
    }
  };

  // componentDidMount() {
  //   fetch('/time/'+this.state.test).then(res => res.json()).then(data => {
  //     this.setState({time: data.time, test: data.test});
  //   }, [])
  // }

  // componentDidUpdate() {
  //   fetch('/time/'+this.state.test).then(res => res.json()).then(data => {
  //     this.setState({time: data.time, test: data.test});
  //   }, []);
  //   // console.log(this.state.version);
  // }

  render() {
    return (
      <div>
        <MiniDrawer/>
        {/* <p>The current time is {this.state.time}. and {this.state.test}</p> */}
        {/* <SPort/> */}
      </div>
    );
  }
}

export default App;