import React from "react";
import DataForm from "./ticks";
// import SplitPane, {Pane} from "react-split-pane";
import './split-pane.css';
import MiniDrawer from "./drawer";
import SpeedDials from "./speedDial"
// import Graph from "./graph"

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