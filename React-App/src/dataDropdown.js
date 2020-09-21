import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useTracked } from './globalState';

export function DataDropDown(props) {
  const intitialState = {
    options: [],
    selected: [],
  }

  const [ddState, setddState] = useState(intitialState);
  const [state, setState] = useTracked();

  useEffect(() => {
    var options = [];
    if (typeof state.data !== 'undefined') {
      Object.keys(state.data).forEach(key => options.push(
        {
          value: key,
          label: key
        }
      ));
    }

    setddState({options: options});
  }, [state.data]);

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