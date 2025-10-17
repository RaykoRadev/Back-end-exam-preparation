import { Router } from "express";
import { isGuest } from "../middlewares/authentication.js";

const catalogcontroller = Router();

catalogcontroller.get("/create", isGuest, (req, res) => {
    res.render("catalog/create");
});

catalogcontroller.post("/create", isGuest, (req, res) => {
    res.render("catalog/create");
});

export default catalogcontroller;
