import { Schema, Types, model } from "mongoose";

const artSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Art's  title is required!"],
            minLength: [2, "Art's title must be at least 2 characters long!"],
        },
        technique: {
            type: String,
            required: [true, "Art's  technique is required!"],
            minLength: [
                2,
                "Art's technique must be at least 2 characters long!",
            ],
        },
        imageUrl: {
            type: String,
            required: [true, "Art's  image url is required!"],
            minLength: [
                2,
                "Art's image url must be at least 2 characters long!",
            ],
        },
        certificate: {
            type: String,
            required: [true, "Art's  certificate is required!"],
            enum: {
                value: ["Yes", "No"],
                message: ['Certificate field could be only "Yes" or "No"!'],
            },
        },
        author: { type: Types.ObjectId, ref: "User" },
        shared: [{ type: Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const Art = model("Art", artSchema);

export default Art;
