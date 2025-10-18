import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export default function isAuthMiddleware(req, res, next) {
    const token = req.cookies["auth"];

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        req.isAuthenticated = true;

        res.locals.user = decoded;
        res.locals.isAuthenticated = true;

        return next();
    } catch (err) {
        res.render("auth/login", {
            error: getErrorMessage(err),
        });
    }
}

export function isAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.redirect("/users/login");
    }
    return next();
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated) {
        return res.redirect("/");
    }
    return next();
}
