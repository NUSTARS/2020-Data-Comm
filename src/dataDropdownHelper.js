import React from 'react';
import { useTracked } from './globalState';

export function DataDropdownHelper() {
  const [state, setState] = useTracked();

  var options = [];
    Object.keys(state.data).forEach(key => options.push(
      {
        value: key,
        label: key
      }
    ));

  return options;
}

// export default DataDropdownHelper;