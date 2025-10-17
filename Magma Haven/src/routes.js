import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
    res.render("home");
});

export default routes;
