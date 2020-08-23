import React from 'react';
import Select from 'react-select';

// displayed on SETTINGS PANE
class SelectPort extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ports: [],
      selected: ''
    }
  };

  componentDidMount() {
    fetch('/ports/').then(res => res.json()).
      then(data => {
        var options = [];
        data.ports.forEach(port => options.push(
          {
            value: port,
            label: port
          }
        ));
        this.setState({ports: options});
      }, []);
  }

  // componentDidUpdate() {
  // }

  getPorts() {
    fetch('/ports/').then(res => res.json()).
      then(data => {
        var options = [];
        data.ports.forEach(port => options.push(
          {
            value: port,
            label: port
          }
        ));
        this.setState({ports: options});
      }, []);
  }

  onChangeFunc = selectedOption => {
    this.setState({selected: selectedOption});
    // TODO:
    // add selected port to redux store
    // port will be displayed at top of screen?
  }

  render() {
    return (
      <div>
        <Select
          name="ports"
          value={val}
          options={this.state.ports}
          className="basic-single"
          classNamePrefix="select"
          onChange={this.onChangeFunc}
        />
        <Button 
          variant="contained" 
          onClick={(getPorts)}>
            Refresh
        </Button>
      </div>
    );
  }
}

export default SelectPort;