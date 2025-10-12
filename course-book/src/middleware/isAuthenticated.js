import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";

export default function isAuthenticated(req, res, next) {
    const token = req.cookies["auth"];

    if (!token) {
        return next();
    }
    try {
        const verifiedToken = jwt.verify(token, JWT_SECRET);
        req.user = verifiedToken;
        req.isAuthenticated = true;

        res.locals.user = verifiedToken;
        res.locals.isAuthenticated = true;

        return next();
    } catch (err) {
        const errorMessage = "Session expired!";
        res.clearCookie(["auth"]);
        return res.redirect("auth/login");
    }
}

export function isAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.render("auth/login");
    }
    next();
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated) {
        return res.render("/");
    }
    next();
}
