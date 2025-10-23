import { Router } from "express";
import { isAuth } from "../middlewares/authmiddleware.js";

const brouseController = Router();

brouseController.get("/", (req, res) => {
    res.render("auctions/browse");
});

brouseController.get("/publish", isAuth, (req, res) => {
    res.render("auctions/publish");
});

export default brouseController;
