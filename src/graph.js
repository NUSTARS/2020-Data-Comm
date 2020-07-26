import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Chart from "./chart";
// import NameForm from "./ticks";

const styles = theme => ({
  "chart-container": {
    height: 400
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
      const newLab = this.state.meta.lab;

      const newNum = Math.round(Math.random()*100);

      newDat.push(newNum);
      newLab.push(this.state.meta.lab.length+1);

      const newMeta = {ticks: this.props.ticks, lab: newLab, dat: newDat}
      this.setState({meta: newMeta})

      const oldDataSet = this.state.lineChartData.datasets[0];
      const newDataSet = { ...oldDataSet };
      newDataSet.data.push(newNum);
      if (newDataSet.data.length > this.state.meta.ticks) {
        newDataSet.data.shift();
      }

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newDataSet],
        labels: this.state.meta.lab.slice(this.state.meta.ticks > this.state.meta.lab.length ? -this.state.meta.lab.length : -this.state.meta.ticks)
      };
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