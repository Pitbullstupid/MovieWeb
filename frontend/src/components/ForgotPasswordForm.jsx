import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

 const ForgotPasswordForm = ({ setView }) => {
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    toast.success("Yêu cầu của bạn sẽ sớm được giải quyết");
    setView("login");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quên mật khẩu</CardTitle>
        <CardDescription>Nhập email để nhận hướng dẫn đặt lại mật khẩu</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleForgotSubmit}>
          <div className="flex flex-col gap-6 w-[290px] h-[300px]">
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input type="email" placeholder="m@example.com" required />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">Gửi yêu cầu cho admin</Button>
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
export default ForgotPasswordForm