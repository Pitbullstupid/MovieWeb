import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const MiniBarChart = ({ data, labels, backgroundColor = "#4ade80" }) => {
  const chartData = {
    labels: labels || data.map((_, i) => i),
    datasets: [
      {
        data,
        backgroundColor, // dùng màu truyền vào
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        display: true,
        ticks: { color: "white", font: { size: 10 } },
      },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ width: "100%", height: "60px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MiniBarChart;
