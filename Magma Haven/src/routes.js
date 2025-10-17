import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
    res.render("home");
});

routes.get("*spat", (req, res) => {
    res.render("404");
});

export default routes;
