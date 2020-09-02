import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Chart from "./chart";
import { Resizable, ResizableBox } from 'react-resizable';
import * as zoom from 'chartjs-plugin-zoom';
import useDataState from './App';

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
      selected = (typeof props.selected == 'undefined') ? [] : props.selected,
      lineChartData: {
        labels: [],
        datasets: [
          {
            type: "line",
            label: 'set1',
            backgroundColor: "rgba(0, 0, 0, 1)",
            borderColor: "rgba(78, 42, 132, 1)", //this.props.theme.palette.primary.main,
            pointBackgroundColor: "rgba(78, 42, 132, 1)",//this.props.theme.palette.secondary.main,
            pointBorderColor: "rgba(78, 42, 132, 1)",//this.props.theme.palette.secondary.main,
            borderWidth: "2",
            lineTension: 0.45,
            data: []
          }
        ]
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

  componentDidMount() {
    setInterval( this.updateChart,
    updateInterval)
  }

  async grabData() {
    // TODO: if no port selected, don't bother with request!
    const response = await fetch('/request-data/', {});
    const json = await response.json();
    console.log("json", json)

    // if no new data, return 0
    if (json.length == 0) { return 0; }
    // else return new data
    else { return [json[0]['time'], json[0]['data']]; }
  }

  async updateChart() {
    const d = await this.grabData();
    console.log(d);
    if ( !d ) { return; }
    const newDat = this.state.meta.dat;
    const newNum = d[1][10];

    newDat.push(newNum);
    const newLab = [...Array(newDat.length).keys()];

    const newMeta = {ticks: this.props.ticks, lab: newLab, dat: newDat}
    this.setState({meta: newMeta})

    const oldDataSet = this.state.lineChartData.datasets[0];
    let newDataSet = { ...oldDataSet };
    newDataSet.data.push(newNum);

    const possLabs = this.state.meta.lab;

    const newChartData = {
      ...this.state.lineChartData,
      datasets: [newDataSet],
      labels: possLabs
    };
    this.setState({ lineChartData: newChartData });
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