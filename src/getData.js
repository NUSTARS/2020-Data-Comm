import React, { useState, useEffect } from "react";
import { useTracked } from './globalState';

const updateInterval = 1000;

async function grabData() {
  if (port) {
    const response = await fetch('/request-data/', {});
    const json = await response.json();

    // if no new data, return 0
    if (json.length == 0) { return 0; }
    // else return new data
    else { return json; }
  }
}
 

export function GetData(props) {
  const initialState = {
    version: 0,
    flags: 0
  };

  const [getDataState, setGetDataState] = useState(initialState);
  const [state, setState] = useTracked();

  useEffect(() => {
    const interval = setInterval(async () => {
      const d = await grabData();
      if ( !d ) { return; }

      var data = state.data;
      d.forEach(el => 
        Object.entries(el[data]).forEach(([key, val]) => 
          data[key][el[time]] = val
          )
        );

      setState({data: data});
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, []);

}