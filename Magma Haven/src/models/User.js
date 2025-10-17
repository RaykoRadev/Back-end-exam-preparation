import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        requred: [true, "Username is required!"],
        minLength: [2, "Username has to be at least 2 characters long!"],
    },
    email: {
        type: String,
        requred: [true, "User email is required!"],
        minLength: [10, "User email has to be at least 10 characters long!"],
    },
    password: {
        type: String,
        requred: [true, "User password is required!"],
        minLength: [4, "User password has to be at least 4 characters long!"],
    },
});

const User = model("User", userSchema);

export default User;
