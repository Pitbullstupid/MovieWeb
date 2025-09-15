import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING)
        console.log("Liên kết vs MongoDB thành công")
    } catch (error) {
        console.log("Lỗi kết nối với MongoDB: ", error)
        process.exit(1)//thoat voi trang thai that bai
    }
}
export default connectDB;