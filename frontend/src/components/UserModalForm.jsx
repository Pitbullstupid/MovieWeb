import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const UserModalForm = ({ open, onOpenChange, onSubmit, initialData, users = [], mode = "add" }) => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        role: "",
        isPremium: "",
        Avatar: "",
        favoriteMovies: "",
        watchedMovies: "",
        note: "",
    });

    // Load initial data + format ngày isPremium
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                favoriteMovies: initialData.favoriteMovies?.join(",") || "",
                watchedMovies: initialData.watchedMovies?.join(",") || "",
                isPremium: initialData.isPremium
                    ? initialData.isPremium.slice(0, 10) 
                    : "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateNumberList = (str) => {
        if (!str) return [];
        const arr = str.split(",").map(v => {
            const num = Number(v.trim());
            if (isNaN(num)) throw new Error();
            return num;
        });
        return arr;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Required fields
        if (!formData.userName || !formData.email || !formData.password) {
            toast.error("userName, email và password không được để trống!");
            return;
        }

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Email không hợp lệ!");
            return;
        }

        // 🛑 Check for duplicate email
        const isDuplicateEmail = users.some(
            (u) => u.email === formData.email && u._id !== initialData?._id
        );

        if (isDuplicateEmail) {
            toast.error("Email đã được sử dụng, vui lòng chọn email khác!");
            return;
        }

        // Validate date
        const premiumDate = new Date(formData.isPremium);
        if (formData.isPremium && isNaN(premiumDate.getTime())) {
            toast.error("Ngày premium không hợp lệ!");
            return;
        }

        // Validate favoriteMovies + watchedMovies
        let favList = [];
        let watchedList = [];
        try {
            favList = validateNumberList(formData.favoriteMovies);
            watchedList = validateNumberList(formData.watchedMovies);
        } catch {
            toast.error("favoriteMovies và watchedMovies phải là các số cách nhau bằng dấu phẩy (,)");
            return;
        }

        const payload = {
            ...formData,
            favoriteMovies: favList,
            watchedMovies: watchedList,
            isPremium: formData.isPremium ? new Date(formData.isPremium).toISOString() : null,
            createdAt: mode === "add" ? new Date().toISOString() : initialData.createdAt,
            updatedAt: new Date().toISOString(),
        };

        onSubmit(payload);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!max-w-3xl w-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {mode === "edit" ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 pr-2">
                    {/* LEFT */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <Label className="mb-1 block">User Name</Label>
                            <Input name="userName" value={formData.userName} onChange={handleChange} />
                        </div>

                        <div>
                            <Label className="mb-1 block">Email</Label>
                            <Input name="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <div>
                            <Label className="mb-1 block">Password</Label>
                            <Input name="password" value={formData.password} onChange={handleChange} />
                        </div>

                        <div>
                            <Label className="mb-1 block">Role</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value) => setFormData({ ...formData, role: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className="mb-1 block">Premium đến ngày</Label>
                            <Input
                                type="date"
                                name="isPremium"
                                value={formData.isPremium}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <Label className="mb-1 block">Avatar URL</Label>
                            <Input
                                name="Avatar"
                                placeholder="https://..."
                                value={formData.Avatar}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label className="mb-1 block">Favorite Movies</Label>
                            <Input
                                name="favoriteMovies"
                                placeholder="123,456,789"
                                value={formData.favoriteMovies}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label className="mb-1 block">Watched Movies</Label>
                            <Input
                                name="watchedMovies"
                                placeholder="123,456"
                                value={formData.watchedMovies}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label className="mb-1 block">Ghi chú</Label>
                            <Textarea
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Ghi chú thêm (không bắt buộc)"
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <Button type="submit" className="w-full">
                            {mode === "edit" ? "Lưu thay đổi" : "Thêm người dùng"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserModalForm;
