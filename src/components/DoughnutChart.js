import React, { useCallback, useState, useEffect } from "react";
import Chart from "chart.js";

/**
 * This React Component takes a prop named data that has a
 * key of usagePercentage set to a value n (n <= 100).  It draws
 * a doughnut chart to the screen and rerenders on a new value
 * of usagePercentage.
 *
 * @function DoughnutChart
 * @param {Number} props.data.usagePercentage - n <= 100
 * @returns {JSX}
 */
const DoughnutChart = React.memo(
  props => {
    const usagePercentage = props.usagePercentage;
    const [chart, setChart] = useState(null);

    const updateChartRef = useCallback(node => {
      if (node !== null) {
        const newChart = new Chart(node, {
          plugins: [chartPlugin],
          type: "doughnut",
          data: {
            labels: [],
            datasets: [
              {
                label: "",
                data: [],
                backgroundColor: []
              }
            ]
          },
          options: {
            responsive: false,
            legend: { display: false },
            tooltips: { enabled: false },
            events: null,
            animation: {
              duration: 500
            }
          }
        });

        setChart(newChart);
      }
    }, []);

    useEffect(() => {
      if (chart !== null) {
        chart.data.datasets[0].data[0] = usagePercentage;
        chart.data.datasets[0].data[1] = 100 - usagePercentage;
        chart.data.datasets[0].backgroundColor[0] = getUsageColor(
          usagePercentage
        );
        chart.update();
      }
    }, [chart, usagePercentage]);

    return <canvas ref={updateChartRef} />;
  },
  (prevProps, nextProps) => {
    return prevProps.usagePercentage === nextProps.usagePercentage;
  }
);

const chartPlugin = {
  beforeDraw: function(chart) {
    const width = chart.chart.width;
    const height = chart.chart.height;
    const ctx = chart.chart.ctx;
    const percentageUsage = chart.chart.data.datasets[0].data[0];

    ctx.restore();

    // clear any previous text
    ctx.clearRect(0, 0, width, height);

    // update the text
    let fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.textBaseline = "middle";

    let text = !(percentageUsage === null) ? percentageUsage + "%" : "";
    let textX = Math.floor((width - ctx.measureText(text).width) / 2);
    let textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  }
};

/**
 * Returns a String rgba color representation depending on the value of usage.
 * 0 < usage < 33 -> green
 * 32 <= usage < 66 -> yellow
 * 66 <= usage -> red
 *
 * @function
 * @param {Number} usage
 * @returns {String}
 */
const getUsageColor = usage => {
  let usageColor = "rgba(92, 250, 100, 1)";

  if (usage > 66) {
    usageColor = "rgba(255, 69, 69, 1)";
  } else if (usage > 33) {
    usageColor = "rgba(255, 253, 110, 1)";
  }
  return usageColor;
};

export default DoughnutChart;
