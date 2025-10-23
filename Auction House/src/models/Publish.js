import { Schema, Types, model } from "mongoose";

const publishSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Auction's title is required!"],
            minLength: [
                4,
                "Auction's title must be at least 4 characters long!",
            ],
        },
        description: {
            type: String,
            maxLength: [
                200,
                "Auction's description must be maximum 200 characters long!",
            ],
        },
        category: {
            type: String,
            required: [true, "Auction's category is required!"],
            enum: {
                values: [
                    "Vehicles",
                    "Real Estate",
                    "Electronics",
                    "Furniture",
                    "Other",
                ],
                message:
                    "Auction's category must be one from Vehicles, Real Estate, Electronics, Furniture, Other!",
            },
        },
        price: {
            type: Number,
            required: [true, "Auction's price is required!"],
            min: [0, "Auction's price must be a positive digit!"],
        },
        author: {
            type: Types.ObjectId,
            ref: "User",
            required: ["Author is required!"],
        },
        bidder: {
            type: Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Publish = model("Publish", publishSchema);

export default Publish;
