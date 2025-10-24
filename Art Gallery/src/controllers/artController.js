import { Router } from "express";
import { isAuth } from "../middlewares/authmiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { artService } from "../services/index.js";

const artController = Router();

artController.get("/", async (req, res) => {
    res.render("art/gallery");
});

artController.get("/create", isAuth, (req, res) => {
    res.render("art/create");
});

artController.post("/create", isAuth, async (req, res) => {
    const art = req.body;
    const userId = req.user.id;
    try {
        await artService.create(art, userId);
        res.render("art/gallery");
    } catch (err) {
        res.render("art/create", { art, error: getErrorMessage(err) });
    }
});

export default artController;
