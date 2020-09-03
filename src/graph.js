import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Chart from "./chart";
import { Resizable, ResizableBox } from 'react-resizable';
import * as zoom from 'chartjs-plugin-zoom';
import { useDataState } from './globalState';

const {data, setData} = useDataState();

const styles = theme => ({
  "chart-container": {
    maxHeight: 600,
    overflow: "hidden"
  }
});

class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
  }

  updateState() {
    var datasets = []
    var yAxes = []
    this.state.selected.forEach(label => {
        datasets.push(
          {
            type: 'line',
            label: label,
            labels: Object.keys(data[label]),
            data: Object.values(data[label]),
            backgroundColor: "rgba(0, 0, 0, 1)",
            borderColor: "rgba(78, 42, 132, 1)", //this.props.theme.palette.primary.main,
            pointBackgroundColor: "rgba(78, 42, 132, 1)",//this.props.theme.palette.secondary.main,
            pointBorderColor: "rgba(78, 42, 132, 1)",//this.props.theme.palette.secondary.main,
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

        const newChartData = {
          ...this.state.lineChartData,
          datasets: datasets
        }

        const newChartOptions = {
          ...this.state.lineChartOptions,
          scales: {...this.state.lineChartOptions.scales, yAxes: yAxes}
        }

        this.setState({lineChartData: newChartData, lineChartOptions: newChartOptions})
      }
    )
  }

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate() {
    this.updateState();
  }

  render() {
    const { classes } = this.props;

    return (
      <div xs={12} style={{height: 400}}>
        <Chart 
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Graph);
// export default Graph;