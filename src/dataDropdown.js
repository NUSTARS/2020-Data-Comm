import React, { useEffect } from 'react';
import Select from 'react-select';
import { useTracked } from './globalState';

export function DataDropdown(props) {
  const intitialState = {
    options: [],
    selected: [],
  }

  const [ddState, setddState] = useState(intitialState);
  const [state, setState] = useTracked();

  useEffect(() => {
    var options = [];
    Object.keys(state.data).forEach(key => options.push(
      {
        value: key,
        label: key
      }
    ));

    setddState({options: options});
  }, [state]);

  return (<Select
    // defaultValue={[labels[1]]}
    isMulti
    name="labels"
    options={ddState.options}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={(selectedOptions) => setddState({selected: selectedOptions.value})}
  />
  );
}


// class DataDropDown extends React.Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       options: [],
//       selected: []
//     }
//   };

//   setOptions() {
//     var options = DataDropdownHelper()
//     this.setState({options: options});

//     if (this.props.onChange) {
//       this.props.onChange(this.state);
//     }
//   }

//   componentDidMount() {
//     this.setOptions();
//   }

//   componentDidUpdate() {
//     this.setOptions();
//   }

//   onChangeFunc = selectedOptions => this.setState({selected: selectedOptions.value});

//   // TODO: pass selected options to graph!

//   render() {
//     return (<Select
//             // defaultValue={[labels[1]]}
//             isMulti
//             name="labels"
//             options={this.state.options}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             onChange={this.onChangeFunc}
//           />
//     );
//   }
// }

// export default DataDropDown;