import React from "react";
import Graph from "./graph";
import FileLoader from "./file-loader";

class DataForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 20};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      this.setState({value: event.target.value})
    }
  
    render() {
      return (
        <div>
            <FileLoader/>
            <Graph ticks={this.state.value}/>
            <form onSubmit={this.handleSubmit}>
            <label>
                Number of data points:
                <input type="number" value={this.state.value || ''} onChange={this.handleChange} />
            </label>
                <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
            </form>
        </div>
      );
    }
  }

  export default DataForm;