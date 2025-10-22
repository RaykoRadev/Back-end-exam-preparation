import { Router } from "express";
import { AUTH_COOKIE_NAME } from "../config/constants.js";
import { isAuth, isGuest } from "../middlewares/authmiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { catalogService, userService } from "../services/index.js";

const userController = Router();

userController.get("/register", isGuest, (req, res) => {
    res.render("user/register");
});

userController.post("/register", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await userService.register(userData);
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect("/");
    } catch (err) {
        return res.status(404).render("user/register", {
            error: getErrorMessage(err),
            user: userData,
        });
    }
});

userController.get("/login", isGuest, (req, res) => {
    res.render("user/login");
});

userController.post("/login", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await userService.login(userData);
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect("/");
    } catch (err) {
        return res.status(404).render("user/login", {
            error: getErrorMessage(err),
            user: userData,
        });
    }
});

userController.get("/logout", isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect("/");
});

userController.get("/profile", isAuth, async (req, res) => {
    const reviews = await catalogService.getAll({ id: req.user.id });
    res.render("user/profile", { reviews });
});

export default userController;
