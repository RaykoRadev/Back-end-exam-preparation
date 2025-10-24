import { Router } from "express";
import { artService } from "../services/index.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    const arts = await artService.getAll();
    res.render("home", { arts });
});

export default homeController;
