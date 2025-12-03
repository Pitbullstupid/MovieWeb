import SideBar from "@/components/SideBar";
import React, { useEffect, useState } from "react";
import Overall from "./Overall";
import HeaderAdmin from "@/components/HeaderAdmin";
import axios from "axios";
import { useLocation, useParams } from "react-router";
import Movies from "./Movies";
import Account from "./Account";
import Orders from "./Orders";

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const location = useLocation();
  const [view, setView] = useState(location.state?.view || "home");
  const [transition, setTransition] = useState(false);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );
  // Lấy dữ liệu người dùng
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/users");
      setUserList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy user:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  // Lấy phim
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/movies");
      setMovieList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy movies:", error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  // Lấy đơn hàng
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/orders");
      setOrderList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy orders:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const userId = localStorage.getItem("userId");
  const user = userList?.find((u) => u._id === userId);
  return (
    <div className="min-h-[100vh] bg-[#181A1F]">
      <SideBar setView={setView} setTransition={setTransition} />
      <HeaderAdmin user={user} setIsLogin={setIsLogin} transition={transition} />
      {view === "account" ? (
        <Account userList={userList} refreshUsers={fetchUsers} />
      ) : view === "movies" ? (
        <Movies movieList={movieList} refreshMovies={fetchMovies} />
      ) : view === "order" ? (
        <Orders orderList={orderList} userList={userList}/>
      ) : (
        <Overall users={userList} movieList={movieList} orderList={orderList} />
      )}
    </div>
  );
};

export default Home;
