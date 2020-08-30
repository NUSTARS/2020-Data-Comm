import React from 'react';
import Select from 'react-select';
import Button from '@material-ui/core/Button';

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
    this.setState({selected: selectedOption.value});
    console.log(selectedOption.value);
    // TODO:
    // add selected port to redux store
    // port dropdown in toolbar
    // POST selected port to Flask:
    fetch('/selected-port/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({port: selectedOption.value}),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    return (
      <div>
        <Select
          name="ports"
          // value={val}
          options={this.state.ports}
          className="basic-single"
          classNamePrefix="select"
          onChange={this.onChangeFunc}
        />
        <Button 
          variant="contained" 
          onClick={(() => this.getPorts)}>
            Refresh
        </Button>
      </div>
    );
  }
}

export default SelectPort;