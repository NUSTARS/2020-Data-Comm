import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./chart";

const styles = theme => ({
  "chart-container": {
    height: 400
  }
});

let updateInterval = 1000

class App extends React.Component {
  state = {
    lineChartData: {
      labels: [1,2,3,4,5,6,7,8,9,10],
      datasets: [
        {
          type: "line",
          label: "test",
          backgroundColor: "rgba(0, 0, 0, 1)",
          borderColor: this.props.theme.palette.primary.main,
          pointBackgroundColor: this.props.theme.palette.secondary.main,
          pointBorderColor: this.props.theme.palette.secondary.main,
          borderWidth: "2",
          lineTension: 0.45,
          data: [10,13,18,20,17,10,13,18,20,17]
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
              maxTicksLimit: 10
            }
          }
        ]
      }
    }
  };

  componentDidMount() {
    setInterval( this.updateChart = e => {
      const oldDataSet = this.state.lineChartData.datasets[0];
      const newDataSet = { ...oldDataSet };
      newDataSet.data.push(Math.round(Math.random()*100));
      newDataSet.data.shift();

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newDataSet],
        labels: this.state.lineChartData.labels.concat(
          this.state.lineChartData.labels[this.state.lineChartData.labels.length-1]+1
        ).slice(-10)
      };
      this.setState({ lineChartData: newChartData });
    },
    updateInterval)
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

export default withStyles(styles, { withTheme: true })(App);