import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi lấy người dùng:", error);
    res.status(500).json({ message: "Lỗi khi lấy người dùng" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { userName, email, password, role, isPremium, Avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const newUser = new User({
      userName,
      email,
      password,
      role,
      isPremium,
      Avatar,
      favoriteMovies: [],
      watchedMovies: [],
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error);
    res.status(500).json({ message: "Lỗi khi tạo người dùng" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật người dùng" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json({ message: "Xóa người dùng thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).json({ message: "Lỗi khi xóa người dùng" });
  }
};
