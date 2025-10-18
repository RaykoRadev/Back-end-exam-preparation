import { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
    name: {
        type: String,
        required: [true, "Post's name is required!"],
        minLength: [2, "Post's name has to be at least 2 characters long!"],
    },
    species: {
        type: String,
        required: [true, "Post's spices is required!"],
        minLength: [3, "Post's spices has to be at least 3 characters long!"],
    },
    skinColor: {
        type: String,
        required: [true, "Post's skin color is required!"],
        minLength: [
            3,
            "Post's skin color has to be at least 3 characters long!",
        ],
    },
    eyeColor: {
        type: String,
        required: [true, "Post's eye color is required!"],
        minLength: [
            3,
            "Post's eye color has to be at least 3 characters long!",
        ],
    },
    imageUrl: {
        type: String,
        required: [true, "Post's image url is required!"],
        // match: [
        //     /^(https?:\/\/).+/,
        //     "Post's image url has to start with: http://... or https://...",
        // ],
    },
    description: {
        type: String,
        required: [true, "Post's description is required!"],
        minLength: [
            10,
            "Post's description has to be at least 10 characters long!",
        ],
    },
    votes: [{ type: Types.ObjectId, ref: "Auth" }],
    owner: { type: Types.ObjectId, ref: "Auth" },
});

const Post = model("Post", postSchema);

export default Post;
