import { Router } from "express";
import userController from "./controllers/userController.js";
import catalogController from "./controllers/catalogController.js";

const routes = Router();

routes.get("/", (req, res) => {
    res.render("home");
});
routes.use("/users", userController);
routes.use("/catalog", catalogController);

routes.get("*spat", (req, res) => {
    res.render("404");
});

export default routes;
