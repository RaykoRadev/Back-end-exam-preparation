import User from "../models/User.js";
import bcrypt from "bcrypt";

import { generateAuthToken } from "../utils/userUtils.js";

export async function register(userData) {
    if (userData.password !== userData.rePassword) {
        throw new Error("Password missmatch!");
    }
    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error("User already exists!");
    }

    const newUser = await User.create(userData);
    const token = generateAuthToken(newUser);
    return token;
}

export async function login(userData) {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error("Invalid email or password!");
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password!");
    }

    const token = generateAuthToken(user);
    return token;
}
