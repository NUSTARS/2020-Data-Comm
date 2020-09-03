import React from 'react';
import { useTracked } from './globalState';

function GetDataHelper(d) {
  const [state, setState] = useTracked();

  var data = state.data;

  d.forEach(el => 
    Object.entries(el[data]).forEach(([key, val]) => 
      data[key][el[time]] = val
      )
    );

  setState({data: data})
}

export default GetDataHelper;