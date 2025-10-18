import { Router } from "express";
import userController from "./controllers/userController.js";
import postController from "./controllers/postController.js";

const routes = Router();
routes.get("/", (req, res) => {
    res.render("home");
});

routes.use("/users", userController);
routes.use("/creatures", postController);

routes.get("*splat", (req, res) => {
    res.render("404");
});

export default routes;
