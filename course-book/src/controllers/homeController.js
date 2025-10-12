import { Router } from "express";
import Course from "../models/Course.js";
import courseService from "../services/courseService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    const courses = await courseService.getLastThree();
    res.render("home", { course: courses });
});

export default homeController;
