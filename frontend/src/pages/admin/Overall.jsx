import GenreChart from "@/components/GenreChart";
import MiniBarChart from "@/components/MiniBarChart";
import MonthlyStatsChart from "@/components/MonthlyStatsChart";
import { genreMap, last7DaysLabels, monthLabels } from "@/lib/data";
import React from "react";

const Overall = ({ users, movieList, orderList }) => {
  const now = new Date();
  const nowTime = now.getTime();
  const currentYear = now.getFullYear();
  //  Lấy User đăng kí 7 ngày gần nhất
  const last7Days = Array(7).fill(0);

  users.forEach((user) => {
    const createdTime = new Date(user.createdAt).getTime();
    const diffDays = Math.floor(
      (nowTime - createdTime) / (1000 * 60 * 60 * 24)
    );
    if (diffDays >= 0 && diffDays < 7) {
      last7Days[6 - diffDays]++;
    }
  });
  // Tạo danh sách phim 7 năm gần nhất
  const last7Years = Array.from({ length: 7 }, (_, i) => currentYear - 6 + i);
  const moviesByYear = {};

  last7Years.forEach((year) => {
    moviesByYear[year] = 0;
  });

  movieList.forEach((movie) => {
    const year = new Date(movie.release_date).getFullYear();
    if (moviesByYear[year] !== undefined) {
      moviesByYear[year]++;
    }
  });
  const movieYearLabels = last7Years.map(String);
  const movieYearData = last7Years.map((year) => moviesByYear[year]);
  //Tạo danh sách phim upload
  const last7Months = Array.from({ length: 7 }, (_, i) => {
    const monthIndex = now.getMonth() - (6 - i);
    const d = new Date(now.getFullYear(), monthIndex, 1);
    return {
      month: d.getMonth() + 1, // 1–12
      year: d.getFullYear(),
    };
  });
  const moviesByMonth = {};

  last7Months.forEach(({ month, year }) => {
    moviesByMonth[`${month}-${year}`] = 0;
  });

  movieList.forEach((movie) => {
    const created = new Date(movie.createdAt);
    const m = created.getMonth() + 1;
    const y = created.getFullYear();
    const key = `${m}-${y}`;

    if (moviesByMonth[key] !== undefined) {
      moviesByMonth[key]++;
    }
  });
  const movieMonthData = last7Months.map(({ month, year }) => {
    return moviesByMonth[`${month}-${year}`];
  });
  //Tạo danh sách đơn hàng
  const revenueByMonth = {};
  last7Months.forEach(({ month, year }) => {
    revenueByMonth[`${month}-${year}`] = 0;
  });

  orderList.forEach((order) => {
    if (!order.payment) return;

    const created = new Date(order.createdAt);
    const m = created.getMonth() + 1;
    const y = created.getFullYear();

    const key = `${m}-${y}`;

    if (revenueByMonth[key] !== undefined) {
      revenueByMonth[key] += order.price;
    }
  });
  const revenueData = last7Months.map(({ month, year }) => {
    return revenueByMonth[`${month}-${year}`];
  });
  return (
    <>
      <div className="ml-16 flex flex-col items-center mt-[63px]">
        <div className=" mt-4 w-[96%] flex justify-between">
          {/* User mới 7 ngày gần nhất */}
          <div className="bg-[#1f2937] p-4 rounded-lg text-white w-84">
            <p className="text-sm opacity-80 mb-4">
              Số người dùng mới 
            </p>
            <MiniBarChart
              data={last7Days}
              labels={last7DaysLabels}
              backgroundColor="#4CAF50"
            />
            <div className="text-[#4CAF50] bg-green-900/30 px-3 py-1 inline-block rounded-xl mt-2">
              +{last7Days.reduce((a, b) => a + b, 0)} users
            </div>
          </div>
          {/* Biểu đồ số phim */}
          <div className="bg-[#1f2937] p-4 rounded-lg text-white w-84">
            <p className="text-sm opacity-80 mb-4"> Tổng số phim theo các năm</p>
            <MiniBarChart
              data={movieYearData}
              labels={movieYearLabels}
              backgroundColor="#3B82F6"
            />
            <div className="text-blue-400 bg-blue-900/30 px-3 py-1 inline-block rounded-xl mt-2">
              Tổng: {movieList.length} movies
            </div>
          </div>
          {/*  Biểu đồ số phim upload */}
          <div className="bg-[#1f2937] p-4 rounded-lg text-white w-84">
            <p className="text-sm opacity-80 mb-4">
              Số phim đã tải lên
            </p>

            <MiniBarChart
              data={movieMonthData}
              labels={monthLabels}
              backgroundColor="#F59E0B"
            />

            <div className="text-yellow-400 bg-yellow-900/30 px-3 py-1 inline-block rounded-xl mt-2">
              Tổng: {movieList.length} movies
            </div>
          </div>
          {/* Biểu đồ doanh thu theo tháng*/}
          <div className="bg-[#1f2937] p-4 rounded-lg text-white w-84">
            <p className="text-sm opacity-80 mb-4">
              Doanh số 
            </p>

            <MiniBarChart
              data={revenueData}
              labels={monthLabels}
              backgroundColor="#10B981"
            />

            <div className="text-green-400 bg-green-900/30 px-3 py-1 inline-block rounded-xl mt-2">
              Tổng doanh thu:{" "}
              {revenueData.reduce((a, b) => a + b, 0).toLocaleString()} đ
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center bg-[#1f2937] text-white rounded-lg w-[96%] mt-6 ">
          <div className="w-180 border-r border-gray-600 p-4 ">
            <p className="w-fit mx-auto mb-2">
              Thống kê doanh thu theo tháng
            </p>
            <MonthlyStatsChart
              last7Months={last7Months}
              revenueData={revenueData}
            />
          </div>
          <div className="w-84 ">
            <p className="w-fit mx-auto mb-6">
              Thống kê số lượng phim theo thể loại
            </p>
            <GenreChart movieList={movieList} genreMap={genreMap} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Overall;
