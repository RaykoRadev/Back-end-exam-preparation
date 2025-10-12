import mongoose, { Schema, model } from "mongoose";
import User from "./User.js";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Course title is required!"],
        minLength: [5, "The Title should be at least 5 characters!"],
    },
    type: {
        type: String,
        required: [true, "Course type is required!"],
        minLength: [3, "The Type should be at least 3 characters!"],
    },
    certificate: {
        type: String,
        required: [true, "Course certificate is required!"],
        minLength: [2, "The Certificate should be at least 2 characters!"],
    },
    imageUrl: { type: String, required: [true, "Course Image is required!"] },
    description: {
        type: String,
        required: [true, "Course description is required!"],
        minLength: [10, "The Description should be at least 10 characters!"],
    },
    price: {
        type: Number,
        required: [true, "Course price is required!"],
        min: [0, "The Price should be a positive number"],
    },
    signUpList: [{ type: String, ref: User }],
    owner: { type: mongoose.Types.ObjectId, ref: User },
});

const Course = model("Course", courseSchema);

export default Course;
