import { Router } from "express";
import { animalService } from "../services/index.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    const animals = await animalService.getSorted();
    res.render("home", { animals });
});

export default homeController;
