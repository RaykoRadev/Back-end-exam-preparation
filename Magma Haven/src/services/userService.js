import bcrypt from "bcrypt";

import User from "../models/User.js";

export default {
    async register(data) {
        const user = await User.findOne({ email: data.email });
        if (user) {
            throw new Error("The user already exists!");
        }

        if (data.password !== data.rePassword) {
            throw new Error("Passwords missmatch!");
        }

        return User.create(data);
    },

    async login(data) {
        const user = await User.findOne({ email: data.email });

        if (!user) {
            throw new Error("Invalid email or password!");
        }

        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
            throw new Error("Invalid email or password!");
        }

        return user;
    },
};
