import React from 'react';
import { useTracked } from './globalState';

function GraphHelper(selected) {
  const [state, setState] = useTracked();
  var datasets = []
  var yAxes = []
  selected.forEach(label => {
      datasets.push(
        {
          type: 'line',
          label: label,
          labels: Object.keys(state.data[label]),
          data: Object.values(state.data[label]),
          backgroundColor: "rgba(0, 0, 0, 1)",
          borderColor: "rgba(78, 42, 132, 1)", 
          pointBackgroundColor: "rgba(78, 42, 132, 1)",
          pointBorderColor: "rgba(78, 42, 132, 1)",
          borderWidth: "2",
          lineTension: 0.45,
          yAxisID: label
        }
      );
      yAxes.push(
        {
          id: label,
          position: 'left'
        }
      );
    }
  )
  return [datasets, yAxes];
}

export default GraphHelper;