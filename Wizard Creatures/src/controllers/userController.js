import { Router } from "express";
import getErrorMessage from "../utils/errorhandler.js";

const userController = Router();

userController.get("/register", (req, res) => {
    res.render("auth/register");
});

userController.post("/register", async (req, res) => {
    const userData = req.body;
    try {
        console.log(userData);
    } catch (err) {
        res.render("auth/register", {
            error: getErrorMessage(err),
            user: userData,
        });
    }
});

export default userController;
