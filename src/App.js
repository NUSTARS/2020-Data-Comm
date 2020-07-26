import React from "react";
import NameForm from "./ticks";
import Graph from "./graph"

class App extends React.Component {

  render() {
    return (
      <div>
        <Graph />
        <NameForm />
      </div>
    );
  }
}

export default App;