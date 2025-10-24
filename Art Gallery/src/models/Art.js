import { Schema, Types, model } from "mongoose";

const artSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Art's  title is required!"],
            minLength: [6, "Art's title must be at least 6 characters long!"],
        },
        technique: {
            type: String,
            required: [true, "Art's  technique is required!"],
            maxLength: [
                15,
                "Art's technique must be maximum 15 characters long!",
            ],
        },
        imageUrl: {
            type: String,
            required: [true, "Art's  image url is required!"],
            match: [
                /^https?:\/\//,
                "Art's imageUrl has to be start with http://... or https://...!",
            ],
        },
        certificate: {
            type: String,
            required: [true, "Art's  certificate is required!"],
            enum: {
                values: ["Yes", "No"],
                message: 'Certificate field could be only "Yes" or "No"!',
            },
        },
        author: { type: Types.ObjectId, ref: "User" },
        shared: [{ type: Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const Art = model("Art", artSchema);

export default Art;
