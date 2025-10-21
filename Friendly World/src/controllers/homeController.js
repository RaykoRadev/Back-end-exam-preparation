import { Router } from "express";
import { animalService } from "../services/index.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    const lastThree = 3;
    const animals = await animalService.getAll(lastThree);
    res.render("home", { animals });
});

export default homeController;
