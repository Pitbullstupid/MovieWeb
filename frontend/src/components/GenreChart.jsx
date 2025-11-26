// GenreChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const GenreChart = ({ movieList, genreMap }) => {
  // Tính số phim theo thể loại
  const genreCount = {};

  movieList.forEach((movie) => {
    movie.genre_ids.forEach((genreId) => {
      const genreName = genreMap[genreId] || "Khác";
      genreCount[genreName] = (genreCount[genreName] || 0) + 1;
    });
  });

  const labels = Object.keys(genreCount);
  const dataValues = Object.values(genreCount);

  // Thêm nhiều màu hơn (tự sinh nếu labels nhiều)
  const backgroundColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
    "#FF9F40", "#C9CBCF", "#8AFF33", "#FF33F6", "#33FFF6",
    "#FF6633", "#3366FF", "#33FF66", "#FF3366", "#6633FF",
  ];
  
  // Nếu label nhiều hơn màu, tự lặp lại màu
  const colors = labels.map((_, i) => backgroundColors[i % backgroundColors.length]);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: false,
        text: "Thống kê số lượng phim theo thể loại",
      },
      legend: {
        display: false, // ẩn legend
      },
    },
    responsive: true,
  };

  return <Doughnut data={data} options={options} />;
};

export default GenreChart;
