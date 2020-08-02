import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./chart";
// import NameForm from "./ticks";

const styles = theme => ({
  "chart-container": {
    height: 400,
    // width: 900,
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
            backgroundColor: "rgba(0, 0, 0, 1)",
            borderColor: this.props.theme.palette.primary.main,
            pointBackgroundColor: this.props.theme.palette.secondary.main,
            pointBorderColor: this.props.theme.palette.secondary.main,
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
                maxTicksLimit: props.ticks
              }
            }
          ]
        },
        plugins: {
          zoom: {
              // Container for pan options
              pan: {
                  // Boolean to enable panning
                  enabled: true,

                  // Panning directions. Remove the appropriate direction to disable 
                  // Eg. 'y' would only allow panning in the y direction
                  mode: 'x'
              },

              // Container for zoom options
              zoom: {
                  // Boolean to enable zooming
                  enabled: true,

                  // Zooming directions. Remove the appropriate direction to disable 
                  // Eg. 'y' would only allow zooming in the y direction
                  mode: 'x',
              }
          }
      }
      }
    };
    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    setInterval( this.updateChart,
    updateInterval)
  }

  updateChart() {
      const newDat = this.state.meta.dat;
      const newNum = Math.round(Math.random()*100);

      newDat.push(newNum);
      const newLab = [...Array(newDat.length).keys()];

      const newMeta = {ticks: this.props.ticks, lab: newLab, dat: newDat}
      this.setState({meta: newMeta})

      const oldDataSet = this.state.lineChartData.datasets[0];
      let newDataSet = { ...oldDataSet };
      newDataSet.data.push(newNum);
      // if (this.state.meta.ticks !== this.props.ticks) {
      //   newDataSet.data = newDataSet.data.slice(this.state.meta.ticks > this.state.meta.lab.length ? -this.state.meta.lab.length : -this.state.meta.ticks)
      // }
      // else if (newDataSet.data.length > this.state.meta.ticks) {
      //   newDataSet.data.shift();
      // }

      const possLabs = this.state.meta.lab;

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newDataSet],
        labels: possLabs/*.slice(this.state.meta.ticks > this.state.meta.lab.length ? -this.state.meta.lab.length : -this.state.meta.ticks)*/

      };
      // console.log(possLabs.slice(this.state.meta.ticks > this.state.meta.lab.length ? -this.state.meta.lab.length : -this.state.meta.ticks))
      // console.log(newDataSet.data);
      this.setState({ lineChartData: newChartData });
    }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes["chart-container"]}>
        <Chart
          data={this.state.lineChartData}
          options={this.state.lineChartOptions}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Graph);