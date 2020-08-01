import React from "react";
import DataForm from "./ticks";
// import Graph from "./graph"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      version: 0,
      flags: 0,
      size: 0,
      checksum: 0,
      data: {}
    }
  };

  // console.log(props.value);

  render() {//
    return (
      <div>
        {/* <Graph props={DataForm.state.value}/> */}
        <DataForm />
      </div>
    );
  }
}

export default App;