import React from 'react';
import Select from 'react-select';
import useDataState from './App';

const {data, setData} = useDataState();

class DataDropDown extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      options = [],
      selected = []
    }
  };

  componentDidMount() {
    var options = [];
    Object.keys(data).forEach(key => options.push(
      {
        value: key,
        label: key
      }
    ));
    this.setState({options: options});
  }

  componentDidUpdate() {
    var options = [];
    Object.keys(data).forEach(key => options.push(
      {
        value: key,
        label: key
      }
    ));
    this.setState({options: options});

    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }

  onChangeFunc = selectedOptions => this.setState({selected: selectedOptions.value});

  // TODO: pass selected options to graph!

  render() {
    return (<Select
            // defaultValue={[labels[1]]}
            isMulti
            name="labels"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.onChangeFunc}
          />
    );
  }
}

export default DataDropDown;