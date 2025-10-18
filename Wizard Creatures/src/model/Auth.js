import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "User email is required!"],
        minLength: [3, "User fisrt name has to be at least 3 characters!"],
    },
    lastName: {
        type: String,
        required: [true, "User last name is required!"],
        minLength: [3, "User last name has to be at least 3 characters!"],
    },
    email: {
        type: String,
        required: [true, "User email is required!"],
        minLength: [10, "User email has to be at least 10 characters!"],
    },
    password: {
        type: String,
        required: [true, "User password is required!"],
        minLength: [4, "User password has to be at least 4 characters!"],
    },
});

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const Auth = model("Auth", userSchema);

export default Auth;
