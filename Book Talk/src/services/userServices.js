import User from "../models/User.js";
import bcrypt from "bcrypt";

import { generateAuthToken } from "../utils/userUtils.js";

export default {
    async register(userData) {
        if (userData.password !== userData.rePassword) {
            throw new Error("Password missmatch!");
        }
        //todo check existing user (email / username) acording instructions
        const user = await User.findOne({ email: userData.email });

        if (user) {
            throw new Error("User already exists!");
        }

        const newUser = await User.create(userData);
        const token = generateAuthToken(newUser);
        return token;
    },

    async login(userData) {
        //todo check existing user (email / username) and error messages acording instructions
        const user = await User.findOne({ email: userData.email });

        if (!user) {
            //todo check existing user (email / username) and error messages acording instructions
            throw new Error("Invalid email/username or password!");
        }

        const isMatch = await bcrypt.compare(userData.password, user.password);
        if (!isMatch) {
            //todo check existing user (email / username) and error messages acording instructions
            throw new Error("Invalid email/username or password!");
        }

        const token = generateAuthToken(user);
        return token;
    },
};
