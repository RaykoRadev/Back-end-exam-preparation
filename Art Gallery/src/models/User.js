import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required!"],
            minLength: [4, "Username must be at least 4 characters long!"],
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            minLength: [3, "Password must be at least 3 characters long!"],
        },
        address: {
            type: String,
            required: [true, "Address is required!"],
            maxLength: [20, "Address must be maximum 20 characters long!"],
        },
    },
    { timestamp: true }
);

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;
