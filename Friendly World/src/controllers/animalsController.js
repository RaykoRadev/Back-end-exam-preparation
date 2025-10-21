import { Router } from "express";

import { animalService } from "../services/index.js";
import { isAuth } from "../middlewares/authmiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const animalController = Router();

animalController.get("/", async (req, res) => {
    try {
        const animals = await animalService.getAll();
        res.render("animals/dashboard", { animals });
    } catch (err) {
        return res.status(404).render("home", {
            error: getErrorMessage(err),
        });
    }
});

animalController.get("/create", isAuth, (req, res) => {
    res.render("animals/create");
});

animalController.post("/create", isAuth, async (req, res) => {
    const animalData = req.body;
    const owner = req.user.id;
    try {
        const createdAnimal = await animalService.create(animalData, owner);
        res.redirect("/animals");
    } catch (err) {
        return res.status(404).render("animals/create", {
            error: getErrorMessage(err),
            animal: animalData,
        });
    }
});

export default animalController;
