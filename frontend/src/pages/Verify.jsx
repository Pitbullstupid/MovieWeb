import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/orders/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, success }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Bạn đã nâng cấp tài khoản thành công");
        navigate("/");
      } else {
        toast.error("Bạn đã nâng cấp tài khoản thất bại");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi xác nhận thanh toán");
    }
  };
  useEffect(() => {
    verifyPayment();
  },[])
  return <div>Verify</div>;
};

export default Verify;
