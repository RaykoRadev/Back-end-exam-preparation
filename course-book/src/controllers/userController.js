import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userServices from "../services/userServices.js";
import { JWT_SECRET } from "../config/constants.js";
import { isAuth, isGuest } from "../middleware/isAuthenticated.js";
import courseService from "../services/courseService.js";

const userController = Router();

userController.get("/register", isGuest, (req, res) => {
    res.render("auth/register");
});

userController.post("/register", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        if (userData.password !== userData.rePassword) {
            console.log("wrong passwords");
            throw new Error("Passwords must match!");
        }

        const user = await userServices.find(userData.email);
        if (user) {
            throw new Error("Email already exists!");
        }

        const newUser = await userServices.regisrer(userData);

        const payload = {
            email: newUser.email,
            username: newUser.username,
            id: newUser.id,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
        res.cookie("auth", token);

        res.redirect("/");
    } catch (err) {
        const error = err.errors
            ? Object.values(err.errors)[0].message
            : err.message;
        return res.render("auth/register", { error, user: userData });
    }
});

userController.get("/login", isGuest, (req, res) => {
    res.render("auth/login");
});

userController.post("/login", isGuest, async (req, res) => {
    const userData = req.body;
    try {
        const user = await userServices.find(userData.email);
        if (!user) {
            throw new Error("Email or password invalid!");
        }

        const passCheck = await bcrypt.compare(
            userData.password,
            user.password
        );

        if (!passCheck) {
            throw new Error("Invalid email or password!");
        }

        const payload = {
            email: user.email,
            username: user.username,
            id: user.id,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
        res.cookie("auth", token);

        res.redirect("/");
    } catch (err) {
        const error = err.errors
            ? Object.values(err.errors)[0].message
            : err.message;
        return res.render("auth/login", { error, user: userData });
    }
});

userController.get("/logout", isAuth, (req, res) => {
    res.clearCookie(["auth"]);
    res.redirect("/");
});

userController.get("/profile", isAuth, async (req, res) => {
    const singUp = await courseService.signUp(req.user.id);
    const created = await courseService.created(req.user.id);

    const totalSingnUp = singUp.length;
    const totalCreated = created.length;

    // console.log(created);
    res.render("auth/profile", { totalCreated, totalSingnUp, singUp, created });
});

export default userController;
