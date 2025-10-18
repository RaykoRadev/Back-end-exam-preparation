import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export default function genereteToken(user) {
    const payload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });

    return token;
}
