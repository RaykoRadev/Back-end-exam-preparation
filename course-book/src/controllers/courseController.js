import { Router } from "express";
import { isAuth } from "../middleware/isAuthenticated.js";
import courseService from "../services/courseService.js";
import { isOwner } from "../middleware/isOwner.js";

const courseController = Router();

courseController.get("/create", isAuth, (req, res) => {
    res.render("courses/create");
});

courseController.post("/create", isAuth, async (req, res) => {
    const courseData = req.body;
    try {
        const owner = req.user.id;
        console.log(owner);
        const course = await courseService.create({
            ...courseData,
            owner: owner,
        });
        res.redirect("/courses");
    } catch (err) {
        const error = err.errors
            ? Object.values(err.errors)[0].message
            : err.message;
        return res.render("courses/create", { error, course: courseData });
    }
});

courseController.get("/", async (req, res) => {
    try {
        const allCourses = await courseService.getAll();
        res.render("courses/catalog", { course: allCourses });
    } catch (err) {
        console.log("something went wrong");
    }
});

courseController.get("/details/:courseID", async (req, res) => {
    const courseId = req.params.courseID;

    const course = await courseService.getOne(courseId);

    const signedUsers = course.signUpList.join(", ");

    const isOwner = course.owner.equals(req.user?.id);

    res.render("courses/details", { course, isOwner, signedUsers });
});

courseController.get("/sign-up/:courseID", isAuth, async (req, res) => {
    const courseId = req.params.courseID;
    const username = req.user.username;

    await courseService.attach(username, courseId);
    res.redirect(`/courses/details/${courseId}`);
});

courseController.get("/edit/:courseID", isAuth, isOwner, async (req, res) => {
    const courseId = req.params.courseID;

    // const courseData = await courseService.getOne(courseId);
    const courseData = req.course;

    res.render("courses/edit", { course: courseData });
});

courseController.post("/edit/:courseID", isAuth, async (req, res) => {
    const courseData = req.body;
    const courseId = req.params.courseID;
    try {
        const updatedCourse = await courseService.edit(courseId, courseData);
        res.redirect(`/courses/details/${courseId}`);
    } catch (err) {
        const error = err.errors
            ? Object.values(err.errors)[0].message
            : err.message;
        return res.render("courses/create", { error, course: courseData });
    }
});

courseController.get("/delete/:courseID", isAuth, isOwner, async (req, res) => {
    const courseId = req.params.courseID;

    await courseService.delete(courseId);

    res.redirect("/courses");
});

export default courseController;
