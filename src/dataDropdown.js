import React from 'react';
import Select from 'react-select';
import { useDataState } from './globalState';

const {data, setData} = useDataState();

class DataDropDown extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selected: []
    }
  };

  setOptions() {
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

  componentDidMount() {
    this.setOptions();
  }

  componentDidUpdate() {
    this.setOptions();
  }

  onChangeFunc = selectedOptions => this.setState({selected: selectedOptions.value});

  // TODO: pass selected options to graph!

  render() {
    return (<Select
            // defaultValue={[labels[1]]}
            isMulti
            name="labels"
            options={this.state.options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.onChangeFunc}
          />
    );
  }
}

export default DataDropDown;