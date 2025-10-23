import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import brouseController from "./controllers/brouseController.js";

const routes = Router();

routes.use(homeController);
routes.use("/users", userController);
routes.use("/offers", brouseController);

routes.all("*splat", (req, res) => {
    res.render("404");
});

export default routes;
