import { Router } from "express";
import userController from "./controllers/userController.js";

const routes = Router();
routes.get("/", (req, res) => {
    res.render("home");
});

routes.use("/users", userController);

routes.get("*splat", (req, res) => {
    res.render("404");
});

export default routes;
