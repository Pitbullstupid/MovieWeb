import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
        Avatar: {
            type: String,
            default: "",
        },
        favoriteMovies: {
            type: [Number],
            default: [],
        },
        watchedMovies: {
            type: [Number],
            default: [],
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
export default User;