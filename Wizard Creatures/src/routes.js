import { Router } from "express";

const routes = Router();
routes.get("/", (req, res) => {
    res.send("work");
});

export default routes;
