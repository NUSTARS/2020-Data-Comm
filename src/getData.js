import { useState, useEffect } from "react";
import { useTracked } from './globalState';

const updateInterval = 1000;

// async function grabData() {
//   if (port) {
//     const response = await fetch('/request-data/', {});
//     const json = await response.json();

//     // if no new data, return 0
//     if (json.length == 0) { return 0; }
//     // else return new data
//     else { return json; }
//   }
// }

export function GetData(props) {
  const initialState = {
    version: 0,
    flags: 0
  };

  const [getDataState, setGetDataState] = useState(initialState);
  const [state, setState] = useTracked();

  useEffect(() => {
    console.log("GET DATA RUNNING");
    const interval = setInterval(async () => {
      // const d = await grabData();
      async function getd() {
        if (state.port) {
          console.log("REQUESTING DATA");
          const response = await fetch('/request-data/', {});
          const json = await response.json();
      
          // if no new data, return 0
          if (json.length === 0) { return 0; }
          // else return new data
          else { return json; }
        }
      }

      var d = await getd();

      if ( !d ) { return; }

      // d looks like: [{'version': 0, 'flags': 0, 'payloadSize': 0, 'seqNum': 0, 'checksum': 66047, 'time': '19:10:20', 'data': {0: 1, 1: 17}}, ...]
      // data of form: {'label1': [[time1, value1], [time2, value2], ...], 'label2': [...], ...}

      var mutdata = state.data;
      console.log(d);
      d.forEach(el => 
        Object.entries(el['data']).forEach(([key, val]) => 
          { (key in mutdata) ? mutdata[key].append([el['time'], val]) : mutdata[key] = [[el['time'], val]]; }
          // data[key][el[time]] = val
          )
        );

      setState({data: mutdata});
    }, updateInterval);
    
    return () => clearInterval(interval);
  });

  return null;
}