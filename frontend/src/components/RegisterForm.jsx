import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = ({ setView }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      e.preventDefault();
      return toast.error("Vui lòng nhập họ và tên");
    }
    if (!email.trim()) {
      e.preventDefault();
      return toast.error("Vui lòng nhập email");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      e.preventDefault();
      return toast.error("Email không hợp lệ");
    }
    if (!password.trim()) {
      e.preventDefault();
      return toast.error("Vui lòng nhập mật khẩu");
    }
    if (password.trim() !== confirmPassword.trim()) {
      e.preventDefault();
      return toast.error("Xác nhận mật khẩu không khớp");
    }
    try {
      const response = await fetch(`http://localhost:5001/api/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: username.trim(),
          email: email.trim(),
          password: password.trim(),
          Avatar: "",
          role: "user",
          isPremium: false,
          favoriteMovies: [],
          watchedMovies: [],
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return toast.error(data.message || "Đăng ký không thành công");
      } else {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setView("login");
      }
    } catch (error) {
      toast.error("Đăng ký không thành công");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tạo tài khoản mới</CardTitle>
        <CardDescription>Nhập thông tin để đăng ký tài khoản</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegisterSubmit}>
          <div className="flex flex-col gap-[6px] w-[290px]">
            <div className="grid gap-1">
              <Label>Họ và tên</Label>
              <Input
                type="text"
                placeholder="Nguyễn Văn A"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-1 relative">
              <Label>Mật khẩu</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[28px] cursor-pointer text-[#AAAAAA]"
              />
            </div>
            <div className="grid gap-1 relative">
              <Label>Xác nhận mật khẩu</Label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-[28px] cursor-pointer text-[#AAAAAA]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Button
                type="submit"
                className="w-full"
              >
                Đăng ký
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setView("login")}
              >
                Quay lại đăng nhập
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default RegisterForm;
