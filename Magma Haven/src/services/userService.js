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
};
