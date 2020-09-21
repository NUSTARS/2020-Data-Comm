import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./chart";
import * as zoom from 'chartjs-plugin-zoom';
import { useTracked } from './globalState';

export function Graph(props) {

  const initialState = {
      selected: (typeof props.selected === 'undefined') ? [] : props.selected,
      lineChartData: {
        // labels: [],
        datasets: []
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true
        },
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                suggestedMax: 100
              }
            }
          ]
        },
        plugins: {
          zoom: {
              pan: {
                  enabled: true,
                  mode: 'x',
                  speed: 100,
              },
              zoom: {
                  enabled: true,
                  mode: 'x',
                  speed: 500,
                  sensitivity: 0.5,
              }
          }
        }
      }
    };

    const [graphState, setGraphState] = useState(initialState);
    const [state, setState] = useTracked();

    useEffect(() => {
      var datasets = []
      var yAxes = []
      if (typeof graphState.selected !== 'undefined') {
        graphState.selected.forEach(label => {
            datasets.push(
              {
                type: 'line',
                label: label,
                labels: state.data[label].map(x => x[0]), //Object.keys(state.data[label]),
                data: state.data[label].map(x => x[1]), //Object.values(state.data[label]),
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
        );
      }

      const newChartData = {
        ...graphState.lineChartData,
        datasets: datasets
      }

      const newChartOptions = {
        ...graphState.lineChartOptions,
        scales: {...graphState.lineChartOptions.scales, yAxes: yAxes}
      }

      setGraphState({lineChartData: newChartData, lineChartOptions: newChartOptions})

    }, [graphState.selected, state.data]);

    return (
      <div xs={12} style={{height: 400}}>
        <Chart 
          data={graphState.lineChartData}
          options={graphState.lineChartOptions}
        />
      </div>
    );

}