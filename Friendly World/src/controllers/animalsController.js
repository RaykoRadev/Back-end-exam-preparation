import { Router } from "express";

import { animalService } from "../services/index.js";
import { isAuth } from "../middlewares/authmiddleware.js";

const animalController = Router();

animalController.get("/", async (req, res) => {
    try {
        const animals = await animalService.getAll();
        res.render("animals/dashboard", { animals });
    } catch (err) {
        return res.status(404).render("user/register", {
            error: getErrorMessage(err),
            user: userData,
        });
    }
});

animalController.get("/create", isAuth, (req, res) => {
    res.render("animals/create");
});

export default animalController;
