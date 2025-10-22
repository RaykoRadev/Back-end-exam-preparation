import { Router } from "express";

const homeController = Router();

homeController.get("/", (req, res) => {
    //todo fix the links in layout
    res.render("home");
});

export default homeController;
