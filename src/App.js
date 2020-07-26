import React from "react";
import DataForm from "./ticks";
// import Graph from "./graph"

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  // };

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