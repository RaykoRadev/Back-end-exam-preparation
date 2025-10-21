import { Schema, Types, model } from "mongoose";

const animalSchema = new Schema({
    name: {
        type: String,
        required: [true, "Animal's name is required!"],
        minLength: [2, "Animal's name must be at least 2 characters long!"],
    },
    years: {
        type: Number,
        required: [true, "Animal's name is required!"],
        min: [1, "Animal's name must be at least 1 year old!"],
        max: [100, "Animal's name must be max 100 years old!"],
    },
    kind: {
        type: String,
        required: [true, "Animal's kind is required!"],
        minLength: [3, "Animal's kind must be at least 3 characters long!"],
    },
    image: {
        type: String,
        required: [true, "Animal's image url is required!"],
        minLength: [
            10,
            "Animal's image url must be at least 10 characters long!",
        ],
    },
    need: {
        type: String,
        required: [true, "Animal's need is required!"],
        minLength: [3, "Animal's need must be at least 3 characters long!"],
        maxLength: [20, "Animal's need must be maximum 20 characters long!"],
    },
    location: {
        type: String,
        required: [true, "Animal's location is required!"],
        minLength: [5, "Animal's location must be at least 5 characters long!"],
        maxLength: [15, "Animal's location must be max 15 characters long!"],
    },
    description: {
        type: String,
        required: [true, "Animal's description is required!"],
        minLength: [
            5,
            "Animal's description must be at least 5 characters long!",
        ],
        maxLength: [50, "Animal's description must be max 50 characters long!"],
    },
    donation: [{ type: Types.ObjectId, ref: "User" }],
    owner: { type: Types.ObjectId, ref: "User" },
});

const Animal = model("Animal", animalSchema);

export default Animal;
