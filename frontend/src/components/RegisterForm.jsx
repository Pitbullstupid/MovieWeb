import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RegisterForm = ({ setView }) => {
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    toast.success("Đăng ký thành công! Bạn có thể đăng nhập ngay");
    setView("login");
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
              <Input type="text" placeholder="Nguyễn Văn A" required />
            </div>
            <div className="grid gap-1">
              <Label>Email</Label>
              <Input type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-1">
              <Label>Mật khẩu</Label>
              <Input type="password" required />
            </div>
            <div className="grid gap-1">
              <Label>Xác nhận mật khẩu</Label>
              <Input type="password" required />
            </div>
            <div className="flex flex-col gap-1">
              <Button type="submit" className="w-full">Đăng ký</Button>
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
export default RegisterForm