import { Router } from "express";

const userController = Router();

userController.get("/register", async (req, res) => {
    res.render("auth/register");
});

userController.post("/register", async (req, res) => {
    res.render("auth/register");
});

export default userController;
