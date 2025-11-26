import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { color } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyStatsChart = ({ last7Months, revenueData }) => {
  const labels = last7Months.map(({ month, year }) => `${month}-${year}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh số (VNĐ)",
        data: revenueData,
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: false,
        text: "Doanh số theo tháng",
      },
    },
    scales: {
      y: {
        type: "linear",
        ticks: {
          color: "white",
          callback: function (value) {
            return value.toLocaleString("vi-VN") + " VNĐ";
          },
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default MonthlyStatsChart;
