import { Router } from "express";

import userService from "../services/userService.js";
import getErrorMessage from "../utils/errorHandler.js";
import generateToken from "../utils/generateToken.js";

const userController = Router();

userController.get("/register", (req, res) => {
    res.render("auth/register");
});

userController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.register(userData);

        const token = generateToken(user);

        res.cookie("auth", token);
        res.redirect("/");
    } catch (err) {
        res.render("auth/register", {
            error: getErrorMessage(err),
            user: userData,
        });
    }
});

userController.get("/logout", (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

export default userController;
