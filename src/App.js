import React from "react";
import MiniDrawer from "./drawer";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      version: 444,
      flags: 3,
      size: 2,
      checksum: 4,
      data: {}
    }
  };

  // console.log(props.value);

  render() {
    return (
      <div>
        <MiniDrawer/>
      </div>
    );
  }
}

export default App;