import Auth from "../model/Auth.js";

export default {
    async register(userData) {
        const user = await Auth.findOne({ email: userData.email });
        if (user) {
            throw new Error("User already exists!");
        }
        if (userData.password !== userData.rePassword) {
            throw new Error("Passwords dont match!");
        }
        return Auth.create(userData);
    },
};
