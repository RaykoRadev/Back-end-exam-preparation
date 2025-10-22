import { Schema, Types, model } from "mongoose";

const catalogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Catalogs's title is required!"],
        minLength: [2, "Catalogs's title must be at least 2 characters long!"],
    },
    author: {
        type: String,
        required: [true, "Catalogs's author is required!"],
        minLength: [5, "Catalogs's author must be at least 5 characters long!"],
    },
    genre: {
        type: String,
        required: [true, "Catalogs's genre is required!"],
        minLength: [3, "Catalogs's genre must be at least 3 characters long!"],
    },
    stars: {
        type: Number,
        required: [true, "Catalogs's stars is required!"],
        min: [1, "Catalogs's stars must be betwen 1 and 5!"],
        max: [5, "Catalogs's stars must be betwen 1 and 5!"],
    },
    imageUrl: {
        type: String,
        required: [true, "Catalogs's imageUrl is required!"],
        match: [
            /^https?:\/\//,
            "Catalogs's imageUrl has to be start with http://... or https://...!",
        ],
    },
    review: {
        type: String,
        required: [true, "Catalogs's review is required!"],
        minLength: [
            10,
            "Catalogs's review must be at least 10 characters long!",
        ],
    },
    wishingList: [{ type: Types.ObjectId, ref: "User" }],
    owner: { type: Types.ObjectId, ref: "User" },
});

const Catalog = model("Catalog1", catalogSchema);

export default Catalog;
