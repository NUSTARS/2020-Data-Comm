import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Chart from "./chart";
import { Resizable, ResizableBox } from 'react-resizable';
import * as zoom from 'chartjs-plugin-zoom';
import DropDown from "./dropdown";
import "./split-pane.css";

const styles = theme => ({
  "chart-container": {
    maxHeight: 600,
    overflow: "hidden"
  }
});



let updateInterval = 1000;
let typeData = "Live";

class Graph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      meta: {
        ticks: props.ticks,
        lab: [],
        dat: []
      },
      lineChartData: {
        labels: [],
        datasets: [
          {
            type: "line",
            label: typeData,
            backgroundColor: "rgba(0, 0, 0, 0)", // "rgba(78, 42, 132, 1)"
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
                // maxTicksLimit: props.ticks,
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
    this.ref = {
      lineChart:React.createRef()
    };
    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    setInterval( this.updateChart,
    updateInterval)
  }

  updateChart() {
      console.log(this.state.lineChartOptions.scales.xAxes.suggestedMax);
      const newDat = this.state.meta.dat;
      const newNum = Math.round(Math.random()*100);

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
        {/* <Grid container spacing={3}>
        <Grid xs={6}>
        <Grid item xs={3}> */}
        {/* <ResizableBox  width={400} height={200}
        minConstraints={[100, 100]} maxConstraints={[800, 400]}> */}
        <Chart 
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        />
        {/* </ResizableBox> */}
        {/* </Grid>
        <Grid item xs={6}>
        <DropDown />
        </Grid>
        </Grid>
        </Grid> */}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Graph);