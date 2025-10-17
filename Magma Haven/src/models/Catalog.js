import { Schema, Types, model } from "mongoose";

const catalogSchema = new Schema({
    name: {
        type: String,
        requred: [true, "Catalog name is required!"],
        minLength: [2, "Catalog name has to be at least 2 characters long!"],
    },
    location: {
        type: String,
        requred: [true, "Catalog location is required!"],
        minLength: [
            3,
            "Catalog location has to be at least 3 characters long!",
        ],
    },
    elevation: {
        type: Number,
        requred: [true, "Catalog elevation is required!"],
        min: [0, "Catalog elevation has to be positive digit!"],
    },
    lastEruption: {
        type: Number,
        requred: [true, "Catalog last eruption is required!"],
        min: [0, "Catalog last eruption has to be betwen 0 and 2025"],
        max: [2025, "Catalog last eruption has to be betwen 0 and 2025"],
    },
    imageUrl: {
        type: String,
        requred: [true, "Catalog imageUrl is required!"],
        match: [
            /^https?:\/\//,
            "Catalog imageUrl has to be start with http://... or https://...!",
        ],
    },
    typeVolcano: {
        type: String,
        enum: [
            "Supervolcanoes",
            "Submarine",
            "Subglacial",
            "Mud",
            "Stratovolcanoes",
            "Shield",
        ],
    },
    description: {
        type: String,
        requred: [true, "Catalog description is required!"],
        minLength: [
            10,
            "Catalog description has to be at least 10 characters long!",
        ],
    },
    voteList: [{ type: Types.ObjectId, ref: "User" }],
    owner: { type: Types.ObjectId, ref: "User" },
});

const Catalog = model("Catalog", catalogSchema);

export default Catalog;
