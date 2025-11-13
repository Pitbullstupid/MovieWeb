import { useEffect, useState } from "react";
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
import ForgotPasswordForm from "./ForgotPasswordForm";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({
  className = "",
  setOpenModal,
  setIsLogin,
  setUserId,
  ...props
}) => {
  const [view, setView] = useState("login");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users");
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
      }
    };
    fetchUsers();
  }, [view]);
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = userList?.find(
      (u) => u.email === email.trim() && u.password === password.trim()
    );
    if (user) {
      toast.success("Đăng nhập thành công");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);
      setUserId(user._id);
      setOpenModal(false);
      setIsLogin(true);
      navigate(0);
    } else {
      toast.error("Sai email hoặc mật khẩu");
    }
  };

  if (view === "forgot") return <ForgotPasswordForm setView={setView} />;
  if (view === "register") return <RegisterForm setView={setView} />;

  return (
    <div className={`flex flex-col gap-6 ${className}`} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Đăng nhập tài khoản</CardTitle>
          <CardDescription>Nhập email và mật khẩu để đăng nhập</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="w-[290px] h-[320px]">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3 relative">
                <div className="flex items-center gap-20 ">
                  <Label>Mật khẩu</Label>
                  <button
                    type="button"
                    onClick={() => setView("forgot")}
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                    tabIndex={-1}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassWord(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[42px] cursor-pointer text-[#AAAAAA]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Đăng nhập
                </Button>
                <Button variant="outline" className="w-full">
                  Đăng nhập với Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Bạn chưa có tài khoản?
              <button
                type="button"
                onClick={() => setView("register")}
                className="underline underline-offset-4 ml-2"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default LoginForm;
