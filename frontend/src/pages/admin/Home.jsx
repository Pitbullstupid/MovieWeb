import SideBar from "@/components/SideBar";
import React, { useEffect, useState } from "react";
import Overall from "./Overall";
import HeaderAdmin from "@/components/HeaderAdmin";
import axios from "axios";

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );
  // Lấy dữ liệu người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/users");
        setUserList(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/movies");
        setMovieList(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy movies:", error);
      }
    };
    fetchMovies();
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/orders");
        setOrderList(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const userId = localStorage.getItem("userId");
  const user = userList?.find((u) => u._id === userId);
  return (
    <div className="min-h-[100vh] bg-[#181A1F]">
      <SideBar />
      <HeaderAdmin user={user} setIsLogin={setIsLogin} />
      <Overall users={userList} movieList={movieList} orderList={orderList}/>
    </div>
  );
};

export default Home;
