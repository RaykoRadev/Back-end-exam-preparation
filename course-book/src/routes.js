import { Router } from "express";
import homeController from "./controllers/homeController.js";
import userController from "./controllers/userController.js";
import courseController from "./controllers/courseController.js";

const routers = Router();

routers.use(homeController);
routers.use("/user", userController);
routers.use("/courses", courseController);

routers.get("*spat", (req, res) => {
    res.render("404");
});
export default routers;
