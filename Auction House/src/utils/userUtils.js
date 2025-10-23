import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export function generateAuthToken(user) {
    const payload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    return token;
}
