import { Router } from "express";

import userService from "../services/userService.js";

const userController = Router();

userController.get("/register", (req, res) => {
    res.render("auth/register");
});

userController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const user = await userService.register(userData);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

export default userController;
